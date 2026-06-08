import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Button from "../components/ui/Button";
import { scrollToPageTop } from "../utils/scrollToPageTop";

const ROWS = [
  { feature: "Years in Business", pri: "28+ years", vendor: "< 5 years avg" },
  { feature: "Global Presence", pri: "USA, India, Philippines, Canada", vendor: "Single country" },
  { feature: "Talent Network", pri: "12,700+ placed professionals", vendor: "Limited database" },
  { feature: "AI Platform", pri: "PR1SM.AI (proprietary)", vendor: "None" },
  { feature: "Client Retention", pri: "96%", vendor: "Industry avg: 70%" },
  { feature: "Response Time", pri: "Shortlist in 5 days", vendor: "2–4 weeks" },
  { feature: "Service Breadth", pri: "8 integrated service lines", vendor: "1–2 specialties" },
  { feature: "Fortune 500 Experience", pri: true, vendor: false },
  { feature: "Dedicated Account Team", pri: true, vendor: false },
];

function CellValue({ value, positive }) {
  if (value === true) {
    return <Check size={20} className="text-emerald-500 mx-auto" />;
  }
  if (value === false) {
    return <X size={20} className="text-red-400/70 mx-auto" />;
  }
  return (
    <span className={positive ? "text-[var(--text-primary)] font-medium" : "text-[var(--text-muted)]"}>
      {value}
    </span>
  );
}

export default function WhyPRI() {
  useEffect(() => {
    scrollToPageTop();
  }, []);

  return (
    <>
      <section className="pt-28 pb-12 md:pt-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-royal/6 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4"
          >
            Why Leading Organizations Choose PRI Global
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[var(--text-secondary)]"
          >
            28 years of proven delivery. 12,700+ placements. 96% client retention.
            Here&apos;s what sets us apart.
          </motion.p>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)] shadow-lg">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="sticky top-20 z-10">
                <tr>
                  <th className="text-left p-4 bg-[var(--bg-secondary)] font-heading font-bold text-[var(--text-primary)]">
                    Feature
                  </th>
                  <th className="p-4 bg-royal/10 dark:bg-royaldark/15 font-heading font-bold text-royal dark:text-royaldark text-center">
                    PRI Global
                  </th>
                  <th className="p-4 bg-[var(--bg-secondary)] font-heading font-bold text-[var(--text-muted)] text-center">
                    Typical IT Vendor
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-[var(--bg-card)]" : "bg-[var(--bg-primary)]"}
                  >
                    <td className="p-4 font-medium text-[var(--text-primary)] border-t border-[var(--border-subtle)]">
                      {row.feature}
                    </td>
                    <td className="p-4 text-center border-t border-[var(--border-subtle)]">
                      <CellValue value={row.pri} positive />
                    </td>
                    <td className="p-4 text-center border-t border-[var(--border-subtle)]">
                      <CellValue value={row.vendor} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="pb-24 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6">
            Ready to experience the PRI Global difference?
          </h2>
          <Button to="/get-pricing" size="lg">
            Get Pricing →
          </Button>
        </div>
      </section>
    </>
  );
}
