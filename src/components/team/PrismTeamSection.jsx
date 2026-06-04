import { motion } from "framer-motion";
import TeamPhoto from "./TeamPhoto";
import TeamContactLinks from "./TeamContactLinks";
import LinkedInIcon from "./LinkedInIcon";

const LEADERSHIP_IDS = new Set([
  "ajay-patel-prism",
  "keenan-patel-prism",
  "marla-dicandia-prism",
  "liezl-moss",
]);

function FeaturedCard({ member, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#1a2d5e] bg-[#0a1220] hover:border-[#4169E1] transition-colors"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <TeamPhoto
          member={member}
          shape="portrait"
          theme="prism"
          fill
          className="absolute inset-0 rounded-none ring-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1220] via-transparent to-transparent pointer-events-none" />
      </div>
      <div className="p-5 -mt-8 relative z-10">
        <h3 className="font-heading text-lg font-bold text-white">{member.name}</h3>
        <p className="text-sm text-[#4169E1] mt-0.5 leading-snug">{member.title}</p>
        {member.crossRole && (
          <p className="text-[10px] text-[#93c5fd] mt-2 font-medium">{member.crossRoleLabel}</p>
        )}
        <p className="text-xs text-[#6a8aaa] mt-3 line-clamp-3 leading-relaxed">{member.bio}</p>
        <TeamContactLinks member={member} theme="prism" className="mt-4" />
      </div>
    </motion.article>
  );
}

function TeamListRow({ member, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex gap-5 sm:gap-6 items-start p-5 sm:p-6 rounded-2xl border border-[#1a2d5e]/80 bg-[#0a1220]/80 hover:border-[#4169E1]/60 hover:bg-[#0d1628] transition-colors"
    >
      <TeamPhoto member={member} size={96} shape="rounded" theme="prism" className="ring-0" />
      <div className="min-w-0 flex-1 pt-0.5">
        <h3 className="font-heading font-bold text-white text-lg sm:text-xl leading-tight">
          {member.name}
        </h3>
        <p className="text-sm sm:text-base text-[#4169E1] mt-1 font-medium">{member.title}</p>
        <p className="text-sm text-[#6a8aaa] mt-2 line-clamp-3 leading-relaxed">{member.bio}</p>
      </div>
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 self-center sm:self-start sm:mt-1 p-3 rounded-xl text-[#4169E1] hover:text-white hover:bg-[#1A56DB]/25 transition-colors"
          aria-label="LinkedIn"
        >
          <LinkedInIcon size={22} />
        </a>
      )}
    </motion.article>
  );
}

export default function PrismTeamSection({ members }) {
  const leadership = members.filter((m) => LEADERSHIP_IDS.has(m.id));
  const team = members.filter((m) => !LEADERSHIP_IDS.has(m.id));

  return (
    <div className="space-y-14">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#93c5fd] mb-6 text-center">
          Leadership
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {leadership.map((member, i) => (
            <FeaturedCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>

      {team.length > 0 && (
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#93c5fd] mb-8 text-center">
            Engineering &amp; Operations
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 max-w-6xl mx-auto">
            {team.map((member, i) => (
              <TeamListRow key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
