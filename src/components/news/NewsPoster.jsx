import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { getNewsThumbnail } from "../../utils/newsThumbnail";

function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
        aria-label="Close"
      >
        <X size={20} />
      </button>
      <motion.img
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        src={src}
        alt={alt}
        className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
}

export default function NewsPoster({ item }) {
  const [lightbox, setLightbox] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const thumb = getNewsThumbnail(item);

  if (!thumb || imgFailed) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className="group relative block w-full mb-8 rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-secondary)] cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal"
        aria-label={`View full poster: ${thumb.alt}`}
      >
        <img
          src={thumb.src}
          alt={thumb.alt}
          className="w-full h-auto object-contain"
          onError={() => setImgFailed(true)}
        />
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn size={14} /> View full poster
        </span>
      </button>

      <AnimatePresence>
        {lightbox && (
          <Lightbox src={thumb.src} alt={thumb.alt} onClose={() => setLightbox(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
