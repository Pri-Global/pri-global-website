import { useRef, useState, useEffect } from "react";
import { useInView } from "../../hooks/useInView";

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

export default function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2.2,
}) {
  const [ref, isInView] = useInView({ threshold: 0.1, rootMargin: "-50px" });
  const [value, setValue] = useState(0);
  const hasStarted = useRef(false);
  const rafId = useRef(null);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    const startTime = performance.now();
    const durationMs = duration * 1000;

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      setValue(easeOutQuart(progress) * end);
      if (progress < 1) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        setValue(end);
      }
    }

    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isInView, end, duration]);

  const display =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.floor(value).toLocaleString("en-US");

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}
