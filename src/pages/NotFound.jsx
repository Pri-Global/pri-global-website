import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home, Briefcase, MessageCircle } from "lucide-react";
import SEO from "../components/SEO";
import BrandLogo from "../components/ui/BrandLogo";
import AnimatedIcon from "../components/ui/AnimatedIcon";

const EASE = [0.22, 1, 0.36, 1];

const cards = [
  { label: "Go Home", to: "/", icon: Home },
  { label: "Our Services", to: "/services", icon: Briefcase },
  { label: "Contact Us", to: "/about#contact", icon: ArrowRight },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export default function NotFound() {
  const openChat = () => {
    window.dispatchEvent(new CustomEvent("priva-open"));
  };

  return (
    <>
      <SEO title="404 — Page Not Found" description="The page you are looking for does not exist." noindex />

      <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-24 overflow-hidden">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-heading text-[7rem] sm:text-[9rem] md:text-[12rem] font-bold text-royal select-none"
          aria-hidden
        >
          404
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="relative z-10 max-w-xl w-full text-center"
        >
          <BrandLogo mark size="3xl" className="mx-auto mb-8" />

          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Looks like this page moved.
          </h1>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-10">
            The page you&apos;re looking for doesn&apos;t exist or has been relocated. Let&apos;s get
            you back on track.
          </p>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-3 gap-3 mb-10"
          >
            {cards.map(({ label, to, icon: Icon }) => (
              <motion.div key={label} variants={item}>
                <Link
                  to={to}
                  className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-royal/40 hover:shadow-md transition-all text-sm font-semibold text-[var(--text-primary)]"
                >
                  <AnimatedIcon Icon={Icon} size={20} className="text-royal dark:text-royaldark" />
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <button
            type="button"
            onClick={openChat}
            className="inline-flex items-center gap-2 text-sm font-semibold text-royal dark:text-royaldark hover:underline"
          >
            <MessageCircle size={16} />
            Or talk to PriVa →
          </button>
        </motion.div>
      </section>
    </>
  );
}
