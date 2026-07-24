import { lazy, Suspense, useEffect } from "react";
import SEO from "../components/SEO";
import Hero from "../components/sections/Hero";
import ClientLogos from "../components/ui/ClientLogos";
import FreeConsultationBanner from "../components/sections/FreeConsultationBanner";
import CorePillars from "../components/sections/CorePillars";
import IndustriesPreview from "../components/sections/IndustriesPreview";
import { scrollToPageTop } from "../utils/scrollToPageTop";

const Stats              = lazy(() => import("../components/sections/Stats"));
import SolutionQuiz from "../components/sections/SolutionQuiz";
const NewsPreview        = lazy(() => import("../components/sections/NewsPreview"));
const ServicesSection    = lazy(() => import("../components/sections/Services"));
const DoingBusinessVideo = lazy(() => import("../components/sections/DoingBusinessVideo"));
const PrismAI            = lazy(() => import("../components/sections/PrismAI"));
import ExploreMore from "../components/sections/ExploreMore";
import LeadershipSpotlight from "../components/sections/LeadershipSpotlight";
const HowWeWork          = lazy(() => import("../components/sections/HowWeWork"));
const Testimonials       = lazy(() => import("../components/sections/Testimonials"));
const CallToAction       = lazy(() => import("../components/sections/CallToAction"));

const SectionFallback = (
  <div className="h-96 animate-pulse rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]" aria-busy="true" aria-label="Loading section" />
);

export default function Home() {
  useEffect(() => {
    scrollToPageTop();
  }, []);

  return (
    <>
      <SEO
        title="IT Staffing & AI Solutions"
        description="PRI Global delivers IT staffing, managed services, and PR1SM.AI. 28+ years of trusted partnerships and 12,700+ placements. Request a consultation today."
        keywords="IT staffing, talent solutions, PR1SM.AI, managed IT services, technology consulting, PRI Global"
        url="/"
        includeWebSite
      />
      <Hero />
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]">
        <ClientLogos label="Trusted by leading organizations" />
      </div>
      <Suspense fallback={SectionFallback}><Stats /></Suspense>
      <FreeConsultationBanner />
      <CorePillars />
      <SolutionQuiz />
      <Suspense fallback={SectionFallback}><ServicesSection /></Suspense>
      <IndustriesPreview />
      <Suspense fallback={SectionFallback}><DoingBusinessVideo /></Suspense>
      <Suspense fallback={SectionFallback}><PrismAI /></Suspense>
      <Suspense fallback={SectionFallback}><NewsPreview /></Suspense>
      <ExploreMore />
      <LeadershipSpotlight />
      <Suspense fallback={SectionFallback}><Testimonials /></Suspense>
      <Suspense fallback={SectionFallback}><HowWeWork /></Suspense>
      <Suspense fallback={SectionFallback}><CallToAction /></Suspense>
    </>
  );
}
