import { motion } from "framer-motion";
import AnimatedCounter from "../ui/AnimatedCounter";

const stats = [
  { value: 12700, suffix: "+", label: "IT resources placed" },
  { value: 96,    suffix: "%", label: "Client retention rate" },
  { value: 28,    suffix: "+", label: "Years of expertise" },
  { value: 300,   suffix: "+", label: "Projects delivered" },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.82, y: 20 },
  show:   { opacity: 1, scale: 1,    y: 0 },
};

export default function Stats() {
  return (
    <section className="py-16 md:py-20 bg-navy">
      <div className="site-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold text-royal uppercase tracking-widest mb-2">
            By the numbers
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            Proven at scale. Trusted globally.
          </h2>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.14 }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 18 } }}
              className="group relative text-center glass rounded-2xl py-6 md:py-8 px-3 md:px-4 cursor-default overflow-hidden transition-all duration-300"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 0%, rgba(26,86,219,0.12) 0%, transparent 70%)",
                }}
                aria-hidden
              />
              <div
                className="relative font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1"
                style={{ textShadow: "0 0 30px rgba(26,86,219,0.25)" }}
              >
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="relative text-xs text-white/70 leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
