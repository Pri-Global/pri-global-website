/**
 * AnimatedIcon — draws a Lucide SVG icon via stroke-dashoffset animation.
 *
 * Strategy (avoids getTotalLength-returns-0 bug):
 *  1. Render with opacity:0 so there's never a flash of the pre-animation state.
 *  2. On trigger, use a double-rAF to guarantee the browser has committed layout
 *     before reading getTotalLength() — opacity:0 keeps it in the layout tree
 *     so the measurement is always accurate.
 *  3. Set stroke-dasharray = dashoffset = actualLength (icon still hidden).
 *  4. Make visible (opacity:1) — icon hidden via dashoffset, not opacity.
 *  5. Use a plain CSS transition to animate dashoffset → 0 (draw in).
 *     Pure CSS is chosen over Framer Motion's animate() because FM v12's
 *     imperative animate has known quirks with SVG presentation attributes.
 */
import { useState, useEffect, useRef } from "react";

const SELECTORS = "path, circle, line, polyline, rect, ellipse";

export default function AnimatedIcon({
  Icon,
  size = 24,
  className = "",
  trigger = false,
  delay = 0,
  duration = 0.7,
}) {
  const wrapRef  = useRef(null);
  const hasRun   = useRef(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!trigger || hasRun.current) return;
    hasRun.current = true;

    // Double-rAF: first frame → layout committed, second → paint committed.
    // This guarantees getTotalLength() returns the real value even when the
    // parent motion.div started at opacity:0.
    const id1 = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;

        const els = Array.from(wrap.querySelectorAll(SELECTORS));

        // Measure and hide via dash — transition is disabled during setup
        els.forEach((el) => {
          const len = el.getTotalLength?.() ?? 0;
          if (len <= 0) return;
          el.style.transition     = "none";
          el.style.strokeDasharray  = `${len}`;
          el.style.strokeDashoffset = `${len}`;
        });

        // Make the span visible — paths still hidden via dashoffset
        setShow(true);

        // One more rAF so the browser registers the dashoffset before
        // we start transitioning it (otherwise the transition is skipped)
        requestAnimationFrame(() => {
          els.forEach((el, i) => {
            const len = parseFloat(el.style.strokeDasharray);
            if (!len) return;
            const d = delay + i * 0.1;
            el.style.transition     =
              `stroke-dashoffset ${duration}s cubic-bezier(0.22,1,0.36,1) ${d}s`;
            el.style.strokeDashoffset = "0";
          });
        });
      });
      return () => cancelAnimationFrame(id2);
    });

    return () => cancelAnimationFrame(id1);
  }, [trigger, delay, duration]);

  return (
    <span
      ref={wrapRef}
      className="inline-flex items-center justify-center leading-none"
      style={{ opacity: show ? 1 : 0, transition: "opacity 0.1s" }}
    >
      <Icon size={size} className={className} />
    </span>
  );
}
