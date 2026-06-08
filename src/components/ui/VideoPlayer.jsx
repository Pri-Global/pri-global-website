import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Volume2 } from "lucide-react";
import { useInView } from "../../hooks/useInView";

export default function VideoPlayer({
  src,
  title,
  description,
  autoPlay = false,
  muted = false,
  loop = false,
  className = "",
}) {
  const videoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [containerRef, inView] = useInView({ threshold: 0.05, rootMargin: "200px" });

  useEffect(() => {
    setIsReady(false);
    setHasError(false);
    setIsActive(false);
    setIsPreviewing(false);
  }, [src]);

  useEffect(() => {
    const hoverMq = window.matchMedia("(hover: hover)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCanHover(hoverMq.matches && !motionMq.matches);
    update();
    hoverMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);
    return () => {
      hoverMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, []);

  const startPreview = useCallback(async () => {
    const video = videoRef.current;
    if (!video || isActive || !canHover || !inView) return;
    try {
      video.muted = true;
      video.loop = true;
      await video.play();
      setIsPreviewing(true);
    } catch {
      /* autoplay blocked — ignore */
    }
  }, [isActive, canHover, inView]);

  const stopPreview = useCallback(() => {
    const video = videoRef.current;
    if (!video || isActive) return;
    video.pause();
    video.currentTime = 0;
    video.loop = loop;
    setIsPreviewing(false);
  }, [isActive, loop]);

  const activate = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    setIsActive(true);
    setIsPreviewing(false);
    video.loop = loop;
    video.muted = muted;
    try {
      await video.play();
    } catch {
      /* user may need to press play in controls */
    }
  }, [loop, muted]);

  if (!src || hasError) {
    return (
      <div
        ref={containerRef}
        className={`relative aspect-video rounded-2xl overflow-hidden bg-[#0D1B3E] flex flex-col items-center justify-center gap-3 px-6 text-center ${className}`}
      >
        <div className="w-16 h-16 rounded-full bg-royal/20 flex items-center justify-center">
          <Play className="w-8 h-8 text-white" aria-hidden />
        </div>
        {title && (
          <p className="text-white font-heading font-bold text-lg">{title}</p>
        )}
        {description && <p className="text-[#6a8aaa] text-sm max-w-md">{description}</p>}
        <p className="text-[#6a8aaa] text-xs max-w-sm">
          {hasError
            ? "Video could not be loaded. Try Chrome or Safari, or refresh the page."
            : "Video unavailable"}
        </p>
      </div>
    );
  }

  const showControls = autoPlay || isActive;
  const isMuted = autoPlay || muted || isPreviewing || !isActive;

  return (
    <div
      ref={containerRef}
      className={`group relative aspect-video rounded-2xl overflow-hidden bg-[#0D1B3E] cursor-pointer ${className}`}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onClick={() => {
        if (!isActive) activate();
      }}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !isActive) {
          e.preventDefault();
          activate();
        }
      }}
      role="button"
      tabIndex={isActive ? -1 : 0}
      aria-label={isActive ? undefined : `Play ${title || "video"} with sound`}
    >
      {!isReady && inView && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 bg-[#0D1B3E] pointer-events-none"
          aria-hidden
        >
          <div className="w-8 h-8 border-2 border-royal border-t-transparent rounded-full animate-spin" />
          {title && (
            <p className="text-white/70 text-sm font-medium px-4 text-center">{title}</p>
          )}
        </div>
      )}

      {inView ? (
        <video
          ref={videoRef}
          key={src}
          src={src}
          className="w-full h-full object-cover bg-black"
          controls={showControls}
          autoPlay={autoPlay}
          muted={isMuted}
          loop={isPreviewing ? true : loop}
          playsInline
          preload="metadata"
          onLoadedMetadata={() => setIsReady(true)}
          onCanPlay={() => setIsReady(true)}
          onPlaying={() => setIsReady(true)}
          onError={() => setHasError(true)}
          onClick={(e) => {
            if (isActive) e.stopPropagation();
          }}
        >
          Your browser does not support video playback.
        </video>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-[#6a8aaa] text-xs px-4 text-center">
          Scroll to load video
        </div>
      )}

      {/* Idle overlay — click to play with sound */}
      {isReady && !isActive && !isPreviewing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/35 pointer-events-none z-20 transition-opacity group-hover:opacity-0">
          <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <Play className="w-7 h-7 text-white fill-white ml-0.5" aria-hidden />
          </div>
          <p className="text-white/90 text-xs font-medium px-4 text-center">
            {canHover ? "Hover to preview · Click for sound" : "Tap to play with sound"}
          </p>
        </div>
      )}

      {/* Preview hint while hovering */}
      {isPreviewing && (
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 text-white text-[11px] font-medium pointer-events-none z-20">
          <Volume2 size={12} aria-hidden />
          Click for sound
        </div>
      )}

      {title && isReady && (
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-20 transition-opacity ${
            isPreviewing ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="text-white font-heading font-semibold text-sm">{title}</p>
        </div>
      )}
    </div>
  );
}
