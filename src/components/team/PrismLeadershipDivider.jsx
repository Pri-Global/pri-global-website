import { motion } from "framer-motion";

export default function PrismLeadershipDivider() {
  return (
    <div className="my-16 md:my-[60px] max-w-4xl mx-auto px-4">
      <div className="flex items-center gap-4">
        <motion.div
          className="h-px flex-1 bg-royal/30 dark:bg-royaldark/40 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="shrink-0 font-heading text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] text-royal dark:text-royaldark uppercase text-center"
        >
          × PR1SM.AI LEADERSHIP ×
        </motion.span>
        <motion.div
          className="h-px flex-1 bg-royal/30 dark:bg-royaldark/40 origin-right"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
