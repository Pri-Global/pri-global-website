import { useEffect, useRef, useState } from "react";

/**
 * Lightweight IntersectionObserver hook — one observer per component,
 * fires once when the element enters the viewport, then disconnects.
 *
 * @param {object} options
 * @param {number}  options.threshold  - 0..1 fraction visible before triggering (default 0.1)
 * @param {string}  options.rootMargin - CSS margin around root (default "0px")
 */
export function useInView({ threshold = 0.1, rootMargin = "0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // fire once, then stop observing
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
