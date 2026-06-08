import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { scrollToPageTop } from "../../utils/scrollToPageTop";
import { Menu, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import ThemeToggle from "../ui/ThemeToggle";
import PortalMenu from "../ui/PortalMenu";
import BrandLogo from "../ui/BrandLogo";
import MegaDropdown, { DropdownItemList } from "../ui/MegaDropdown";
import {
  aiDropdown,
  resourcesDropdown,
  companyDropdown,
} from "../../data/navDropdowns";

const simpleLinks = [
  { label: "Services", to: "/services" },
  { label: "Talent Solutions", to: "/talent-solutions" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
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
    window.history.replaceState(null, "", "/");
    if (pathname !== "/") navigate("/", { replace: true });
    scrollToPageTop();
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const aiBadge = <span className="w-1.5 h-1.5 rounded-full bg-royal inline-block" />;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[4.5rem] lg:h-20">
          <Link to="/" className="flex items-center shrink-0 group gap-2" onClick={onLogoClick}>
            <BrandLogo mark size="lg" animate className="lg:hidden" />
            <BrandLogo size="lg" animate className="hidden lg:block" />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {simpleLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onNavClick}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive ? "text-royal bg-royal/10" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"
                  }`
                }
              >
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

          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle className="hover:bg-[var(--border-subtle)] rounded-lg" />
            <PortalMenu />
            <Button to="/ai-innovation#demo" variant="ghost" size="sm" onClick={onNavClick}>
              See Demo
            </Button>
            <Button to="/get-pricing" size="sm" className="pulse-cta" onClick={onNavClick}>
              Get Pricing
            </Button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle className="hover:bg-[var(--border-subtle)] rounded-lg" />
            <PortalMenu />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--border-subtle)]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[var(--bg-primary)] border-b border-[var(--border)] max-h-[80vh] overflow-y-auto"
          >
            <div className="px-4 pb-5 pt-2 space-y-4">
              <MobileSection title="Explore">
                {simpleLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={onNavClick}
                    className="block py-2 text-sm text-[var(--text-secondary)] hover:text-royal"
                  >
                    {link.label}
                  </NavLink>
                ))}
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
                <Button to="/ai-innovation#demo" variant="ghost" size="sm" className="w-full" onClick={onNavClick}>
                  See Demo
                </Button>
                <Button to="/get-pricing" size="sm" className="w-full" onClick={onNavClick}>
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
