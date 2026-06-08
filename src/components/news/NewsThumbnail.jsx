import { useState } from "react";
import { Link } from "react-router-dom";
import { getNewsThumbnail } from "../../utils/newsThumbnail";

export default function NewsThumbnail({
  item,
  featured = false,
  className = "",
  linkToArticle = false,
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const thumb = getNewsThumbnail(item);

  const aspect = featured ? "aspect-[21/9] md:aspect-[2.4/1]" : "aspect-[16/10]";
  const objectClass = thumb?.fit === "contain" ? "object-contain" : "object-cover";

  const inner = (
    <div className={`relative overflow-hidden bg-navy ${aspect} ${className}`}>
      {(!thumb || imgFailed) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-navy via-royal to-royaldark px-6 text-center">
          <span className="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase mb-2">
            PRI Global
          </span>
          <span className="font-heading text-2xl md:text-3xl font-extrabold text-white line-clamp-2">
            {item?.title || "PR1SM.AI"}
          </span>
        </div>
      )}
      {thumb && !imgFailed && (
        <img
          src={thumb.src}
          alt={thumb.alt}
          className={`absolute inset-0 w-full h-full ${objectClass}`}
          onError={() => setImgFailed(true)}
        />
      )}
      {linkToArticle && thumb && !imgFailed && (
        <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      )}
    </div>
  );

  if (linkToArticle && item?.slug) {
    return (
      <Link
        to={`/resources/${item.slug}`}
        className="block group shrink-0"
        aria-label={`View article: ${item.title}`}
      >
        {inner}
      </Link>
    );
  }

  return inner;
}
