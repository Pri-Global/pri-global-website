import { useEffect } from "react";
import SEO from "../components/SEO";
import ROICalculator from "../components/sections/ROICalculator";
import { scrollToPageTop } from "../utils/scrollToPageTop";

export default function ROICalculatorPage() {
  useEffect(() => {
    scrollToPageTop();
  }, []);

  return (
    <>
      <SEO
        title="PR1SM.AI ROI Calculator"
        description="Calculate your potential savings with PR1SM.AI. See how much fragmented data is costing your business and your estimated return on investment."
        url="/roi-calculator"
      />
      <div className="pt-24 sm:pt-28">
        <ROICalculator showPageHero />
      </div>
    </>
  );
}
