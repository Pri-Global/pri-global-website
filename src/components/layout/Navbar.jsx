import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import Button from "../ui/Button";

const navLinks = [
  { label: "Services", to: "/services" },
  { label: "Talent Solutions", to: "/talent-solutions" },
  { label: "AI Innovation", to: "/ai-innovation" },
  { label: "Industries", to: "/industries" },
  { label: "Resources", to: "/resources" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-lg transition-colors group ${
                    isActive
                      ? "text-royal bg-royal/10"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {/* Animated underline */}
                    <motion.span
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-royal"
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      style={{ originX: 0 }}
                    />
                    {!isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-royal scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </motion.button>
            <Button to="/careers" variant="secondary" size="sm" className="border-[var(--text-muted)]">
              Careers
            </Button>
            <Button to="/about" size="sm" className="pulse-cta">
              Get in touch
            </Button>
          </div>

          {/* Mobile: theme + burger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
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
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                          isActive
                            ? "text-royal bg-royal/10"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"
                        }`
                      }
                    >
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
