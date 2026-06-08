import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: EASE },
  }),
};

const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const listItem = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
};

function ListItems({ items, variant = "card" }) {
  return (
    <motion.ul
      variants={listContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`space-y-3 ${variant === "card" ? "md:pl-[52px]" : ""}`}
    >
      {items.map((item) => {
        const [title, ...rest] = item.split(": ");
        const hasTitle = rest.length > 0;
        return (
          <motion.li
            key={item.slice(0, 48)}
            variants={listItem}
            whileHover={{ x: 4, transition: { duration: 0.2 } }}
            className={
              variant === "card"
                ? "flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]"
                : "flex items-start gap-3 text-sm md:text-base leading-relaxed text-[var(--text-secondary)] pl-1"
            }
          >
            {variant === "card" ? (
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-royal dark:bg-royaldark shrink-0 mt-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              />
            ) : (
              <span className="text-royal dark:text-royaldark shrink-0 mt-0.5">›</span>
            )}
            <span className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
              {hasTitle ? (
                <>
                  <span className="font-semibold text-[var(--text-primary)]">{title}:</span>{" "}
                  {rest.join(": ")}
                </>
              ) : (
                item
              )}
            </span>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

export default function CaseStudyBody({ sections }) {
  if (!sections?.length) return null;

  return (
    <div className="space-y-6">
      {sections.map((section, i) => (
        <motion.section
          key={section.heading}
          custom={i}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          whileHover={{ y: -2, transition: { duration: 0.25 } }}
          className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 md:p-8 shadow-sm hover:shadow-md hover:border-royal/20 dark:hover:border-royaldark/25 transition-shadow duration-300"
        >
          <div className="flex items-start gap-4 mb-5">
            <motion.span
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.05 }}
              className="shrink-0 w-9 h-9 rounded-xl bg-royal/10 dark:bg-royaldark/15 flex items-center justify-center font-heading font-bold text-sm text-royal dark:text-royaldark"
            >
              {String(i + 1).padStart(2, "0")}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              className="font-heading text-xl md:text-2xl font-bold text-[var(--text-primary)] pt-1"
            >
              {section.heading}
            </motion.h2>
          </div>

          {section.paragraphs?.map((p, pi) => (
            <motion.p
              key={p.slice(0, 40)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 + pi * 0.08 }}
              className="text-[var(--text-secondary)] leading-relaxed mb-4 last:mb-0 pl-0 md:pl-[52px]"
            >
              {p}
            </motion.p>
          ))}

          {section.list && <ListItems items={section.list} variant="card" />}

          {section.subsections?.map((sub, si) => (
            <motion.div
              key={sub.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: si * 0.1 }}
              className="mt-6 md:pl-[52px]"
            >
              <h3 className="font-heading font-semibold text-base md:text-lg text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <motion.span
                  className="w-6 h-px bg-royal/40 dark:bg-royaldark/40"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  style={{ originX: 0 }}
                />
                {sub.title}
              </h3>
              {sub.list && <ListItems items={sub.list} variant="plain" />}
            </motion.div>
          ))}
        </motion.section>
      ))}
    </div>
  );
}
