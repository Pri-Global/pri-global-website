import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Server,
  Database,
  BrainCircuit,
  Check,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedIcon from "../ui/AnimatedIcon";

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
      { id: "C", label: "Strategic — 6-12 month initiative" },
      { id: "D", label: "Exploring — just researching options" },
    ],
  },
];

function getRecommendation(answers) {
  const q1 = answers[0];
  const q3 = answers[2];

  if (q1 === "C" || q1 === "D" || q3 === "C" || q3 === "D" || q3 === "E") return "prism";
  if (q1 === "A" || q3 === "A") return "staffing";
  if (q1 === "B" || q3 === "B") return "managed";
  return "overview";
}

const results = {
  prism: {
    badge: "YOUR MATCH",
    icon: Zap,
    headline: "PR1SM.AI — Your AI Intelligence Layer",
    description:
      "Based on your answers, your biggest opportunity is eliminating fragmented data and manual reporting. PR1SM.AI connects all your systems and gives you instant answers in plain English.",
    primary: { label: "See PR1SM.AI in Action →", href: "https://www.pr1sm.ai", external: true },
    secondary: {
      label: "Talk to Liezl Moss →",
      href: "mailto:liezl.moss@pr1sm.ai",
      external: true,
    },
  },
  staffing: {
    badge: "YOUR MATCH",
    icon: Users,
    headline: "IT Staffing & Talent Solutions",
    description:
      "You need the right people, fast. PRI Global has placed 12,700+ IT professionals across every technology discipline. We source, vet, and deliver — typically within 5 business days.",
    primary: { label: "Start Hiring →", href: "/talent-solutions", external: false },
    secondary: { label: "Talk to Our Team →", href: "mailto:ajay@pr1sm.ai", external: true },
  },
  managed: {
    badge: "YOUR MATCH",
    icon: Server,
    headline: "Managed IT & Infrastructure",
    description:
      "Reliable operations and resilient systems — that's what we deliver. PRI Global's managed services team keeps your infrastructure secure, optimized, and always on.",
    primary: { label: "Explore Managed Services →", href: "/services", external: false },
    secondary: {
      label: "Get a Free Assessment →",
      href: "mailto:ajay@pr1sm.ai",
      external: true,
    },
  },
  overview: {
    badge: "YOUR MATCH",
    icon: BrainCircuit,
    headline: "Full-Service Technology Partner",
    description:
      "Your needs span multiple areas. PRI Global offers eight integrated service lines — from talent and managed IT to AI innovation with PR1SM.AI.",
    primary: { label: "Explore Services →", href: "/services", external: false },
    secondary: { label: "Talk to Our Team →", href: "mailto:ajay@pr1sm.ai", external: true },
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
    /* private mode / quota — quiz still works without storage */
  }
}

export default function SolutionQuiz({ standalone = false }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [direction, setDirection] = useState(1);

  /* Homepage: always start fresh. /quiz page may restore last result. */
  useEffect(() => {
    if (!standalone) return;
    const saved = loadSavedResult();
    if (saved) {
      setResult(saved);
      setStep(questions.length);
    }
  }, [standalone]);

  const validResult = result && RESULT_KEYS.has(result) ? result : null;
  const progress = validResult ? 100 : ((Math.min(step, questions.length - 1) + 1) / questions.length) * 100;
  const activeStep = Math.min(step, questions.length - 1);
  const q = questions[activeStep];
  const showQuestions = !validResult && step < questions.length;

  const selectAnswer = (optionId) => {
    const next = [...answers, optionId];
    setAnswers(next);
    setDirection(1);

    if (step + 1 >= questions.length) {
      const rec = getRecommendation(next);
      if (!RESULT_KEYS.has(rec)) return;
      setResult(rec);
      persistResult(rec);
      setStep(questions.length);
    } else {
      setStep(step + 1);
    }
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
            Answer 4 quick questions and we'll point you in the right direction.
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
              <p className="text-sm text-[var(--text-muted)] mb-2">
                Question {activeStep + 1} of {questions.length}
              </p>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-6">
                {q.text}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {q.options.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => selectAnswer(opt.id)}
                      className="group text-left bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 hover:border-royal hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      {Icon && (
                        <div className="w-10 h-10 rounded-lg bg-royal/10 flex items-center justify-center mb-3">
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
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="group bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 text-center"
            >
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-royal mb-4">
                {rec.badge}
              </span>
              {RecIcon && (
                <div className="w-14 h-14 rounded-2xl bg-royal/10 flex items-center justify-center mx-auto mb-4">
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
                {rec.primary.external ? (
                  <a
                    href={rec.primary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-royal text-white font-semibold text-sm"
                  >
                    {rec.primary.label}
                  </a>
                ) : (
                  <Link
                    to={rec.primary.href}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-royal text-white font-semibold text-sm"
                  >
                    {rec.primary.label}
                  </Link>
                )}
                <a
                  href={rec.secondary.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--text-primary)] font-medium text-sm"
                >
                  {rec.secondary.label}
                </a>
              </div>
              <button
                type="button"
                onClick={restart}
                className="text-sm text-[var(--text-muted)] hover:text-royal transition-colors"
              >
                Not what you expected? Retake quiz
              </button>

              <div className="mt-10 pt-8 border-t border-[var(--border)] grid sm:grid-cols-3 gap-4 text-left">
                {Object.entries(results).map(([key, r]) => (
                  <div
                    key={key}
                    className={`p-4 rounded-xl border text-sm ${
                      key === validResult ? "border-royal bg-royal/5" : "border-[var(--border-subtle)]"
                    }`}
                  >
                    <p className="font-heading font-bold text-[var(--text-primary)] mb-1">
                      {r.headline.split("—")[0].trim()}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-2">{r.description}</p>
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
