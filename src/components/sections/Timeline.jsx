import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  Trophy,
  Users,
  Shield,
  Globe,
  MapPin,
  TrendingUp,
  Cpu,
  Star,
  Zap,
  Rocket,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { milestones, TYPE_COLORS, CONDENSED_IDS } from "../../data/timelineMilestones";

const ICON_MAP = {
  Building2,
  Trophy,
  Users,
  Shield,
  Globe,
  MapPin,
  TrendingUp,
  Cpu,
  Star,
  Zap,
  Rocket,
};

function MilestoneCard({ m, index, above }) {
  const Icon = ICON_MAP[m.icon] || Star;
  const color = TYPE_COLORS[m.type] || TYPE_COLORS.founding;

  return (
    <motion.div
      initial={{ opacity: 0, y: above ? -16 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      className={`timeline-card shrink-0 w-[200px] snap-center ${
        above ? "mb-8" : "mt-8"
      }`}
    >
      <div
        className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 hover:scale-105 transition-transform duration-300 group"
        style={{ borderColor: "var(--border)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = color;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "";
        }}
      >
        <div
          className="w-2 h-2 rounded-full mb-2"
          style={{ backgroundColor: color }}
        />
        <Icon size={20} style={{ color }} className="mb-2" />
        <p className="text-xs text-[var(--text-muted)] mb-0.5">{m.year}</p>
        <h4 className="font-heading font-bold text-sm text-[var(--text-primary)] mb-1">
          {m.title}
        </h4>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-4 group-hover:line-clamp-none">
          {m.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Timeline({ condensed = false }) {
  const scrollRef = useRef(null);
  const items = condensed
    ? milestones.filter((m) => CONDENSED_IDS.includes(m.year))
    : milestones;

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  };

  return (
    <section
      id="timeline"
      className={`${condensed ? "py-16" : "py-20 md:py-28"} bg-[var(--bg-primary)]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-3">
            29 Years of Excellence
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
            A Legacy Built on Trust, Talent & Technology.
          </h2>
          <p className="text-[var(--text-secondary)]">
            From a single office in Missouri to a global technology partner — here's our journey.
          </p>
        </motion.div>

        {/* Desktop horizontal */}
        <div className="hidden md:block relative">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border)] shadow flex items-center justify-center hover:border-royal"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border)] shadow flex items-center justify-center hover:border-royal"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>

          <div
            ref={scrollRef}
            className="timeline-scroll overflow-x-auto pb-4 px-12"
          >
            <div className="flex gap-6 min-w-max items-center relative pt-24 pb-24">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-[var(--border)] -translate-y-1/2" />
              {items.map((m, i) => {
                const above = i % 2 === 0;
                const color = TYPE_COLORS[m.type];
                return (
                  <div key={m.year} className="relative flex flex-col items-center">
                    {above && <MilestoneCard m={m} index={i} above />}
                    <div
                      className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-heading font-bold text-xs border-2 bg-[var(--bg-card)] ${
                        m.type === "today" ? "shadow-lg shadow-royal/30" : ""
                      }`}
                      style={{ borderColor: color, color }}
                    >
                      {m.year.slice(2)}
                    </div>
                    {!above && <MilestoneCard m={m} index={i} above={false} />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden relative pl-8 border-l-2 border-[var(--border)] space-y-8">
          {items.map((m, i) => {
            const Icon = ICON_MAP[m.icon] || Star;
            const color = TYPE_COLORS[m.type];
            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative"
              >
                <div
                  className="absolute -left-[25px] w-3 h-3 rounded-full border-2 bg-[var(--bg-card)]"
                  style={{ borderColor: color }}
                />
                <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4">
                  <Icon size={18} style={{ color }} className="mb-2" />
                  <p className="text-xs text-[var(--text-muted)]">{m.year}</p>
                  <h4 className="font-heading font-bold text-[var(--text-primary)]">{m.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{m.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {condensed && (
          <p className="text-center mt-8">
            <Link
              to="/about#timeline"
              className="inline-flex items-center gap-1 text-sm font-medium text-royal hover:underline"
            >
              See Full History →
            </Link>
          </p>
        )}

        {/* Then vs Now */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 rounded-2xl bg-royal text-white overflow-hidden"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/15">
            {[
              { label: "Offices", then: "1 office", now: "4 countries" },
              { label: "Placements", then: "0", now: "12,700+" },
              { label: "Services", then: "IT Staffing", now: "8 service lines" },
              { label: "Products", then: "—", now: "PR1SM.AI" },
            ].map((row) => (
              <div key={row.label} className="p-5 text-center">
                <p className="text-[10px] uppercase tracking-widest text-white/60 mb-2">
                  {row.label}
                </p>
                <p className="text-sm text-white/70">1996: {row.then}</p>
                <p className="font-heading font-bold text-lg mt-1">2025: {row.now}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
