import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { priGlobalLeadership } from "../../data/team";
import PriGlobalLeaderRow from "../team/PriGlobalLeaderRow";

const HOMEPAGE_LEADER_IDS = ["ajay-patel", "keenan-patel"];

const leaders = HOMEPAGE_LEADER_IDS.map((id) =>
  priGlobalLeadership.find((m) => m.id === id)
).filter(Boolean);

export default function LeadershipSpotlight() {
  return (
    <section className="py-16 md:py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
        >
          <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-3">
            28+ Years of Excellence
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
            A Legacy Built on Trust, Talent &amp; Technology
          </h2>
          <p className="text-[var(--text-secondary)]">
            From a single office in Missouri to a global technology partner — meet the leaders
            behind our journey.
          </p>
        </motion.div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {leaders.map((member, i) => (
            <PriGlobalLeaderRow key={member.id} member={member} index={i} />
          ))}
        </div>

        <p className="text-center mt-10">
          <Link
            to="/about"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal dark:text-royaldark hover:gap-2.5 transition-all"
          >
            Meet the full leadership team <ArrowRight size={15} />
          </Link>
        </p>
      </div>
    </section>
  );
}
