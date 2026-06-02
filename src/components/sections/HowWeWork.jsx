import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";

const steps = [
  {
    num: "01",
    title: "Discover",
    description:
      "We start by listening. Our consultants conduct deep-dive workshops to understand your business objectives, technology landscape, and the challenges holding you back.",
  },
  {
    num: "02",
    title: "Design",
    description:
      "We turn insights into a clear strategy—whether that's a cloud migration roadmap, an AI proof-of-concept, or a talent acquisition plan. Everything is grounded in practicality.",
  },
  {
    num: "03",
    title: "Deliver",
    description:
      "Our cross-functional teams execute with agility and rigour, keeping you informed at every step. We own outcomes, not just outputs.",
  },
  {
    num: "04",
    title: "Evolve",
    description:
      "Technology never stands still. We embed continuous improvement into every engagement—measuring results, adapting to change, and building lasting capabilities.",
  },
];

function StepCard({ step, index }) {
  const ref = useRef(null);
  // Each card triggers individually — margin pushes trigger point down so
  // the section must be well inside the viewport before cards fire
  const inView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });

  return (
    <div ref={ref} className="relative">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 22,
          delay: index * 0.28,
        }}
        className="relative z-10"
      >
        {/* Step number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            type: "spring",
            stiffness: 340,
            damping: 20,
            delay: index * 0.28 + 0.08,
          }}
          className="font-heading text-5xl font-bold text-royal/20 dark:text-royaldark/25 mb-4 leading-none"
        >
          {step.num}
        </motion.div>

        <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-3">
          {step.title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function HowWeWork() {
  return (
    <section className="py-20 md:py-28 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            label="Our Approach"
            heading="How we work"
            subheading="A simple, proven methodology that puts your business outcomes first."
            className="mb-16"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <StepCard
              key={step.num}
              step={step}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
