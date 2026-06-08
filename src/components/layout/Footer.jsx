import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollToPageTop } from "../../utils/scrollToPageTop";
import { ExternalLink, Globe, Code2, MapPin, Phone } from "lucide-react";
import AnimatedIcon from "../ui/AnimatedIcon";
import BrandLogo from "../ui/BrandLogo";

const footerLinks = {
  Services: [
    { label: "IT Staffing & Talent Solutions", to: "/talent-solutions" },
    { label: "Managed IT & Infrastructure", to: "/services" },
    { label: "Cybersecurity & Risk Management", to: "/services" },
    { label: "Cloud & Digital Transformation", to: "/services" },
    { label: "Data Solutions & Integration", to: "/services" },
    { label: "Network Services", to: "/services" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Why PRI Global", to: "/why-pri-global" },
    { label: "Industries", to: "/industries" },
    { label: "Resources", to: "/resources" },
    { label: "Careers", to: "/careers" },
    { label: "FAQ", to: "/faq" },
    { label: "Get Pricing", to: "/get-pricing" },
  ],
  "AI Innovation": [
    { label: "PR1SM.AI Platform", to: "/ai-innovation" },
    { label: "ROI Calculator", to: "/roi-calculator" },
    { label: "Strategic IT Consulting", to: "/services" },
    { label: "Business Transformation", to: "/services" },
    { label: "AI Strategy", to: "/ai-innovation" },
  ],
};

const socials = [
  { icon: ExternalLink, href: "https://www.linkedin.com/company/pri-global/", label: "LinkedIn" },
  { icon: Globe, href: "https://priglobal.com", label: "Website" },
  { icon: Code2, href: "#", label: "GitHub" },
];

export default function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onLogoClick = (e) => {
    e.preventDefault();
    window.history.replaceState(null, "", "/");
    if (pathname !== "/") {
      navigate("/", { replace: true });
    }
    scrollToPageTop();
  };

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center mb-5" onClick={onLogoClick}>
              <BrandLogo size="xl" variant="onDark" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              Technology that moves business forward. In business since 1997 — over 28 years of trusted services. We combine deep expertise,
              proven delivery, and genuine partnership to help organisations thrive in a digital world.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-royal transition-colors"
                >
                  <AnimatedIcon Icon={Icon} size={16} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                {group}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      onClick={scrollToPageTop}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="flex flex-col md:flex-row flex-wrap gap-4 py-8 border-b border-white/10 text-sm text-white/50">
          <a href="tel:6362567172" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone size={14} /> 636.256.7172 (PRI Global HQ)
          </a>
          <a href="tel:6367791651" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone size={14} /> 636-779-1651 (Ajay Patel · PR1SM.AI)
          </a>
          <a href="tel:3147845854" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone size={14} /> 314-784-5854 (Liezl Moss · Growth)
          </a>
          <a href="mailto:info@priglobal.com" className="flex items-center gap-2 hover:text-white transition-colors">
            info@priglobal.com
          </a>
          <span className="flex items-start gap-2 flex-wrap">
            <MapPin size={14} className="shrink-0 mt-0.5" /> Ellisville, MO · Hyderabad · Pune · Manila · Ottawa
          </span>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <span className="text-center sm:text-left">© 2026 PRI Global (PRI India Private Services Limited). All rights reserved.</span>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link to="/get-pricing" onClick={scrollToPageTop} className="hover:text-white/70 transition-colors">Get Pricing</Link>
            <Link to="/faq" onClick={scrollToPageTop} className="hover:text-white/70 transition-colors">FAQ</Link>
            <Link to="/roi-calculator" onClick={scrollToPageTop} className="hover:text-white/70 transition-colors">ROI Calculator</Link>
            <Link to="/privacy-policy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link to="/legal" className="hover:text-white/70 transition-colors">Legal Notice</Link>
            <Link to="/cookie-settings" className="hover:text-white/70 transition-colors">Cookie Settings</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
