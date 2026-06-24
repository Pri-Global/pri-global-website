import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { scrollToPageTop } from "../../utils/scrollToPageTop";
import { Menu, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import ThemeToggle from "../ui/ThemeToggle";
import PortalMenu from "../ui/PortalMenu";
import BrandLogo from "../ui/BrandLogo";
import MegaDropdown, { DropdownItemList } from "../ui/MegaDropdown";
import { aiDropdown, resourcesDropdown, companyDropdown } from "../../data/navDropdowns";

const navLinks = [
  { label: "Services", to: "/services" },
  { label: "Talent Solutions", to: "/talent-solutions" },
];

export default function Navbar({ minimal = false }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const mobilePanelRef = useRef(null);
  const menuButtonRef = useRef(null);
  const closeMenus = () => setOpenMenu(null);
  const toggleMenu = (id) => setOpenMenu((v) => (v === id ? null : id));

  const onNavClick = () => {
    setMobileOpen(false);
    closeMenus();
    scrollToPageTop();
  };

  const onLogoClick = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    closeMenus();
    if (pathname !== "/") navigate("/", { replace: true });
    scrollToPageTop();
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    closeMenus();
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    const panel = mobilePanelRef.current;
    const focusables = panel
      ? [...panel.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      : [];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    requestAnimationFrame(() => first?.focus());

    const onTab = (e) => {
      if (e.key !== "Tab" || focusables.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    panel?.addEventListener("keydown", onTab);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      panel?.removeEventListener("keydown", onTab);
    };
  }, [mobileOpen]);

  const aiBadge = <span className="w-1.5 h-1.5 rounded-full bg-royal inline-block" />;

  const headerClass = minimal
    ? "glass-strong glass-nav border-b border-white/20 dark:border-white/10"
    : scrolled
      ? "glass-strong glass-nav border-b border-white/20 dark:border-white/10"
      : "bg-[var(--bg-primary)]/80 dark:bg-[#0a0c12]/75 backdrop-blur-md border-b border-[var(--border-subtle)]";

  const linkClass = ({ isActive }) =>
    `px-3 xl:px-4 py-2 text-sm xl:text-[0.9375rem] font-medium rounded-lg transition-colors whitespace-nowrap ${
      isActive
        ? "text-royal bg-royal/10"
        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}
    >
      <div className="site-container">
        <div className="flex items-center justify-between h-[4.5rem] lg:h-20 xl:h-[5.25rem]">
          <Link to="/" className="flex items-center shrink-0 group gap-2" onClick={onLogoClick}>
            <BrandLogo mark size="lg" animate className="lg:hidden" />
            <BrandLogo size="lg" animate className="hidden lg:block xl:!h-16" />
          </Link>

          {!minimal && (
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1" aria-label="Primary">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} onClick={onNavClick} className={linkClass}>
                  {link.label}
                </NavLink>
              ))}

              <MegaDropdown
                label="AI & PR1SM.AI"
                badge={aiBadge}
                isOpen={openMenu === "ai"}
                onOpen={() => setOpenMenu("ai")}
                onClose={closeMenus}
                onToggle={() => toggleMenu("ai")}
              >
                <DropdownItemList items={aiDropdown.items} onClose={closeMenus} />
              </MegaDropdown>

              <MegaDropdown
                label="Resources"
                isOpen={openMenu === "resources"}
                onOpen={() => setOpenMenu("resources")}
                onClose={closeMenus}
                onToggle={() => toggleMenu("resources")}
              >
                <DropdownItemList items={resourcesDropdown.items} onClose={closeMenus} />
              </MegaDropdown>

              <MegaDropdown
                label="Company"
                isOpen={openMenu === "company"}
                onOpen={() => setOpenMenu("company")}
                onClose={closeMenus}
                onToggle={() => toggleMenu("company")}
              >
                <DropdownItemList items={companyDropdown.items} onClose={closeMenus} />
              </MegaDropdown>
            </nav>
          )}

          {minimal && (
            <p className="hidden sm:block text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
              Portal
            </p>
          )}

          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            <ThemeToggle className="hover:bg-[var(--border-subtle)] rounded-lg" />
            {!minimal && (
              <>
                <PortalMenu />
                <NavLink to="/careers" onClick={onNavClick} className={linkClass}>
                  Careers
                </NavLink>
                <Button to="/get-pricing" variant="glass-accent" size="sm" className="pulse-cta" onClick={onNavClick}>
                  Get Pricing
                </Button>
              </>
            )}
            {minimal && (
              <Button to="/" variant="secondary" size="sm" onClick={onNavClick}>
                Back to site
              </Button>
            )}
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle className="hover:bg-[var(--border-subtle)] rounded-lg" />
            {!minimal && <PortalMenu />}
            {!minimal && (
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal/40"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-panel"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && !minimal && (
          <motion.div
            id="mobile-nav-panel"
            ref={mobilePanelRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden glass-strong border-b border-white/20 dark:border-white/10 max-h-[80vh] overflow-y-auto"
          >
            <div className="site-container pb-5 pt-2 space-y-4">
              <MobileSection title="Explore">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={onNavClick}
                    className="block py-2 text-sm text-[var(--text-secondary)] hover:text-royal"
                  >
                    {link.label}
                  </NavLink>
                ))}
                <Link to="/quiz" onClick={onNavClick} className="block py-2 text-sm text-[var(--text-secondary)] hover:text-royal">
                  Solution Finder Quiz
                </Link>
              </MobileSection>
              <MobileSection title="AI & PR1SM.AI">
                {aiDropdown.items.map((item) => (
                  <MobileLink key={item.label} item={item} onClick={onNavClick} />
                ))}
              </MobileSection>
              <MobileSection title="Resources">
                {resourcesDropdown.items.map((item) => (
                  <MobileLink key={item.label} item={item} onClick={onNavClick} />
                ))}
              </MobileSection>
              <MobileSection title="Company">
                {companyDropdown.items.map((item) => (
                  <MobileLink key={item.label} item={item} onClick={onNavClick} />
                ))}
              </MobileSection>
              <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border)]">
                <NavLink
                  to="/careers"
                  onClick={onNavClick}
                  className="block py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-royal text-center"
                >
                  Careers
                </NavLink>
                <Button to="/get-pricing" variant="glass-accent" size="sm" className="w-full" onClick={onNavClick}>
                  Get Pricing
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileSection({ title, children }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">{title}</p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function MobileLink({ item, onClick }) {
  if (item.external) {
    return (
      <a
        href={item.to}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between py-2 text-sm text-[var(--text-secondary)]"
        onClick={onClick}
      >
        {item.label} <ExternalLink size={12} />
      </a>
    );
  }
  return (
    <Link to={item.to} onClick={onClick} className="block py-2 text-sm text-[var(--text-secondary)] hover:text-royal">
      {item.label}
    </Link>
  );
}
