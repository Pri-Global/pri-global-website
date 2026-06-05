import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FolderOpen,
  ExternalLink,
  Phone,
  Briefcase,
  Mail,
  LogOut,
} from "lucide-react";
import Button from "../components/ui/Button";
import BrandLogo from "../components/ui/BrandLogo";
import VideoPlayer from "../components/ui/VideoPlayer";
import {
  clearEmployeeSession,
  getEmployeeSession,
  employeeDisplayName,
} from "../components/ProtectedRoute";
import { employeeVideoLibrary } from "../data/videos";

const cards = [
  {
    icon: FolderOpen,
    title: "Company Resources",
    description: "Links, documents, and internal guides — coming soon.",
  },
  {
    icon: ExternalLink,
    title: "PR1SM.AI Access",
    description: "Launch the PR1SM.AI intelligence layer.",
    action: { label: "Launch PR1SM.AI", href: "https://www.pr1sm.ai", external: true },
  },
  {
    icon: Phone,
    title: "IT Support",
    description: "636.256.7172",
    action: { label: "Call IT", href: "tel:6362567172", external: true },
  },
  {
    icon: Briefcase,
    title: "Careers & Openings",
    description: "Explore current opportunities at PRI Global.",
    action: { label: "View Careers", to: "/careers" },
  },
  {
    icon: Mail,
    title: "Submit a Request",
    description: "Reach our team for portal or access requests.",
    action: { label: "Email Us", href: "mailto:info@priglobal.com", external: true },
  },
];

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const session = getEmployeeSession();
  const name = employeeDisplayName(session?.email);

  const logout = () => {
    clearEmployeeSession();
    navigate("/", { replace: true });
  };

  return (
    <div className="py-24 md:py-28 bg-[var(--bg-secondary)] min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <BrandLogo mark size="lg" className="mb-4" />
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
              Welcome back, {name}
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">{session?.email}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {cards.map(({ icon: Icon, title, description, action }) => (
            <div
              key={title}
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 flex flex-col"
            >
              <div className="w-10 h-10 rounded-lg bg-royal/10 flex items-center justify-center mb-4">
                <Icon size={20} className="text-royal dark:text-royaldark" />
              </div>
              <h2 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2">
                {title}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] flex-1 mb-4">{description}</p>
              {action &&
                (action.to ? (
                  <Button to={action.to} size="sm" variant="secondary">
                    {action.label}
                  </Button>
                ) : (
                  <Button
                    href={action.href}
                    size="sm"
                    variant="secondary"
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                  >
                    {action.label}
                  </Button>
                ))}
            </div>
          ))}
        </div>

        <section id="video-library" className="border-t border-[var(--border)] pt-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
            Video Library
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-2 max-w-2xl">
            Internal brand and training videos. Videos load on demand — use Wi‑Fi when possible.
          </p>
          <p className="text-xs text-[var(--text-muted)] mb-8">
            {employeeVideoLibrary.length} videos available
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {employeeVideoLibrary.map((video, i) => (
              <motion.div
                key={video.src}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              >
                <VideoPlayer src={video.src} title={video.title} />
              </motion.div>
            ))}
          </div>
        </section>

        <p className="mt-12 text-sm text-[var(--text-muted)] leading-relaxed max-w-3xl border-t border-[var(--border)] pt-8">
          This portal is currently in beta. Full features including document access, project
          tracking, and HR resources will be available in the next phase. Contact Ajay Patel for
          access to full PR1SM.AI platform features.
        </p>
      </div>
    </div>
  );
}
