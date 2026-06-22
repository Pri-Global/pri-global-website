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
        description="Calculate your potential savings with PR1SM.AI. See how fragmented data costs your business and estimate your ROI. Try the free calculator now."
        keywords="PR1SM.AI ROI, AI savings calculator, data fragmentation cost, PRI Global ROI"
        url="/roi-calculator"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "PR1SM.AI", url: "/ai-innovation" },
          { name: "ROI Calculator", url: "/roi-calculator" },
        ]}
      />
      <div className="pt-24 sm:pt-28">
        <ROICalculator showPageHero />
      </div>
    </>
  );
}
