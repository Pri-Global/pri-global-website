import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import BrandLogo from "../ui/BrandLogo";
import { getInitials } from "../../hooks/usePortalAuth";
import { scrollToHash } from "../../utils/scrollToHash";

function parseNavTo(to) {
  const hashIndex = to.indexOf("#");
  if (hashIndex === -1) return { path: to, hash: "" };
  return { path: to.slice(0, hashIndex), hash: to.slice(hashIndex + 1) };
}

/**
 * Shared portal shell — sidebar on desktop, bottom nav on mobile.
 */
export default function PortalLayout({
  portalLabel,
  accentColor = "#1A56DB",
  userName,
  userSubtitle,
  navItems,
  onLogout,
  profileLink,
  children,
}) {
  const { pathname, hash } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const initials = getInitials(userName);

  useEffect(() => {
    if (hash) scrollToHash(hash);
  }, [pathname, hash]);

  const isActive = (to) => {
    const { path, hash: itemHash } = parseNavTo(to);
    if (pathname !== path) return false;
    if (itemHash) return hash === `#${itemHash}`;
    if (hash) {
      const hashNavMatch = navItems.some((item) => {
        const parsed = parseNavTo(item.to);
        return parsed.path === path && parsed.hash && hash === `#${parsed.hash}`;
      });
      return !hashNavMatch;
    }
    return true;
  };

  const closeSidebar = () => setSidebarOpen(false);

  const NavLinkItem = ({ item, mobile = false }) => {
    const active = isActive(item.to);
    const base = mobile
      ? "flex flex-col items-center gap-0.5 px-2 py-1 min-w-[4rem]"
      : "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors";

    const className = mobile
      ? `${base} ${active ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`
      : `${base} ${active ? "text-white" : "text-[var(--text-secondary)] hover:bg-[var(--border-subtle)]"}`;

    const style = active && !mobile ? { backgroundColor: accentColor } : undefined;

    return (
      <Link
        to={item.to}
        className={className}
        style={style}
        onClick={closeSidebar}
        aria-current={active ? "page" : undefined}
      >
        <item.icon size={18} className={active ? "" : "opacity-70"} />
        <span className={mobile ? "text-[10px] leading-tight text-center" : ""}>{item.label}</span>
        {item.badge && !mobile && (
          <span
            className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
            style={{ backgroundColor: accentColor }}
          >
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen pt-[4.5rem] lg:pt-20 bg-[var(--bg-secondary)] flex flex-col lg:flex-row">
      <header className="lg:hidden sticky top-[4.5rem] z-40 bg-[var(--bg-primary)] border-b border-[var(--border)] px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-secondary)]"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accentColor }}>
          {portalLabel}
        </span>
        <button type="button" onClick={onLogout} className="text-xs text-[var(--text-muted)]">
          Sign Out
        </button>
      </header>

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/40 top-[4.5rem]"
          onClick={closeSidebar}
          aria-hidden
        />
      )}

      <aside
        className={`fixed lg:sticky top-[4.5rem] lg:top-20 z-50 h-[calc(100vh-4.5rem)] lg:h-[calc(100vh-5rem)] w-[240px] shrink-0 flex flex-col border-r border-[var(--border)] bg-[var(--bg-primary)] dark:bg-[#0d0f12] transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-[var(--border)] hidden lg:block">
          <Link to="/" className="inline-flex mb-3" onClick={closeSidebar}>
            <BrandLogo mark size="md" />
          </Link>
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accentColor }}>
            {portalLabel}
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => (
            <NavLinkItem key={item.label} item={item} />
          ))}
        </nav>

        <div className="p-4 border-t border-[var(--border)] hidden lg:block">
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-[var(--border-subtle)] transition-colors"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0 relative z-0">
        <div className="hidden lg:flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--bg-primary)] shrink-0">
          <div>
            <h1 className="font-heading text-xl font-bold text-[var(--text-primary)]">{userName}</h1>
            {userSubtitle && <p className="text-sm text-[var(--text-secondary)]">{userSubtitle}</p>}
          </div>
          <div className="flex items-center gap-4">
            {profileLink && (
              <Link
                to={profileLink}
                className="text-sm font-medium hover:underline"
                style={{ color: accentColor }}
                onClick={closeSidebar}
              >
                View Profile
              </Link>
            )}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ backgroundColor: accentColor }}
            >
              {initials}
            </div>
          </div>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-primary)] border-t border-[var(--border)] flex justify-around py-2 px-1 safe-area-pb">
        {navItems.slice(0, 5).map((item) => (
          <NavLinkItem key={item.label} item={item} mobile />
        ))}
      </nav>
    </div>
  );
}
