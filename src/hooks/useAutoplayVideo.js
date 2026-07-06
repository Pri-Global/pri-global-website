import { useEffect, useRef } from "react";

/**
 * Reliable muted background video autoplay across Chrome, Safari, Firefox, Edge.
 * Handles autoplay policy, tab visibility, and reduced-motion preference.
 */
export function useAutoplayVideo({ enabled = true, onError } = {}) {
  const videoRef = useRef(null);
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled) return;

    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionMq.matches) {
      video.pause();
      return;
    }

    let cancelled = false;

    const tryPlay = async () => {
      if (cancelled || !videoRef.current) return;
      const el = videoRef.current;
      el.muted = true;
      el.defaultMuted = true;
      el.playsInline = true;
      el.setAttribute("playsinline", "");
      el.setAttribute("webkit-playsinline", "");
      try {
        await el.play();
      } catch {
        /* Autoplay blocked until user gesture — fallback listener below */
      }
    };

    const onVisible = () => {
      if (document.hidden) {
        video.pause();
        return;
      }
      tryPlay();
    };

    const onCanPlay = () => tryPlay();
    const handleError = () => onErrorRef.current?.(video);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible) tryPlay();
        else video.pause();
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", onVisible);

    const resumeOnGesture = () => {
      tryPlay();
      window.removeEventListener("pointerdown", resumeOnGesture);
      window.removeEventListener("keydown", resumeOnGesture);
    };
    window.addEventListener("pointerdown", resumeOnGesture, { once: true, passive: true });
    window.addEventListener("keydown", resumeOnGesture, { once: true });

    video.addEventListener("loadeddata", onCanPlay);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", handleError);

    tryPlay();

    const onMotionChange = () => {
      if (motionMq.matches) video.pause();
      else tryPlay();
    };
    motionMq.addEventListener("change", onMotionChange);

    return () => {
      cancelled = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pointerdown", resumeOnGesture);
      window.removeEventListener("keydown", resumeOnGesture);
      motionMq.removeEventListener("change", onMotionChange);
      video.removeEventListener("loadeddata", onCanPlay);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, [enabled]);

  return videoRef;
}
