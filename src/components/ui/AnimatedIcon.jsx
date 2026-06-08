/**
 * AnimatedIcon — semantic per-icon stroke sequences on hover.
 */
import { useEffect, useRef, useCallback } from "react";
import { buildDrawPlan, getIconName } from "../../utils/iconDrawSequences";

const SELECTORS = "path, circle, line, polyline, rect, ellipse";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function prepHidden(el) {
  const len = el.getTotalLength?.() ?? 0;
  if (len <= 0) return false;
  el.style.transition = "none";
  el.style.strokeDasharray = `${len}`;
  el.style.strokeDashoffset = `${len}`;
  return true;
}

function drawTo(el, offset, duration, delay = 0) {
  const len = parseFloat(el.style.strokeDasharray);
  if (!len) return;
  el.style.transition = `stroke-dashoffset ${duration}s ${EASE} ${delay}s`;
  el.style.strokeDashoffset = `${offset}`;
}

export default function AnimatedIcon({ Icon, size = 24, className = "", style, ...props }) {
  const wrapRef = useRef(null);

  const resetAll = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.querySelectorAll(SELECTORS).forEach((el) => {
      el.style.transition = "none";
      el.style.strokeDashoffset = "0";
      el.style.strokeDasharray = "";
    });
  }, []);

  const playDraw = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const elements = Array.from(wrap.querySelectorAll(SELECTORS)).filter((el) => {
      const len = el.getTotalLength?.() ?? 0;
      return len > 0;
    });

    if (!elements.length) return;

    const plan = buildDrawPlan(getIconName(Icon), elements);

    /* Blitz: zwei Phasen auf einem Pfad (Schaft → Spitze) */
    if (plan.twoPhase) {
      const { el, phases, stagger } = plan;
      if (!prepHidden(el)) return;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const len = parseFloat(el.style.strokeDasharray);
          const [p1] = phases;
          const phaseDur = stagger || 0.22;
          drawTo(el, len * (1 - p1), phaseDur, 0);
          setTimeout(() => drawTo(el, 0, phaseDur, 0), phaseDur * 1000 + 40);
        });
      });
      return;
    }

    plan.forEach((step) => prepHidden(step.el));

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        plan.forEach((step) => drawTo(step.el, 0, step.duration, step.delay));
      });
    });
  }, [Icon]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const target = el.closest(".group") || el.parentElement || el;

    const onEnter = () => playDraw();
    const onLeave = () => resetAll();

    target.addEventListener("mouseenter", onEnter);
    target.addEventListener("mouseleave", onLeave);

    return () => {
      target.removeEventListener("mouseenter", onEnter);
      target.removeEventListener("mouseleave", onLeave);
    };
  }, [playDraw, resetAll]);

  return (
    <span
      ref={wrapRef}
      className="inline-flex items-center justify-center leading-none pointer-events-none"
    >
      <Icon size={size} className={className} style={style} {...props} />
    </span>
  );
}
