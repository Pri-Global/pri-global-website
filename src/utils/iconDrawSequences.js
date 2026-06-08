/**
 * Per-icon stroke draw order on hover (path indices = DOM order in Lucide SVG).
 * @typedef {{ order?: number[] | 'length-asc' | 'length-desc'; stagger?: number; twoPhase?: number[] }} IconSequence
 */

/** @type {Record<string, IconSequence>} */
export const ICON_DRAW_SEQUENCES = {
  /* Blitz: entlang des Pfads in zwei Phasen (Schaft → Spitze) */
  Zap: { twoPhase: [0.52, 1], stagger: 0.22 },

  /* WLAN: Punkt, dann Bögen von innen nach außen */
  Wifi: { order: "length-asc", stagger: 0.14 },

  Shield: { order: [0], stagger: 0 },
  Cloud: { order: [0], stagger: 0 },
  MessageSquare: { order: [0], stagger: 0 },

  /* Datenbank: Deckel → Seitenwand → Mittellinie */
  Database: { order: [0, 1, 2], stagger: 0.13 },

  /* Server: oben → LED → unten → LED */
  Server: { order: [0, 2, 1, 3], stagger: 0.12 },

  /* Personen: Kopf → Körper links → rechts außen → rechts innen */
  Users: { order: [3, 0, 2, 1], stagger: 0.11 },

  /* Trend: Linie → Pfeilspitze */
  TrendingUp: { order: [1, 0], stagger: 0.16 },

  /* Diagramm: Achse → Balken niedrig → hoch */
  ChartColumn: { order: [0, 3, 2, 1], stagger: 0.11 },
  BarChart3: { order: [0, 3, 2, 1], stagger: 0.11 },
  ChartNoAxesColumn: { order: [0, 1, 2], stagger: 0.12 },
  BarChart2: { order: [0, 1, 2], stagger: 0.12 },

  /* Ebenen: oben → unten */
  Layers: { order: [0, 1, 2], stagger: 0.14 },

  /* Gehirn: Kontur → Details → Knoten */
  BrainCircuit: { order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], stagger: 0.05 },

  /* Suche: Kreis → Griff */
  Search: { order: [1, 0], stagger: 0.15 },

  /* Koffer: Korpus → Griff */
  Briefcase: { order: [1, 0], stagger: 0.14 },

  Settings: { order: [0, 1], stagger: 0.18 },

  /* Uhr: Zifferblatt → Zeiger */
  Clock: { order: [0, 1], stagger: 0.16 },

  /* Dollar: Strich → S-Kurve */
  DollarSign: { order: [0, 1], stagger: 0.14 },

  /* Dokument: Blatt → Ecke → Textzeilen */
  FileText: { order: [0, 1, 2, 3, 4], stagger: 0.09 },
  Newspaper: { order: [2, 3, 0, 1], stagger: 0.1 },
  BookOpen: { order: [0, 1], stagger: 0.15 },

  /* Globus: Kreis → Meridian → Äquator */
  Globe: { order: [0, 1, 2], stagger: 0.13 },

  /* Link: Fenster → Pfeil */
  ExternalLink: { order: [2, 0, 1], stagger: 0.12 },
  Code2: { order: "length-asc", stagger: 0.1 },

  CheckCircle: { order: [1, 0], stagger: 0.14 },
  Award: { order: [0, 1], stagger: 0.14 },
  Handshake: { order: [0, 1, 2], stagger: 0.12 },
  Heart: { order: [0, 1], stagger: 0.14 },
  Home: { order: [0, 1], stagger: 0.14 },
  FolderOpen: { order: [0, 1], stagger: 0.13 },
  Building2: { order: [0, 1, 2], stagger: 0.11 },
  Trophy: { order: [0, 1, 2], stagger: 0.12 },
  Rocket: { order: [0, 1, 2], stagger: 0.12 },
  Cpu: { order: [0, 1, 2, 3], stagger: 0.1 },
  Star: { order: [0, 1], stagger: 0.14 },
  LogOut: { order: [0, 1], stagger: 0.14 },
  Mail: { order: [0, 1], stagger: 0.13 },
  Phone: { order: [0, 1], stagger: 0.14 },
  MapPin: { order: [0, 1], stagger: 0.14 },
  Newspaper: { order: [0, 1, 2, 3], stagger: 0.09 },
  Sparkles: { order: "length-asc", stagger: 0.08 },
  Calendar: { order: [0, 1, 2], stagger: 0.11 },
  MessageCircle: { order: [0, 1], stagger: 0.14 },
  Factory: { order: [0, 1, 2], stagger: 0.11 },
  HeartPulse: { order: [0, 1, 2], stagger: 0.1 },
  ShoppingBag: { order: [0, 1, 2], stagger: 0.11 },
  Store: { order: [0, 1, 2], stagger: 0.11 },
  Landmark: { order: [0, 1, 2, 3], stagger: 0.1 },
  GraduationCap: { order: [0, 1, 2], stagger: 0.11 },
  UtensilsCrossed: { order: [0, 1, 2], stagger: 0.11 },
  Plane: { order: [0, 1, 2], stagger: 0.11 },
  Pill: { order: [0, 1], stagger: 0.13 },
  CreditCard: { order: [0, 1], stagger: 0.12 },
  Lock: { order: [0, 1], stagger: 0.14 },
  ArrowRight: { order: [0, 1], stagger: 0.14 },
  Check: { order: [0, 1], stagger: 0.12 },
};

const DEFAULT_STAGGER = 0.1;
const PATH_DURATION = 0.42;

/**
 * @param {string} iconName
 * @param {SVGElement[]} elements
 * @returns {{ el: SVGElement; delay: number; duration: number }[] | { twoPhase: true; el: SVGElement; phases: number[]; stagger: number }}
 */
export function buildDrawPlan(iconName, elements) {
  const config = ICON_DRAW_SEQUENCES[iconName] ?? { order: "length-asc", stagger: DEFAULT_STAGGER };

  if (config.twoPhase && elements.length > 0) {
    return {
      twoPhase: true,
      el: elements[0],
      phases: config.twoPhase,
      stagger: config.stagger ?? 0.2,
    };
  }

  let ordered = elements;

  if (Array.isArray(config.order)) {
    ordered = config.order
      .map((i) => elements[i])
      .filter(Boolean);
  } else if (config.order === "length-asc") {
    ordered = [...elements].sort((a, b) => a.getTotalLength() - b.getTotalLength());
  } else if (config.order === "length-desc") {
    ordered = [...elements].sort((a, b) => b.getTotalLength() - a.getTotalLength());
  }

  const stagger = config.stagger ?? DEFAULT_STAGGER;

  return ordered.map((el, i) => ({
    el,
    delay: i * stagger,
    duration: PATH_DURATION,
  }));
}

export function getIconName(Icon) {
  return Icon?.displayName || Icon?.name || "";
}
