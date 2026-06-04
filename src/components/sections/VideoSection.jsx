import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import VideoPlayer from "../ui/VideoPlayer";

/**
 * Standard video block: heading + optional sub + player (fade-in).
 */
export default function VideoSection({
  label,
  heading,
  subheading,
  src,
  title,
  description,
  className = "",
  sectionClassName = "py-20",
  bgClassName = "",
  maxWidth = "max-w-[900px]",
  align = "center",
  children,
}) {
  return (
    <section className={`${sectionClassName} ${bgClassName} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(label || heading) && (
          <SectionHeading
            label={label}
            heading={heading}
            subheading={subheading}
            align={align}
            className="mb-10"
          />
        )}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`${maxWidth} ${align === "center" ? "mx-auto" : ""}`}
        >
          <VideoPlayer src={src} title={title} description={description} />
        </motion.div>
        {children}
      </div>
    </section>
  );
}
