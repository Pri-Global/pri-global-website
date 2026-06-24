import {
  PRISM_TEAM_ROW1_IDS,
  PRISM_TEAM_ROW2_IDS,
  PRISM_TEAM_EXTENDED_IDS,
  PRISM_INITIALS_COLORS,
} from "../../data/team";

const TITLE_STYLE = { fontSize: "clamp(1.85rem, 3.8vw, 3.6rem)", fontWeight: 700 };
const SUBTITLE_STYLE = { fontSize: "clamp(0.95rem, 1.25vw, 1.15rem)" };
const NAME_STYLE = { fontSize: "clamp(0.95rem, 1.15vw, 1.1rem)", fontWeight: 700 };
const ROLE_STYLE = { fontSize: "clamp(0.78rem, 0.95vw, 0.9rem)", fontWeight: 600 };
const BIO_STYLE = { fontSize: "clamp(0.78rem, 0.95vw, 0.88rem)" };

const GLOBAL_STATS = [
  { icon: "groups", value: "5000+", label: "Vetted IT & AI\nProfessionals", border: false },
  { icon: "language", value: "Global", label: "Resources Across\nAll Time Zones", border: true },
  { icon: "verified_user", value: "Proven", label: "Track Record of\nSuccessful Placements", border: true },
  { icon: "auto_awesome", value: "Innovation", label: "Broad Expertise.\nEndless Possibilities.", border: true },
];

function MaterialIcon({ name, size = "1.3rem", className = "" }) {
  return (
    <span
      className={`material-symbols-rounded leading-none ${className}`}
      style={{ fontSize: size }}
      aria-hidden
    >
      {name}
    </span>
  );
}

function resolveMembers(members, ids) {
  const map = new Map(members.map((m) => [m.id, m]));
  return ids.map((id) => map.get(id)).filter(Boolean);
}

function MemberCard({ member, largePhoto = true }) {
  const crop = member.photoStyle || {};
  const imgStyle = {
    objectPosition: crop.objectPosition || "center center",
    transformOrigin: "center center",
    ...(crop.scale ? { transform: `scale(${crop.scale})` } : {}),
  };
  const photoSrc = member.photo || member.photoUrl;
  const initialsBg = PRISM_INITIALS_COLORS[member.initials] || "#1A56DB";

  return (
    <div className="flex flex-col items-center text-center rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-sm hover:border-royal/40 dark:hover:border-royaldark/50 transition-colors">
      <div
        className={`relative overflow-hidden rounded-full border-2 border-royal/25 dark:border-royaldark/40 shadow-[0_4px_16px_rgba(26,86,219,0.12)] dark:shadow-[0_4px_18px_rgba(65,105,225,0.22)] bg-[var(--bg-secondary)] ${
          largePhoto ? "w-20 h-20 md:w-[5.5rem] md:h-[5.5rem]" : "w-20 h-20"
        }`}
      >
        {photoSrc ? (
          <img
            alt={member.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            src={photoSrc}
            style={imgStyle}
          />
        ) : (
          <span
            className="absolute inset-0 flex items-center justify-center font-heading font-bold text-white"
            style={{ backgroundColor: initialsBg, fontSize: largePhoto ? "1.35rem" : "1.1rem" }}
            aria-hidden
          >
            {member.initials}
          </span>
        )}
      </div>
      <h3
        className="font-heading text-[var(--text-primary)] mt-3 leading-tight"
        style={NAME_STYLE}
      >
        {member.name}
      </h3>
      <p
        className="font-heading mt-1 leading-tight text-royal dark:text-royaldark"
        style={ROLE_STYLE}
      >
        {member.title}
      </p>
      <p
        className="font-body text-[var(--text-secondary)] leading-snug mt-3"
        style={BIO_STYLE}
      >
        {member.bio}
      </p>
    </div>
  );
}

export default function PrismTeamSection({ members }) {
  const row1 = resolveMembers(members, PRISM_TEAM_ROW1_IDS);
  const row2 = resolveMembers(members, PRISM_TEAM_ROW2_IDS);
  const extended = resolveMembers(members, PRISM_TEAM_EXTENDED_IDS);

  return (
    <div className="w-full">
      <div className="w-full text-center max-w-3xl mx-auto mb-2">
        <span className="inline-block text-xs font-semibold text-royal dark:text-royaldark uppercase tracking-widest mb-4">
          PR1SM.AI
        </span>
        <h2
          className="font-heading text-[var(--text-primary)] leading-[1.05]"
          style={TITLE_STYLE}
        >
          Team &{" "}
          <span className="text-royal dark:text-royaldark">Leadership</span>
        </h2>
        <p
          className="font-body text-[var(--text-secondary)] leading-relaxed mt-3"
          style={SUBTITLE_STYLE}
        >
          Experienced leaders. Proven track record.
        </p>
        <div className="mt-4 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-royal/60 to-transparent dark:via-royaldark/60" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mt-8 md:mt-10">
        {row1.map((member) => (
          <MemberCard key={member.id} member={member} largePhoto />
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mt-4 md:mt-5">
        {row2.map((member) => (
          <MemberCard key={member.id} member={member} largePhoto={false} />
        ))}
      </div>

      <div className="mt-8 md:mt-10 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 md:p-7 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)] items-center gap-6 lg:gap-8">
          <div className="flex items-start gap-4">
            <span className="shrink-0 inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-royal/10 dark:bg-royaldark/15 border border-royal/25 dark:border-royaldark/35 text-royal dark:text-royaldark">
              <MaterialIcon name="language" size="1.85rem" />
            </span>
            <div className="min-w-0">
              <h3
                className="font-heading text-[var(--text-primary)] leading-tight"
                style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)", fontWeight: 700 }}
              >
                Deep Global Delivery &amp; AI Resources
              </h3>
              <p
                className="font-body text-[var(--text-secondary)] leading-snug mt-1.5"
                style={{ fontSize: "clamp(0.82rem, 1vw, 0.92rem)" }}
              >
                Through our parent company, PRI Global, we have access to over 5,000+ vetted IT and
                AI professionals across every major discipline. This global network empowers PR1SM.AI
                to deliver innovative, enterprise-grade solutions with speed, scale, and exceptional
                quality for our clients.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full">
            {GLOBAL_STATS.map(({ icon, value, label, border }) => (
              <div
                key={value}
                className={`flex flex-col items-center text-center gap-1.5 px-2 md:px-3 ${
                  border ? "lg:border-l lg:border-[var(--border-subtle)]" : ""
                }`}
              >
                <span className="inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full bg-royal/10 dark:bg-royaldark/15 border border-royal/25 dark:border-royaldark/35 text-royal dark:text-royaldark">
                  <MaterialIcon name={icon} />
                </span>
                <p
                  className="font-heading text-[var(--text-primary)] leading-tight mt-0.5"
                  style={{ fontSize: "clamp(0.98rem, 1.2vw, 1.15rem)", fontWeight: 700 }}
                >
                  {value}
                </p>
                <p
                  className="font-body text-[var(--text-muted)] leading-snug whitespace-pre-line"
                  style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.8rem)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {extended.length > 0 && (
        <>
          <div className="flex justify-center mt-6 md:mt-8">
            <a
              href="#prism-full-team"
              className="inline-flex items-center gap-2 font-heading tracking-[0.12em] uppercase text-royal dark:text-royaldark hover:opacity-80 transition-opacity"
              style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", fontWeight: 700 }}
            >
              Meet the Full Team
              <MaterialIcon name="arrow_forward" size="1.25rem" />
            </a>
          </div>

          <div
            id="prism-full-team"
            className="scroll-mt-28 mt-10 md:mt-12 pt-10 border-t border-[var(--border-subtle)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-6 text-center">
              Extended team
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
              {extended.map((member) => (
                <MemberCard key={member.id} member={member} largePhoto={false} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
