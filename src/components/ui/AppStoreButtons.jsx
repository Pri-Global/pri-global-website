import {
  PRI_JOBS_APP_STORE_URL,
  PRI_JOBS_GOOGLE_PLAY_URL,
} from "../../constants/links";

const storeLinkClass =
  "inline-block rounded-lg overflow-hidden ring-1 ring-[var(--border)] hover:ring-royal/40 dark:hover:ring-royaldark/40 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal/50";

export default function AppStoreButtons({ className = "", compact = false }) {
  const height = compact ? "h-10" : "h-11 sm:h-12";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={PRI_JOBS_APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={storeLinkClass}
        aria-label="Download PRI Jobs on the App Store"
      >
        <img
          src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83"
          alt=""
          className={`${height} w-auto`}
          loading="lazy"
          decoding="async"
        />
      </a>
      <a
        href={PRI_JOBS_GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={storeLinkClass}
        aria-label="Get PRI Jobs on Google Play"
      >
        <img
          src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
          alt=""
          className={`${height} w-auto`}
          loading="lazy"
          decoding="async"
        />
      </a>
    </div>
  );
}
