import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { services, iconMap } from "../../data/services";
import SectionHeading from "../ui/SectionHeading";
import AnimatedIcon from "../ui/AnimatedIcon";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0 },
};

/* Each card manages its own viewport detection so the icon
   draws exactly when that card becomes visible. */
function ServiceCard({ svc }) {
  const Icon = iconMap[svc.icon];

  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 280, damping: 18 } }}
      className="group relative bg-[var(--bg-card)] border border-[var(--border)] rounded-xl3 p-6
                 flex flex-col overflow-hidden
                 hover:shadow-lg hover:shadow-navy/8 dark:hover:shadow-black/30
                 hover:border-royal/30 dark:hover:border-royaldark/30
                 transition-shadow transition-colors duration-300"
    >
      {/* Top accent line appears on hover */}
      <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full
                      bg-royal/0 group-hover:bg-royal/50 dark:group-hover:bg-royaldark/50
                      transition-colors duration-300" />

      {/* Icon — springs on hover + draws on scroll-in */}
      <motion.div
        whileHover={{ scale: 1.14, rotate: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 14 }}
        className="w-11 h-11 rounded-xl bg-royal/10 dark:bg-royaldark/15
                   flex items-center justify-center mb-4 shrink-0"
      >
        {Icon && (
          <AnimatedIcon Icon={Icon} size={22} className="text-royal dark:text-royaldark" />
        )}
      </motion.div>

      <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2">
        {svc.title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1 mb-4">
        {svc.tagline}
      </p>

      {/* Arrow slides right on hover */}
      <Link
        to="/services"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-royal dark:text-royaldark"
      >
        Learn more{" "}
        <motion.span
          className="inline-block"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <ArrowRight size={15} />
        </motion.span>
      </Link>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            label="What We Do"
            heading="End-to-end technology services"
            subheading="From strategy and delivery to talent and AI, we provide everything your organisation needs to compete and grow."
            className="mb-14"
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.09 }}
        >
          {services.map((svc) => (
            <ServiceCard key={svc.id} svc={svc} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
