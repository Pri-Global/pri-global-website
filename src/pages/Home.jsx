import { lazy, Suspense, useEffect } from "react";
import SEO from "../components/SEO";
import Hero from "../components/sections/Hero";
import ClientLogos from "../components/ui/ClientLogos";
import NewsScrollHint from "../components/ui/NewsScrollHint";
import { scrollToPageTop } from "../utils/scrollToPageTop";

const Stats           = lazy(() => import("../components/sections/Stats"));
import SolutionQuiz from "../components/sections/SolutionQuiz";
const ServicesSection = lazy(() => import("../components/sections/Services"));
const DoingBusinessVideo = lazy(() => import("../components/sections/DoingBusinessVideo"));
const PrismAI         = lazy(() => import("../components/sections/PrismAI"));
const PrismDemo       = lazy(() => import("../components/sections/PrismDemo"));
const ROICalculator   = lazy(() => import("../components/sections/ROICalculator"));
const CaseStudies     = lazy(() => import("../components/sections/CaseStudies"));
const Timeline        = lazy(() => import("../components/sections/Timeline"));
const HowWeWork       = lazy(() => import("../components/sections/HowWeWork"));
const Testimonials    = lazy(() => import("../components/sections/Testimonials"));
const NewsPreview     = lazy(() => import("../components/sections/NewsPreview"));
const CallToAction    = lazy(() => import("../components/sections/CallToAction"));

const SectionFallback = <div className="h-96" />;

export default function Home() {
  useEffect(() => {
    scrollToPageTop();
  }, []);

  return (
    <>
      <SEO
        title="Technology That Moves Business Forward"
        description="PRI Global delivers IT staffing, managed services, cybersecurity, cloud transformation, and AI solutions. 28+ years, 12,700+ placements, 96% client retention."
        url="/"
      />
      <Hero />
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]">
        <ClientLogos label="Trusted by leading organizations" />
      </div>
      <Suspense fallback={SectionFallback}><Stats /></Suspense>
      <SolutionQuiz />
      <Suspense fallback={SectionFallback}><ServicesSection /></Suspense>
      <Suspense fallback={SectionFallback}><DoingBusinessVideo /></Suspense>
      <Suspense fallback={SectionFallback}><PrismAI /></Suspense>
      <Suspense fallback={SectionFallback}><PrismDemo compact /></Suspense>
      <Suspense fallback={SectionFallback}><ROICalculator /></Suspense>
      <Suspense fallback={SectionFallback}><CaseStudies limit={3} /></Suspense>
      <Suspense fallback={SectionFallback}><Timeline condensed /></Suspense>
      <Suspense fallback={SectionFallback}><NewsPreview /></Suspense>
      <Suspense fallback={SectionFallback}><Testimonials /></Suspense>
      <Suspense fallback={SectionFallback}><HowWeWork /></Suspense>
      <Suspense fallback={SectionFallback}><CallToAction /></Suspense>
      <NewsScrollHint />
    </>
  );
}
