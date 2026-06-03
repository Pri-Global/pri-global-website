import { useEffect, useRef, useState } from "react";

function easeOutQuart(t) {
  return 1 - (1 - t) ** 4;
}

export default function LiveCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 0.6,
  className = "",
}) {
  const [display, setDisplay] = useState(value);
  const rafRef = useRef(null);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    if (from === to) return;

    const start = performance.now();
    const durationMs = duration * 1000;

    function tick(now) {
      const p = Math.min((now - start) / durationMs, 1);
      const current = from + (to - from) * easeOutQuart(p);
      setDisplay(current);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(to);
        fromRef.current = to;
      }
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString("en-US");

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
