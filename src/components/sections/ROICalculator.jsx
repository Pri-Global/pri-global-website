import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import LiveCounter from "../ui/LiveCounter";

const HOURLY_RATE = 75;
const PRISM_ANNUAL_COST = 24000;

function calcROI(employees, hoursPerWeek, systems) {
  const weeklyHours = employees * hoursPerWeek;
  const annualHours = weeklyHours * 50;
  const annualCost = annualHours * HOURLY_RATE;
  const prismSavings = annualCost * 0.75;
  const timeSaved = annualHours * 0.75;
  const roiMultiple = prismSavings / PRISM_ANNUAL_COST;
  return {
    annualCost,
    prismSavings,
    timeSaved,
    roiMultiple,
    systems,
  };
}

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
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-royaldark"
      />
    </div>
  );
}

export default function ROICalculator() {
  const [employees, setEmployees] = useState(50);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [systems, setSystems] = useState(5);
  const [pulse, setPulse] = useState(0);

  const results = useMemo(
    () => calcROI(employees, hoursPerWeek, systems),
    [employees, hoursPerWeek, systems]
  );

  const bumpPulse = () => setPulse((p) => p + 1);

  const mailBody = encodeURIComponent(
    `I'm interested in a custom ROI analysis for PR1SM.AI.\nMy company has ${employees} employees and ${systems} disconnected systems.`
  );

  return (
    <section className="py-20 md:py-28 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-0 w-96 h-96 bg-royaldark/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8"
          >
            <SliderField
              label="Number of Employees Who Need Data Access"
              value={employees}
              min={10}
              max={500}
              step={10}
              display={employees}
              onChange={(v) => { setEmployees(v); bumpPulse(); }}
            />
            <SliderField
              label="Hours Per Week Spent on Manual Reporting"
              value={hoursPerWeek}
              min={1}
              max={40}
              step={1}
              display={`${hoursPerWeek} hrs`}
              onChange={(v) => { setHoursPerWeek(v); bumpPulse(); }}
            />
            <SliderField
              label="Number of Disconnected Systems"
              value={systems}
              min={2}
              max={20}
              step={1}
              display={systems}
              onChange={(v) => { setSystems(v); bumpPulse(); }}
            />
          </motion.div>

          <motion.div
            key={pulse}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 0.35 }}
            className="bg-[#0D1B3E] dark:bg-[#16181e] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">
                  Annual Cost of Fragmented Data
                </p>
                <p className="font-heading text-3xl md:text-4xl font-bold text-red-400">
                  $<LiveCounter value={results.annualCost} />
                </p>
                <p className="text-xs text-white/40 mt-1">hours × employees × $75/hr</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">
                  Estimated Annual Savings with PR1SM.AI
                </p>
                <p className="font-heading text-3xl md:text-4xl font-bold text-[#22c55e]">
                  $<LiveCounter value={results.prismSavings} />
                </p>
                <p className="text-xs text-white/40 mt-1">75% reduction in manual reporting</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">
                  Hours Saved Per Year
                </p>
                <p className="font-heading text-3xl md:text-4xl font-bold text-white">
                  <LiveCounter value={results.timeSaved} suffix=" hours" />
                </p>
                <p className="text-xs text-white/40 mt-1">time redirected to strategic work</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">
                  Estimated ROI
                </p>
                <p className="font-heading text-3xl md:text-4xl font-bold text-royaldark">
                  <LiveCounter value={results.roiMultiple} decimals={1} suffix="×" /> return
                </p>
                <p className="text-xs text-white/40 mt-1">based on typical PR1SM.AI investment</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-white/70 mb-4">Ready to stop digging and start asking?</p>
              <a
                href={`mailto:ajay@pr1sm.ai?subject=${encodeURIComponent("ROI Analysis Request")}&body=${mailBody}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-royaldark text-white font-semibold text-sm hover:bg-royaldark/80 transition-colors"
              >
                Get Your Custom ROI Analysis →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
