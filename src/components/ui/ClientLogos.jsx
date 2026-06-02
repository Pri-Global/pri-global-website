import bectonDickinson  from "../../assets/partners/Becton_Dickinson_logo.svg.png";
import dellEmc          from "../../assets/partners/Dell_EMC_logo.svg.png";
import energizer        from "../../assets/partners/Energizer_logo.svg.png";
import hershey          from "../../assets/partners/HersheyCo.svg.png";
import bayer            from "../../assets/partners/Logo_Bayer.svg";
import lucidMotors      from "../../assets/partners/Lucid_Motors_logo.svg.png";
import lumen            from "../../assets/partners/Lumen_Technologies_logo.svg.png";
import mastercard       from "../../assets/partners/Mastercard-logo.svg";
import mercy            from "../../assets/partners/Mercy-Hospital-Logo.png";
import meta             from "../../assets/partners/Meta_Platforms_Inc._logo_(cropped).svg.png";
import schnucks         from "../../assets/partners/Schnuck's_Logo.PNG";
import wabtec           from "../../assets/partners/Wabtec_logo.svg";
import cigna            from "../../assets/partners/cigna-3.svg";
import equinix          from "../../assets/partners/equinix.svg";
import centene          from "../../assets/partners/lg-67f320a599abc-Centene-Corporation.webp";

const logos = [
  { src: bectonDickinson, alt: "Becton Dickinson" },
  { src: dellEmc,         alt: "Dell EMC" },
  { src: energizer,       alt: "Energizer" },
  { src: hershey,         alt: "Hershey" },
  { src: bayer,           alt: "Bayer" },
  { src: lucidMotors,     alt: "Lucid Motors" },
  { src: lumen,           alt: "Lumen Technologies" },
  { src: mastercard,      alt: "Mastercard" },
  { src: mercy,           alt: "Mercy Hospital" },
  { src: meta,            alt: "Meta" },
  { src: schnucks,        alt: "Schnucks" },
  { src: wabtec,          alt: "Wabtec" },
  { src: cigna,           alt: "Cigna" },
  { src: equinix,         alt: "Equinix" },
  { src: centene,         alt: "Centene" },
];

/* CSS filter to convert any logo to the royal blue #1A56DB */
const blueFilter =
  "brightness(0) saturate(100%) invert(22%) sepia(98%) saturate(1152%) hue-rotate(215deg) brightness(101%) contrast(96%)";

export default function ClientLogos({ label = "Trusted by leading organizations" }) {
  /* Duplicate list so the seam is invisible */
  const doubled = [...logos, ...logos];

  return (
    <div className="w-full overflow-hidden py-10">
      {label && (
        <p className="text-center text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-7">
          {label}
        </p>
      )}

      {/* Fade edges */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-24 z-10 bg-gradient-to-r from-[var(--bg-secondary)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-24 z-10 bg-gradient-to-l from-[var(--bg-secondary)] to-transparent" />

        <div className="flex marquee-track gap-10 w-max">
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center h-10 w-28 shrink-0"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-8 w-auto object-contain"
                style={{ filter: blueFilter }}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
