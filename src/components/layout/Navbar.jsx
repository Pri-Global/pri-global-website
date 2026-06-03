import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ExternalLink, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import ThemeToggle from "../ui/ThemeToggle";

const navLinks = [
  { label: "Services", to: "/services" },
  { label: "Talent Solutions", to: "/talent-solutions" },
  { label: "Industries", to: "/industries" },
  { label: "Resources", to: "/resources" },
  { label: "About", to: "/about" },
];

/* AI dropdown sub-links */
const aiDropdown = [
  { label: "AI Innovation", to: "/ai-innovation", external: false },
  { label: "PR1SM.AI", to: "https://www.pr1sm.ai", external: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const aiRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close AI dropdown when clicking outside */
  useEffect(() => {
    const handler = (e) => { if (aiRef.current && !aiRef.current.contains(e.target)) setAiOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-8 h-8 rounded-lg bg-royal flex items-center justify-center shadow-sm"
            >
              <span className="text-white font-heading font-bold text-sm">P</span>
            </motion.div>
            <span className="font-heading font-bold text-lg text-[var(--text-primary)] group-hover:text-royal transition-colors">
              PRI Global
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Regular nav links (before AI) */}
            {navLinks.slice(0, 1).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-lg transition-colors group ${
                    isActive ? "text-royal bg-royal/10" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <motion.span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-royal" initial={false} animate={{ scaleX: isActive ? 1 : 0 }} transition={{ duration: 0.2, ease: "easeOut" }} style={{ originX: 0 }} />
                    {!isActive && <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-royal scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />}
                  </>
                )}
              </NavLink>
            ))}
            {navLinks.slice(1, 2).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-lg transition-colors group ${
                    isActive ? "text-royal bg-royal/10" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <motion.span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-royal" initial={false} animate={{ scaleX: isActive ? 1 : 0 }} transition={{ duration: 0.2, ease: "easeOut" }} style={{ originX: 0 }} />
                    {!isActive && <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-royal scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />}
                  </>
                )}
              </NavLink>
            ))}

            {/* AI & PR1SM.AI dropdown */}
            <div ref={aiRef} className="relative">
              <button
                onMouseEnter={() => setAiOpen(true)}
                onMouseLeave={() => setAiOpen(false)}
                onClick={() => setAiOpen((v) => !v)}
                className="relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"
              >
                AI &amp; PR1SM.AI
                <span className="w-1.5 h-1.5 rounded-full bg-royal inline-block" />
                <ChevronDown size={13} className={`transition-transform duration-200 ${aiOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {aiOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    onMouseEnter={() => setAiOpen(true)}
                    onMouseLeave={() => setAiOpen(false)}
                    className="absolute top-full left-0 mt-1 w-52 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] shadow-lg overflow-hidden z-50"
                  >
                    {aiDropdown.map((item) =>
                      item.external ? (
                        <a
                          key={item.label}
                          href={item.to}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-2 px-4 py-3 text-sm text-[var(--text-secondary)] hover:text-royal hover:bg-[var(--border-subtle)] transition-colors"
                          onClick={() => setAiOpen(false)}
                        >
                          {item.label}
                          <ExternalLink size={12} className="text-[var(--text-muted)]" />
                        </a>
                      ) : (
                        <NavLink
                          key={item.label}
                          to={item.to}
                          className={({ isActive }) =>
                            `flex items-center px-4 py-3 text-sm transition-colors ${isActive ? "text-royal bg-royal/8 font-medium" : "text-[var(--text-secondary)] hover:text-royal hover:bg-[var(--border-subtle)]"}`
                          }
                          onClick={() => setAiOpen(false)}
                        >
                          {item.label}
                        </NavLink>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Remaining nav links */}
            {navLinks.slice(2).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-lg transition-colors group ${
                    isActive ? "text-royal bg-royal/10" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <motion.span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-royal" initial={false} animate={{ scaleX: isActive ? 1 : 0 }} transition={{ duration: 0.2, ease: "easeOut" }} style={{ originX: 0 }} />
                    {!isActive && <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-royal scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle className="hover:bg-[var(--border-subtle)] rounded-lg" />
            <Button to="/careers" variant="secondary" size="sm" className="border-[var(--text-muted)]">
              Careers
            </Button>
            <Button to="/about" size="sm" className="pulse-cta">
              Get in touch
            </Button>
          </div>

          {/* Mobile: theme + burger */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle className="hover:bg-[var(--border-subtle)] rounded-lg" />
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-[var(--bg-primary)] border-b border-[var(--border)]"
          >
            <div className="px-4 pb-4">
              <nav className="flex flex-col gap-1 pt-2">
                {/* Services + Talent */}
                {navLinks.slice(0, 2).map((link, i) => (
                  <motion.div key={link.to} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04, duration: 0.2 }}>
                    <NavLink to={link.to} onClick={() => setOpen(false)} className={({ isActive }) => `block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive ? "text-royal bg-royal/10" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"}`}>
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
                {/* AI dropdown items flat on mobile */}
                <motion.div initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.08, duration: 0.2 }}>
                  <NavLink to="/ai-innovation" onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive ? "text-royal bg-royal/10" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"}`}>
                    <span className="flex items-center gap-2">AI Innovation <span className="w-1.5 h-1.5 rounded-full bg-royal inline-block" /></span>
                  </NavLink>
                </motion.div>
                <motion.div initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.2 }}>
                  <a href="https://www.pr1sm.ai" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]">
                    PR1SM.AI <ExternalLink size={12} />
                  </a>
                </motion.div>
                {/* Remaining links */}
                {navLinks.slice(2).map((link, i) => (
                  <motion.div key={link.to} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: (i + 4) * 0.04, duration: 0.2 }}>
                    <NavLink to={link.to} onClick={() => setOpen(false)} className={({ isActive }) => `block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive ? "text-royal bg-royal/10" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"}`}>
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
                <NavLink
                  to="/careers"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors"
                >
                  Careers
                </NavLink>
              </nav>
              <Button to="/about" size="sm" className="w-full mt-3" onClick={() => setOpen(false)}>
                Get in touch
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
