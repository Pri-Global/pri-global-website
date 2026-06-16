import { lazy, Suspense, useEffect } from "react";
import SEO from "../components/SEO";
import Hero from "../components/sections/Hero";
import ClientLogos from "../components/ui/ClientLogos";
import TrustBar from "../components/sections/TrustBar";
import FreeConsultationBanner from "../components/sections/FreeConsultationBanner";
import CorePillars from "../components/sections/CorePillars";
import IndustriesPreview from "../components/sections/IndustriesPreview";
import { scrollToPageTop } from "../utils/scrollToPageTop";

const Stats              = lazy(() => import("../components/sections/Stats"));
import SolutionQuiz from "../components/sections/SolutionQuiz";
const ServicesSection    = lazy(() => import("../components/sections/Services"));
const DoingBusinessVideo = lazy(() => import("../components/sections/DoingBusinessVideo"));
const PrismAI            = lazy(() => import("../components/sections/PrismAI"));
import ExploreMore from "../components/sections/ExploreMore";
import LeadershipSpotlight from "../components/sections/LeadershipSpotlight";
const HowWeWork          = lazy(() => import("../components/sections/HowWeWork"));
const Testimonials       = lazy(() => import("../components/sections/Testimonials"));
const CallToAction       = lazy(() => import("../components/sections/CallToAction"));

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
      <TrustBar />
      <Suspense fallback={SectionFallback}><Stats /></Suspense>
      <FreeConsultationBanner />
      <CorePillars />
      <SolutionQuiz />
      <Suspense fallback={SectionFallback}><ServicesSection /></Suspense>
      <IndustriesPreview />
      <Suspense fallback={SectionFallback}><DoingBusinessVideo /></Suspense>
      <Suspense fallback={SectionFallback}><PrismAI /></Suspense>
      <ExploreMore />
      <LeadershipSpotlight />
      <Suspense fallback={SectionFallback}><Testimonials /></Suspense>
      <Suspense fallback={SectionFallback}><HowWeWork /></Suspense>
      <Suspense fallback={SectionFallback}><CallToAction /></Suspense>
    </>
  );
}
