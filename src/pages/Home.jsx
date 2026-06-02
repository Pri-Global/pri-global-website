import { lazy, Suspense } from "react";
import Hero from "../components/sections/Hero";
import ClientLogos from "../components/ui/ClientLogos";

const ServicesSection = lazy(() => import("../components/sections/Services"));
const Stats           = lazy(() => import("../components/sections/Stats"));
const HowWeWork       = lazy(() => import("../components/sections/HowWeWork"));
const PrismAI         = lazy(() => import("../components/sections/PrismAI"));
const Testimonials    = lazy(() => import("../components/sections/Testimonials"));
const CallToAction    = lazy(() => import("../components/sections/CallToAction"));

const SectionFallback = <div className="h-96" />;

export default function Home() {
  return (
    <>
      <Hero />
      {/* Client logos ticker — directly below hero */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)]">
        <ClientLogos label="Trusted by leading organizations" />
      </div>
      <Suspense fallback={SectionFallback}><ServicesSection /></Suspense>
      <Suspense fallback={SectionFallback}><Stats /></Suspense>
      <Suspense fallback={SectionFallback}><HowWeWork /></Suspense>
      <Suspense fallback={SectionFallback}><PrismAI /></Suspense>
      <Suspense fallback={SectionFallback}><Testimonials /></Suspense>
      <Suspense fallback={SectionFallback}><CallToAction /></Suspense>
    </>
  );
}
