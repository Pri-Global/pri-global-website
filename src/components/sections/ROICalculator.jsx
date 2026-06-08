import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import LiveCounter from "../ui/LiveCounter";
import { calcROI } from "../../utils/roiCalc";

function SliderField({ label, value, min, max, step, onChange, display }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-baseline gap-4">
        <label className="text-sm font-medium text-white/80 leading-snug">{label}</label>
        <span className="text-lg font-heading font-bold text-royaldark tabular-nums shrink-0">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-slider w-full"
      />
    </div>
  );
}

function StatBar({ results }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-10">
      {[
        {
          value: results.weeklyHoursSaved,
          suffix: " hrs/week",
          label: "Time Saved",
        },
        {
          value: results.prismSavings,
          prefix: "$",
          suffix: "/yr",
          label: "Cost Eliminated",
          format: "currency",
        },
        {
          value: Math.round(results.roiMultiple),
          suffix: "× ROI",
          label: "Return",
        },
      ].map((stat) => (
        <div
          key={stat.label}
          className="text-center p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <p className="font-heading text-2xl md:text-3xl font-bold text-white tabular-nums">
            {stat.prefix}
            {stat.format === "currency" ? (
              <LiveCounter value={stat.value} />
            ) : (
              stat.value
            )}
            {stat.suffix}
          </p>
          <p className="text-xs uppercase tracking-widest text-white/50 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

function LeadCapture({ employees, systems }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`ROI Analysis Request — ${company || "PRI Global"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nEmployees: ${employees}\nDisconnected systems: ${systems}\n\nPlease send me a personalized PR1SM.AI ROI analysis.`
    );
    window.location.href = `mailto:liezl.moss@PR1SM.AI?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 pt-8 border-t border-white/10 space-y-4">
      <p className="text-white/80 font-medium text-center">
        Want a personalized ROI analysis from our team?
      </p>
      <div className="grid sm:grid-cols-3 gap-3">
        <input
          type="text"
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-royaldark"
        />
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-royaldark"
        />
        <input
          type="text"
          required
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-royaldark"
        />
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3 rounded-xl bg-royaldark text-white font-semibold text-sm hover:bg-royaldark/80 transition-colors"
      >
        Send Me My Analysis
      </button>
    </form>
  );
}

export default function ROICalculator({ showPageHero = false }) {
  const [employees, setEmployees] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [systems, setSystems] = useState(6);
  const [existingToolSpend, setExistingToolSpend] = useState(50000);
  const [pulse, setPulse] = useState(0);

  const results = useMemo(
    () => calcROI(employees, hoursPerWeek, systems, existingToolSpend),
    [employees, hoursPerWeek, systems, existingToolSpend]
  );

  const bumpPulse = () => setPulse((p) => p + 1);

  const metrics = [
    {
      label: "Annual Cost of Current State",
      value: results.totalAnnualCost,
      prefix: "$",
      color: "text-red-400",
      note: "What fragmented data is costing you today",
    },
    {
      label: "Estimated Savings with PR1SM.AI",
      value: results.prismSavings,
      prefix: "$",
      color: "text-[#22c55e]",
      note: "75% reduction in reporting time + tool consolidation",
    },
    {
      label: "Hours Saved Per Year",
      value: results.hoursSaved,
      suffix: " hours",
      color: "text-sky-400",
      note: "Redirected to strategic work",
    },
    {
      label: "Tool Consolidation Savings",
      value: results.toolConsolidationSavings,
      prefix: "$",
      color: "text-purple-400",
      note: "By replacing redundant BI tools",
    },
    {
      label: "Estimated ROI",
      value: results.roiMultiple,
      decimals: 0,
      suffix: "× return",
      color: "text-amber-400",
      note: "Based on typical PR1SM.AI investment",
    },
  ];

  return (
    <section className={`${showPageHero ? "" : "py-20 md:py-28"} bg-navy relative overflow-hidden`}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-0 w-96 h-96 bg-royaldark/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {showPageHero && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center max-w-3xl mx-auto mb-12 pt-8"
          >
            <span className="inline-block text-xs font-semibold text-royaldark uppercase tracking-widest mb-3">
              PR1SM.AI ROI Calculator
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              See Your Return Before You Commit
            </h1>
            <p className="text-white/60 text-lg">
              Based on real customer data, businesses using PR1SM.AI report faster decisions,
              lower costs, and more time for strategic work. See what it means for your business.
            </p>
          </motion.div>
        )}

        {!showPageHero && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="inline-block text-xs font-semibold text-royaldark uppercase tracking-widest mb-3">
              ROI Calculator
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
              How Much Is Fragmented Data Costing You?
            </h2>
            <p className="text-white/60">
              Adjust the sliders to see your potential savings with PR1SM.AI
            </p>
          </motion.div>
        )}

        <StatBar results={results} />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8"
          >
            <SliderField
              label="Employees who access data/reports"
              value={employees}
              min={5}
              max={500}
              step={5}
              display={employees}
              onChange={(v) => { setEmployees(v); bumpPulse(); }}
            />
            <SliderField
              label="Hours per week on manual reporting"
              value={hoursPerWeek}
              min={1}
              max={40}
              step={1}
              display={`${hoursPerWeek} hrs`}
              onChange={(v) => { setHoursPerWeek(v); bumpPulse(); }}
            />
            <SliderField
              label="Number of disconnected systems"
              value={systems}
              min={2}
              max={20}
              step={1}
              display={systems}
              onChange={(v) => { setSystems(v); bumpPulse(); }}
            />
            <SliderField
              label="Annual spend on BI/analytics tools"
              value={existingToolSpend}
              min={0}
              max={500000}
              step={5000}
              display={`$${(existingToolSpend / 1000).toFixed(0)}K`}
              onChange={(v) => { setExistingToolSpend(v); bumpPulse(); }}
            />
          </motion.div>

          <motion.div
            key={pulse}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 0.35 }}
            className="bg-[#0D1B3E] dark:bg-[#16181e] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            <div className="space-y-6">
              {metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">{m.label}</p>
                  <p className={`font-heading text-2xl md:text-3xl font-bold tabular-nums ${m.color}`}>
                    {m.prefix}
                    <LiveCounter value={m.value} decimals={m.decimals ?? 0} />
                    {m.suffix}
                  </p>
                  <p className="text-xs text-white/40 mt-1">{m.note}</p>
                </div>
              ))}
            </div>
            <LeadCapture employees={employees} systems={systems} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
