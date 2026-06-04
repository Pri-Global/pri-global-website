import { motion } from "framer-motion";
import TeamPhoto from "./TeamPhoto";
import TeamContactLinks from "./TeamContactLinks";

export default function PriGlobalLeaderRow({ member, index = 0 }) {
  const flip = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group flex flex-col ${
        flip ? "md:flex-row-reverse" : "md:flex-row"
      } gap-8 md:gap-12 items-stretch bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl overflow-hidden hover:border-royal/40 dark:hover:border-royaldark/50 transition-colors`}
    >
      <div className="relative h-80 md:h-auto md:min-h-[360px] md:w-[300px] lg:w-[340px] shrink-0 overflow-hidden">
        <TeamPhoto
          member={member}
          shape="portrait"
          theme="pri"
          fill
          className="absolute inset-0 rounded-none ring-0"
        />
      </div>

      <div className="flex flex-col justify-center px-6 py-8 md:py-10 md:pl-10 md:pr-12 flex-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal dark:text-royaldark mb-3">
          {String(index + 1).padStart(2, "0")} · PRI Global
        </span>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight mb-1">
          {member.name}
        </h3>
        <p className="text-base font-medium text-royal dark:text-royaldark mb-4">{member.title}</p>

        {member.crossRole && (
          <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-4 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 inline-block w-fit">
            {member.crossRoleLabel}
          </p>
        )}

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">{member.bio}</p>

        <TeamContactLinks
          member={member}
          theme="pri"
          className="pt-5 border-t border-[var(--border-subtle)]"
        />
      </div>
    </motion.article>
  );
}
