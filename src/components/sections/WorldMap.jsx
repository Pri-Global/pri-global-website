import { useState, useRef } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import AnimatedIcon from "../ui/AnimatedIcon";
import { useTheme } from "../../context/ThemeContext";
import { offices } from "../../data/offices";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function OfficeTooltip({ office, onClose }) {
  const mapsQuery = encodeURIComponent(office.address);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-xl p-4 min-w-[240px] max-w-[280px] text-left"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h4 className="font-heading font-bold text-[var(--text-primary)] text-sm">
            {office.city}, {office.country}
          </h4>
          <span
            className={`inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              office.isHQ ? "bg-royal/15 text-royal" : "bg-[var(--border-subtle)] text-[var(--text-muted)]"
            }`}
          >
            {office.isHQ ? "Headquarters" : "Regional Office"}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="md:hidden text-[var(--text-muted)] text-lg leading-none"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <p className="group flex items-start gap-2 text-xs text-[var(--text-secondary)] mb-2">
        <AnimatedIcon Icon={MapPin} size={12} className="shrink-0 mt-0.5 text-royal" />
        {office.address}
      </p>
      <a
        href={`tel:${office.phone}`}
        className="group flex items-center gap-2 text-xs text-royal hover:underline mb-2"
      >
        <AnimatedIcon Icon={Phone} size={12} className="text-royal" />
        {office.phoneDisplay}
      </a>
      <p className="text-[10px] text-[var(--text-muted)] mb-2">{office.contact}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {office.specialty.split(" · ").map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 rounded-full bg-royal/10 text-royal dark:text-royaldark"
          >
            {tag}
          </span>
        ))}
      </div>
      {office.email && (
        <a
          href={`mailto:${office.email}`}
          className="group flex items-center gap-2 text-xs text-royal hover:underline mb-2"
        >
          <AnimatedIcon Icon={Mail} size={12} className="text-royal" />
          {office.email}
        </a>
      )}
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1 text-xs font-medium text-royal hover:underline"
      >
        Get Directions <AnimatedIcon Icon={ExternalLink} size={11} className="text-royal" />
      </a>
    </motion.div>
  );
}

export default function WorldMap() {
  const { isDark } = useTheme();
  const [active, setActive] = useState(null);
  const landFill = isDark ? "#1a2440" : "#dde4f0";
  const landStroke = isDark ? "#0f1a30" : "#c8d0e0";
  const dotFill = "#1A56DB";
  const dotStroke = isDark ? "#111318" : "#F2F0EB";

  const activeOffice = offices.find((o) => o.id === active);

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <ComposableMap
          projection="geoNaturalEarth1"
          projectionConfig={{ scale: 140, center: [10, 10] }}
          style={{ width: "100%", height: "auto", background: "transparent" }}
          height={420}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={landFill}
                  stroke={landStroke}
                  strokeWidth={0.4}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: isDark ? "#243656" : "#c5d4ea" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {offices.map((office, idx) => (
            <Marker key={office.id} coordinates={office.coordinates}>
              <g
                className="cursor-pointer"
                onMouseEnter={() => setActive(office.id)}
                onMouseLeave={() => setActive((a) => (a === office.id ? null : a))}
                onClick={() => setActive((a) => (a === office.id ? null : office.id))}
              >
                <circle r={office.isHQ ? 12 : 10} fill={dotFill} fillOpacity={0.2}>
                  <animate
                    attributeName="r"
                    values={office.isHQ ? "8;16;8" : "6;12;6"}
                    dur="2.4s"
                    begin={`${idx * 0.3}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="fill-opacity"
                    values="0.25;0;0.25"
                    dur="2.4s"
                    begin={`${idx * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  r={office.isHQ ? 5 : 3.5}
                  fill={dotFill}
                  stroke={dotStroke}
                  strokeWidth={1.5}
                />
              </g>
            </Marker>
          ))}
        </ComposableMap>

        <AnimatePresence>
          {activeOffice && (
            <motion.div
              className="hidden md:block absolute top-4 right-4 z-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <OfficeTooltip office={activeOffice} onClose={() => setActive(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mobile tooltip */}
      <AnimatePresence>
        {activeOffice && (
          <motion.div
            className="md:hidden mt-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            <OfficeTooltip office={activeOffice} onClose={() => setActive(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile office cards */}
      <div className="grid sm:grid-cols-2 gap-4 mt-8 md:hidden">
        {offices.map((office) => (
          <button
            key={office.id}
            type="button"
            onClick={() => setActive(office.id)}
            className={`text-left p-4 rounded-xl border transition-shadow ${
              active === office.id
                ? "border-royal shadow-md bg-[var(--bg-card)]"
                : "border-[var(--border)] bg-[var(--bg-card)]"
            }`}
          >
            <p className="font-heading font-bold text-sm text-[var(--text-primary)]">
              {office.label}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{office.city}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
