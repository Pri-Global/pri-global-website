import { useState } from "react";
import { ArrowLeft, ArrowRight, Users, Server, BrainCircuit, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../../components/SEO";
import BrandLogo from "../../components/ui/BrandLogo";
import Button from "../../components/ui/Button";
import AnimatedIcon from "../../components/ui/AnimatedIcon";
import { INDUSTRY_OPTIONS } from "../../data/portalDemoData";
import { inputClass, labelClass } from "../../components/portal/portalStyles";

const SERVICE_CARDS = [
  { id: "talent", title: "I need IT Talent", sub: "Find and hire specialized IT professionals", icon: Users },
  { id: "managed", title: "I need Managed IT Services", sub: "Outsource IT operations and infrastructure", icon: Server },
  { id: "prism", title: "I'm interested in PR1SM.AI", sub: "AI intelligence layer for my business data", icon: BrainCircuit },
  { id: "consulting", title: "I need IT Consulting", sub: "Strategic technology guidance", icon: Lightbulb },
];

const initial = {
  company: "", industry: "", size: "", website: "",
  firstName: "", lastName: "", jobTitle: "", email: "", phone: "", heard: "",
  interests: [], urgency: "exploring",
};

export default function CustomerRegister() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initial);
  const [done, setDone] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleInterest = (id) => setForm((f) => ({
    ...f,
    interests: f.interests.includes(id) ? f.interests.filter((x) => x !== id) : [...f.interests, id],
  }));

  const submit = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Company: ${form.company}\nIndustry: ${form.industry}\nContact: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nInterests: ${form.interests.join(", ")}\nUrgency: ${form.urgency}`
    );
    window.location.href = `mailto:liezl.moss@PR1SM.AI?subject=${encodeURIComponent("Client Portal Access Request")}&body=${body}`;
    setDone(true);
  };

  if (done) {
    return (
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md text-center">
          <h1 className="font-heading text-2xl font-bold mb-3">Thank you!</h1>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Your account is pending approval. Liezl Moss from our team will reach out within 24 business hours to activate your access.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <>
      <SEO title="Client Registration" description="Request access to the PRI Global client portal." url="/customer-register" noindex />
      <section className="min-h-[calc(100vh-4rem)] py-24 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8"><BrandLogo size="lg" className="mx-auto mb-4" /><h1 className="font-heading text-2xl font-bold">Request Client Access</h1></div>
          <div className="h-1.5 bg-[var(--border)] rounded-full mb-8"><motion.div className="h-full bg-royal rounded-full" animate={{ width: `${(step / 3) * 100}%` }} /></div>

          <form onSubmit={step === 3 ? submit : (e) => e.preventDefault()} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-4">
                  <div><label className={labelClass}>Company Name *</label><input required value={form.company} onChange={(e) => update("company", e.target.value)} className={inputClass} /></div>
                  <div><label className={labelClass}>Industry</label>
                    <select value={form.industry} onChange={(e) => update("industry", e.target.value)} className={inputClass}>
                      <option value="">Select</option>
                      {INDUSTRY_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div><label className={labelClass}>Company Size</label>
                    <select value={form.size} onChange={(e) => update("size", e.target.value)} className={inputClass}>
                      {["< 50", "50-250", "250-1000", "1000+"].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div><label className={labelClass}>Website URL</label><input type="url" value={form.website} onChange={(e) => update("website", e.target.value)} className={inputClass} /></div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className={labelClass}>First Name *</label><input required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputClass} /></div>
                    <div><label className={labelClass}>Last Name *</label><input required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className={inputClass} /></div>
                  </div>
                  <div><label className={labelClass}>Job Title *</label><input required value={form.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} className={inputClass} /></div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className={labelClass}>Email *</label><input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} /></div>
                    <div><label className={labelClass}>Phone *</label><input required value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} /></div>
                  </div>
                  <div><label className={labelClass}>How did you hear about PRI?</label>
                    <select value={form.heard} onChange={(e) => update("heard", e.target.value)} className={inputClass}>
                      {["Referral", "Google", "LinkedIn", "Event", "Existing relationship", "Other"].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-4">
                  <h3 className="font-heading font-bold">What brings you to PRI Global?</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {SERVICE_CARDS.map((card) => (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => toggleInterest(card.id)}
                        className={`group text-left p-4 rounded-xl border transition-colors ${form.interests.includes(card.id) ? "border-royal bg-royal/5" : "border-[var(--border)] hover:border-royal/30"}`}
                      >
                        <AnimatedIcon Icon={card.icon} size={22} className="text-royal mb-2" />
                        <p className="font-semibold text-sm text-[var(--text-primary)]">{card.title}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-1">{card.sub}</p>
                      </button>
                    ))}
                  </div>
                  <fieldset>
                    <legend className={labelClass}>Urgency</legend>
                    {[
                      ["immediate", "Immediately (within 30 days)"],
                      ["3months", "Within 3 months"],
                      ["quarter", "Planning for next quarter"],
                      ["exploring", "Just exploring"],
                    ].map(([v, l]) => (
                      <label key={v} className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
                        <input type="radio" name="urgency" checked={form.urgency === v} onChange={() => update("urgency", v)} className="accent-royal" /> {l}
                      </label>
                    ))}
                  </fieldset>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex justify-between mt-8 pt-4 border-t border-[var(--border)]">
              {step > 1 ? <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]"><ArrowLeft size={16} /> Back</button> : <span />}
              {step < 3 ? <Button type="button" onClick={() => setStep(step + 1)}>Next <ArrowRight size={16} /></Button> : <Button type="submit">Request Access →</Button>}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
