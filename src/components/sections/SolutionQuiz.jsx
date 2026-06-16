import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Server, Database, BrainCircuit, Zap, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedIcon from "../ui/AnimatedIcon";
import { BOOKING_URL } from "../../constants/links";

const STORAGE_KEY = "pri-quiz-result";

const questions = [
  {
    id: 1,
    text: "What best describes your organization?",
    options: [
      { id: "A", label: "We need to hire specialized IT talent fast", icon: Users },
      { id: "B", label: "We need to manage and modernize our IT infrastructure", icon: Server },
      { id: "C", label: "We're struggling to get insights from our data", icon: Database },
      { id: "D", label: "We need to transform our business with AI", icon: BrainCircuit },
    ],
  },
  {
    id: 2,
    text: "How large is your organization?",
    options: [
      { id: "A", label: "1–50 employees" },
      { id: "B", label: "51–250 employees" },
      { id: "C", label: "251–1000 employees" },
      { id: "D", label: "1000+ employees" },
    ],
  },
  {
    id: 3,
    text: "What's your biggest challenge right now?",
    options: [
      { id: "A", label: "Finding and retaining qualified tech talent" },
      { id: "B", label: "Keeping systems running reliably and securely" },
      { id: "C", label: "Too much time spent on manual reporting" },
      { id: "D", label: "Disconnected systems that don't share data" },
      { id: "E", label: "Keeping up with AI and digital transformation" },
    ],
  },
  {
    id: 4,
    text: "What's your timeline?",
    options: [
      { id: "A", label: "Urgent — I need help within 30 days" },
      { id: "B", label: "Planning — within 3 months" },
      { id: "C", label: "Strategic — 6–12 month initiative" },
      { id: "D", label: "Exploring — just researching options" },
    ],
  },
];

/** Score all four answers — highest wins; ties favor Q1 intent. */
function getRecommendation(answers) {
  if (answers.length < questions.length) return "overview";

  const [q1, q2, q3, q4] = answers;
  const scores = { staffing: 0, managed: 0, prism: 0, pods: 0, overview: 0 };

  const add = (key, pts) => {
    scores[key] += pts;
  };

  // Q1 — primary intent
  if (q1 === "A") add("staffing", 4);
  if (q1 === "B") add("managed", 4);
  if (q1 === "C") add("prism", 4);
  if (q1 === "D") {
    add("pods", 3);
    add("prism", 2);
  }

  // Q2 — org size
  if (q2 === "A") {
    add("staffing", 1);
    add("pods", 1);
  }
  if (q2 === "B") add("staffing", 1);
  if (q2 === "C") {
    add("managed", 1);
    add("prism", 1);
  }
  if (q2 === "D") {
    add("managed", 2);
    add("prism", 1);
  }

  // Q3 — pain point
  if (q3 === "A") add("staffing", 4);
  if (q3 === "B") add("managed", 4);
  if (q3 === "C") add("prism", 4);
  if (q3 === "D") {
    add("prism", 3);
    add("managed", 1);
  }
  if (q3 === "E") {
    add("pods", 3);
    add("prism", 2);
  }

  // Q4 — timeline
  if (q4 === "A") {
    add("staffing", 2);
    add("pods", 2);
  }
  if (q4 === "B") add("overview", 1);
  if (q4 === "C") {
    add("managed", 1);
    add("prism", 1);
  }
  if (q4 === "D") add("overview", 2);

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top = ranked[0][1];
  const winners = ranked.filter(([, v]) => v === top).map(([k]) => k);

  if (winners.length === 1) return winners[0];

  // Tie-break using Q1
  const q1Map = { A: "staffing", B: "managed", C: "prism", D: "pods" };
  const q1Pick = q1Map[q1];
  if (q1Pick && winners.includes(q1Pick)) return q1Pick;

  return winners[0] ?? "overview";
}

const results = {
  prism: {
    badge: "Your match",
    icon: Zap,
    headline: "PR1SM.AI — Your Intelligence Layer",
    description:
      "Your answers point to fragmented data and slow reporting. PR1SM.AI sits on top of your existing systems so teams can ask questions in plain English and get governed answers in seconds.",
    primary: { label: "Explore PR1SM.AI", href: "/ai-innovation", external: false },
    secondary: { label: "Book a strategy call", href: BOOKING_URL, external: true },
  },
  pods: {
    badge: "Your match",
    icon: BrainCircuit,
    headline: "PRI AI Pods™ — Ready-Built AI Teams",
    description:
      "You need to move on AI fast without a long hiring cycle. PRI AI Pods™ deploy Flex, Scale, or Dedicated delivery teams in weeks — from POCs to enterprise programs.",
    primary: { label: "Explore PRI AI Pods™", href: "/ai-services", external: false },
    secondary: { label: "Get pricing", href: "/get-pricing", external: false },
  },
  staffing: {
    badge: "Your match",
    icon: Users,
    headline: "IT Staffing & Talent Solutions",
    description:
      "You need the right people, fast. PRI Global has placed 12,700+ IT professionals across every discipline — typically a curated shortlist within 5 business days.",
    primary: { label: "Start hiring", href: "/talent-solutions", external: false },
    secondary: { label: "Talk to an expert", href: "/get-pricing", external: false },
  },
  managed: {
    badge: "Your match",
    icon: Server,
    headline: "Managed IT & Infrastructure",
    description:
      "Reliable operations and resilient systems are your priority. Our managed services team keeps infrastructure secure, optimized, and always on — with 24/7 support.",
    primary: { label: "Explore services", href: "/services", external: false },
    secondary: { label: "Get a free assessment", href: "/get-pricing", external: false },
  },
  overview: {
    badge: "Your match",
    icon: BrainCircuit,
    headline: "Full-Service Technology Partner",
    description:
      "Your needs span multiple areas. PRI Global offers nine integrated lines — staffing, managed IT, cloud, cybersecurity, data, PRI AI Pods™, and PR1SM.AI.",
    primary: { label: "Explore all services", href: "/services", external: false },
    secondary: { label: "Talk to an expert", href: "/get-pricing", external: false },
  },
};

const RESULT_KEYS = new Set(Object.keys(results));

function loadSavedResult() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { recommendation } = JSON.parse(raw);
    if (!recommendation || !RESULT_KEYS.has(recommendation)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return recommendation;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function persistResult(recommendation) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ recommendation, date: new Date().toISOString() })
    );
  } catch {
    /* private mode */
  }
}

function ResultCta({ cta, variant = "primary" }) {
  const base =
    variant === "primary"
      ? "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-royal text-white font-semibold text-sm hover:bg-[var(--accent-hover)] transition-colors"
      : "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--text-primary)] font-medium text-sm hover:border-royal/40 transition-colors";

  if (cta.external) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={base}>
        {cta.label}
      </a>
    );
  }
  return (
    <Link to={cta.href} className={base}>
      {cta.label}
    </Link>
  );
}

export default function SolutionQuiz({ standalone = false }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!standalone) return;
    const saved = loadSavedResult();
    if (saved) {
      setResult(saved);
      setStep(questions.length);
    }
  }, [standalone]);

  const validResult = result && RESULT_KEYS.has(result) ? result : null;
  const progress = validResult
    ? 100
    : ((Math.min(step, questions.length - 1) + 1) / questions.length) * 100;
  const activeStep = Math.min(step, questions.length - 1);
  const q = questions[activeStep];
  const showQuestions = !validResult && step < questions.length;

  const selectAnswer = (optionId) => {
    setDirection(1);
    const nextAnswers = [...answers, optionId];
    const nextStep = step + 1;

    setAnswers(nextAnswers);

    if (nextStep >= questions.length) {
      const rec = getRecommendation(nextAnswers);
      if (RESULT_KEYS.has(rec)) {
        setResult(rec);
        persistResult(rec);
        setStep(questions.length);
      }
    } else {
      setStep(nextStep);
    }
  };

  const goBack = () => {
    if (step <= 0 || validResult) return;
    setDirection(-1);
    setAnswers((prev) => prev.slice(0, -1));
    setStep((s) => Math.max(0, s - 1));
  };

  const restart = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setAnswers([]);
    setResult(null);
    setStep(0);
    setDirection(-1);
  };

  const rec = validResult ? results[validResult] : null;
  const RecIcon = rec?.icon;
  const optionGridClass =
    q?.options.length >= 5 ? "flex flex-col gap-3" : "grid sm:grid-cols-2 gap-3";

  return (
    <section
      id="solution-quiz"
      className={`${standalone ? "pt-28 pb-20" : "py-20 md:py-28"} bg-[var(--bg-secondary)]`}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block text-xs font-semibold text-royal uppercase tracking-widest mb-3">
            Find Your Fit
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
            Which PRI Global Solution Is Right for You?
          </h2>
          <p className="text-[var(--text-secondary)]">
            Answer 4 quick questions and we&apos;ll point you in the right direction.
          </p>
        </motion.div>

        <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden mb-8">
          <motion.div
            className="h-full bg-royal dark:bg-royaldark rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          {showQuestions && q ? (
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[var(--text-muted)]">
                  Question {activeStep + 1} of {questions.length}
                </p>
                {step > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-royal transition-colors"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                )}
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-6">
                {q.text}
              </h3>
              <div className={optionGridClass}>
                {q.options.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => selectAnswer(opt.id)}
                      className="group text-left w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 hover:border-royal dark:hover:border-royaldark hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      {Icon && (
                        <div className="w-10 h-10 rounded-lg bg-royal/10 dark:bg-royaldark/15 flex items-center justify-center mb-3">
                          <AnimatedIcon Icon={Icon} size={20} className="text-royal dark:text-royaldark" />
                        </div>
                      )}
                      <span className="font-medium text-[var(--text-primary)] text-sm leading-snug">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : rec ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 text-center"
            >
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-royal dark:text-royaldark mb-4">
                {rec.badge}
              </span>
              {RecIcon && (
                <div className="w-14 h-14 rounded-2xl bg-royal/10 dark:bg-royaldark/15 flex items-center justify-center mx-auto mb-4">
                  <AnimatedIcon Icon={RecIcon} size={28} className="text-royal dark:text-royaldark" />
                </div>
              )}
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
                {rec.headline}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg mx-auto">
                {rec.description}
              </p>
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                <ResultCta cta={rec.primary} variant="primary" />
                <ResultCta cta={rec.secondary} variant="secondary" />
              </div>
              <button
                type="button"
                onClick={restart}
                className="text-sm text-[var(--text-muted)] hover:text-royal dark:hover:text-royaldark transition-colors"
              >
                Not what you expected? Retake quiz
              </button>

              <div className="mt-10 pt-8 border-t border-[var(--border)] grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-left">
                {Object.entries(results).map(([key, r]) => (
                  <div
                    key={key}
                    className={`p-4 rounded-xl border text-sm ${
                      key === validResult
                        ? "border-royal dark:border-royaldark bg-royal/5 dark:bg-royaldark/10"
                        : "border-[var(--border-subtle)]"
                    }`}
                  >
                    <p className="font-heading font-bold text-[var(--text-primary)] mb-1 text-xs leading-snug">
                      {r.headline.split("—")[0].trim()}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-3">{r.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
