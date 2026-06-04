import { useState, useEffect } from "react";
import { Play } from "lucide-react";
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
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [containerRef, inView] = useInView({ threshold: 0.05, rootMargin: "200px" });

  useEffect(() => {
    setIsReady(false);
    setHasError(false);
  }, [src]);

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

  const showControls = !autoPlay;
  const isMuted = muted || autoPlay;

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video rounded-2xl overflow-hidden bg-[#0D1B3E] ${className}`}
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
          {!autoPlay && (
            <p className="text-white/40 text-xs">Press play to start</p>
          )}
        </div>
      )}

      {inView ? (
        <video
          key={src}
          src={src}
          className="w-full h-full object-cover bg-black"
          controls={showControls}
          autoPlay={autoPlay}
          muted={isMuted}
          loop={loop}
          playsInline
          preload={autoPlay ? "auto" : "metadata"}
          onLoadedMetadata={() => setIsReady(true)}
          onCanPlay={() => setIsReady(true)}
          onPlaying={() => setIsReady(true)}
          onError={() => setHasError(true)}
        >
          Your browser does not support video playback.
        </video>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-[#6a8aaa] text-xs px-4 text-center">
          Scroll to load video
        </div>
      )}

      {title && showControls && isReady && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-20">
          <p className="text-white font-heading font-semibold text-sm">{title}</p>
        </div>
      )}
    </div>
  );
}
