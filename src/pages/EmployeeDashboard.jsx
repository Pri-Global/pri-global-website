import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import {
  ExternalLink,
  Phone,
  Mail,
  Megaphone,
  Users,
  BookOpen,
  ArrowRight,
  Sparkles,
  Plug,
} from "lucide-react";
import SEO from "../components/SEO";
import PortalLayout from "../components/portal/PortalLayout";
import PortalCard from "../components/portal/PortalCard";
import Button from "../components/ui/Button";
import VideoPlayer from "../components/ui/VideoPlayer";
import {
  clearEmployeeSession,
  getEmployeeSession,
  employeeDisplayName,
} from "../components/ProtectedRoute";
import { isLiveEmployeeSession } from "../services/employeePortal";
import { getEmployeeNav } from "../data/portalNav";
import {
  EMPLOYEE_ANNOUNCEMENTS,
  EMPLOYEE_QUICK_LINKS,
  EMPLOYEE_CONTACTS,
  EMPLOYEE_POLICIES,
  EMPLOYEE_ONBOARDING,
  EMPLOYEE_INTEGRATIONS,
} from "../data/employeePortal";
import { employeeVideoLibrary } from "../data/videos";
import { offices } from "../data/offices";

const ACCENT = "#8b5cf6";

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const session = getEmployeeSession();
  const name = session?.name || employeeDisplayName(session?.email);
  const liveSession = isLiveEmployeeSession(session);
  const navItems = useMemo(
    () => getEmployeeNav({ announcementCount: EMPLOYEE_ANNOUNCEMENTS.length }),
    []
  );

  const logout = async () => {
    clearEmployeeSession();
    navigate("/", { replace: true });
  };

  return (
    <>
      <SEO
        title="Employee Portal"
        description="PRI Global employee portal — HR, IT, training, and internal resources."
        url="/employee-dashboard"
        noindex
      />
      <PortalLayout
        portalLabel="Employee Portal"
        accentColor={ACCENT}
        userName={`Welcome back, ${name}`}
        userSubtitle={
          liveSession
            ? [session?.jobTitle, session?.email].filter(Boolean).join(" · ")
            : session?.email
        }
        navItems={navItems}
        onLogout={logout}
      >
        {/* Hero strip */}
        <section className="mb-8 rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 via-[var(--bg-card)] to-[var(--bg-card)] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2">
                <Sparkles size={14} /> Internal Team Hub
              </span>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-[var(--text-primary)]">
                Everything you need for your day at PRI Global
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xl">
                {liveSession
                  ? session?.authProvider === "rippling"
                    ? "Signed in via Rippling. HR data will expand as we connect more Rippling APIs."
                    : "Signed in with Microsoft 365."
                  : "Payroll, HR, IT support, training, referrals, and company updates — in one place."}
              </p>
            </div>
            <Button
              href="https://www.pr1sm.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="!bg-violet-600 hover:!bg-violet-700 shrink-0"
            >
              Launch PR1SM.AI <ExternalLink size={16} />
            </Button>
          </div>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <PortalCard icon={Megaphone} value={String(EMPLOYEE_ANNOUNCEMENTS.length)} label="New Announcements" color="purple" />
          <PortalCard icon={BookOpen} value={String(employeeVideoLibrary.length)} label="Training Videos" color="purple" />
          <PortalCard icon={Users} value={String(offices.length)} label="Global Offices" color="purple" />
          <PortalCard icon={Phone} value="IT" label="636.256.7172 · Help Desk" color="purple" />
        </div>

        {/* Announcements */}
        <section id="announcements" className="mb-10 scroll-mt-24">
          <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-4">
            Company Announcements
          </h2>
          <div className="space-y-3">
            {EMPLOYEE_ANNOUNCEMENTS.map((item) => (
              <div
                key={item.id}
                className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-start gap-4 hover:border-violet-500/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-400">
                      {item.tag}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">{item.date}</span>
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)]">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{item.summary}</p>
                </div>
                {item.href.startsWith("/") ? (
                  <Link to={item.href} className="text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline shrink-0 inline-flex items-center gap-1">
                    Read more <ArrowRight size={14} />
                  </Link>
                ) : (
                  <a href={item.href} className="text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline shrink-0 inline-flex items-center gap-1">
                    Read more <ArrowRight size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick links */}
        <section id="links" className="mb-10 scroll-mt-24">
          <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-4">
            Quick Access
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EMPLOYEE_QUICK_LINKS.map((link) => (
              <div
                key={link.id}
                className={`bg-[var(--bg-card)] border rounded-2xl p-5 flex flex-col ${
                  link.priority ? "border-violet-500/30 shadow-sm" : "border-[var(--border)]"
                }`}
              >
                <h3 className="font-heading font-bold text-[var(--text-primary)] mb-1">{link.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] flex-1 mb-4">{link.description}</p>
                {link.href.startsWith("/") ? (
                  <Button to={link.href} size="sm" variant="secondary">
                    {link.cta}
                  </Button>
                ) : (
                  <Button
                    href={link.href}
                    size="sm"
                    variant="secondary"
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.cta} {link.external && <ExternalLink size={14} />}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Planned integrations */}
        <section id="integrations" className="mb-10 scroll-mt-24">
          <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-1">
            Connected Systems
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            The employee portal currently runs on a test account. Live sign-in, HR data, and team collaboration will connect through these platforms.
          </p>
          <div className="grid lg:grid-cols-2 gap-4">
            {EMPLOYEE_INTEGRATIONS.map((integration) => (
              <div
                key={integration.id}
                className="bg-[var(--bg-card)] border border-violet-500/20 rounded-2xl p-5 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <Plug size={18} className="text-violet-600 dark:text-violet-400" />
                    <h3 className="font-heading font-bold text-[var(--text-primary)]">{integration.title}</h3>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      integration.id === "teams" && session?.authProvider === "microsoft"
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                        : integration.id === "rippling" && session?.authProvider === "rippling"
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          : "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                    }`}
                  >
                    {integration.id === "teams" && session?.authProvider === "microsoft"
                      ? "Connected"
                      : integration.id === "rippling" && session?.authProvider === "rippling"
                        ? "Connected"
                        : integration.status}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] flex-1">{integration.description}</p>
                <ul className="mt-3 space-y-1">
                  {integration.features.map((feature) => (
                    <li key={feature} className="text-xs text-[var(--text-muted)]">
                      • {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={integration.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline mt-4"
                >
                  API documentation <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* HR contacts + policies */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          <section id="policies" className="scroll-mt-24">
            <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-4">
              HR & Policies
            </h2>
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 mb-4">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">New hire checklist</h3>
              <ol className="space-y-3">
                {EMPLOYEE_ONBOARDING.map((item) => (
                  <li key={item.step} className="flex gap-3 text-sm">
                    <span className="w-6 h-6 rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-400 flex items-center justify-center text-xs font-bold shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">{item.title}</p>
                      <p className="text-[var(--text-muted)] text-xs mt-0.5">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-2">
              {EMPLOYEE_POLICIES.map((p) =>
                p.href.startsWith("/") ? (
                  <Link
                    key={p.label}
                    to={p.href}
                    className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-sm font-medium hover:border-violet-500/40 transition-colors"
                  >
                    {p.label} <ArrowRight size={14} className="text-[var(--text-muted)]" />
                  </Link>
                ) : (
                  <a
                    key={p.label}
                    href={p.href}
                    className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-sm font-medium hover:border-violet-500/40 transition-colors"
                  >
                    {p.label} <ExternalLink size={14} className="text-[var(--text-muted)]" />
                  </a>
                )
              )}
            </div>
          </section>

          <section>
            <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-4">
              Key Contacts
            </h2>
            <div className="space-y-3">
              {EMPLOYEE_CONTACTS.map((c) => (
                <div key={c.name} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5">
                  <h3 className="font-semibold text-[var(--text-primary)]">{c.name}</h3>
                  <p className="text-xs text-violet-600 dark:text-violet-400 font-medium mt-0.5">{c.role}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-2">{c.topics}</p>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <Link to="/about#contact" className="inline-flex items-center gap-1 text-xs text-royal dark:text-royaldark hover:underline">
                      <Mail size={12} /> Contact
                    </Link>
                    {c.phone && (
                      <a href={`tel:${c.phone.replace(/\./g, "")}`} className="inline-flex items-center gap-1 text-xs text-royal dark:text-royaldark hover:underline">
                        <Phone size={12} /> {c.phone}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Office directory */}
        <section id="directory" className="mb-10 scroll-mt-24">
          <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-4">
            Office Directory
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {offices.map((office) => (
              <div key={office.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5">
                <h3 className="font-semibold text-[var(--text-primary)]">{office.label}</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">{office.specialty}</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">{office.address}</p>
                {office.phoneDisplay && (
                  <a href={`tel:${office.phone}`} className="text-sm text-violet-600 dark:text-violet-400 hover:underline mt-2 inline-block">
                    {office.phoneDisplay}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Videos */}
        <section id="videos" className="scroll-mt-24">
          <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-1">
            Training & Brand Library
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Onboarding, culture, and client-ready brand videos. Use Wi‑Fi when possible.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {employeeVideoLibrary.map((video) => (
              <VideoPlayer key={video.src} src={video.src} title={video.title} />
            ))}
          </div>
        </section>
      </PortalLayout>
    </>
  );
}
