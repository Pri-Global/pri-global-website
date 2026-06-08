import { useEffect } from "react";
import ROICalculator from "../components/sections/ROICalculator";
import { scrollToPageTop } from "../utils/scrollToPageTop";

export default function ROICalculatorPage() {
  useEffect(() => {
    scrollToPageTop();
  }, []);

  return (
    <div className="pt-24 sm:pt-28">
      <ROICalculator showPageHero />
    </div>
  );
}
