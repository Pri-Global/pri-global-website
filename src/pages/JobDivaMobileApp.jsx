import { ArrowLeft, Bell, Smartphone, Zap } from "lucide-react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import PriJobsAppSection from "../components/sections/JobDivaAppSection";
import Button from "../components/ui/Button";
import PriJobsMark from "../components/ui/PriJobsMark";
import JobdivaPhoneDemo from "../components/ui/JobdivaPhoneDemo";
import AppStoreButtons from "../components/ui/AppStoreButtons";
import AnimatedIcon from "../components/ui/AnimatedIcon";

const quickStats = [
  { icon: Bell, label: "Instant job alerts" },
  { icon: Zap, label: "One-tap apply" },
  { icon: Smartphone, label: "iOS & Android" },
];

export default function JobDivaMobileApp() {
  return (
    <>
      <SEO
        title="PRI Jobs — Mobile Job Search App"
        description="Download PRI Jobs for PRI Global job alerts, resume uploads, one-tap applications, and recruiter updates on iOS and Android."
        keywords="PRI Jobs app, PRI Global jobs, IT job alerts, mobile job search, candidate app"
        url="/careers/mobile-app"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Careers", url: "/careers" },
          { name: "PRI Jobs", url: "/careers/mobile-app" },
        ]}
      />

      <section className="relative overflow-hidden bg-[#0a0a12] text-white border-b border-white/[0.06]">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[#2B6FD4]/20 blur-[100px]" />
          <div className="absolute top-1/2 -right-24 w-[360px] h-[360px] rounded-full bg-[#D91E5A]/15 blur-[90px]" />
          <div className="absolute bottom-0 left-1/3 w-[280px] h-[280px] rounded-full bg-[#7B3FE4]/10 blur-[80px]" />
        </div>

        <div className="site-container relative py-10 sm:py-14 lg:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Careers", url: "/careers" },
              { name: "PRI Jobs", url: "/careers/mobile-app" },
            ]}
            className="[&_a]:text-white/50 [&_a:hover]:text-white [&_span]:text-white/35"
          />
          <Button
            to="/careers"
            variant="ghost"
            size="sm"
            className="mb-8 px-0 h-auto text-white/60 hover:text-white hover:bg-transparent"
          >
            <ArrowLeft size={16} /> Back to Careers
          </Button>

          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
            <div className="max-w-3xl">
              <PriJobsMark size="hero" variant="onDark" className="mb-6" />
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                Search PRI Global jobs from your phone
              </h1>
              <p className="text-base sm:text-lg text-white/65 leading-relaxed mb-8 max-w-2xl">
                PRI Jobs puts job alerts, resume uploads, applications, and recruiter messages in
                one place — built for candidates working with PRI Global.
              </p>
              <AppStoreButtons className="mb-8" />
              <div className="flex flex-wrap gap-3">
                {quickStats.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/75"
                  >
                    <AnimatedIcon Icon={Icon} size={14} className="text-[#6BA3F5]" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <JobdivaPhoneDemo hintClassName="text-white/45" />
            </div>
          </div>

          <div className="lg:hidden mt-12 flex justify-center">
            <JobdivaPhoneDemo hintClassName="text-white/45" />
          </div>
        </div>
      </section>

      <section className="section-y bg-[var(--bg-primary)]">
        <div className="site-container">
          <PriJobsAppSection
            showPortalNote={false}
            theme="light"
            showHighlights={false}
            showPhoneDemo={false}
            showHero={false}
          />
        </div>
      </section>

      <section className="pb-16 lg:pb-20 bg-[var(--bg-primary)]">
        <div className="site-container">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 sm:p-8 text-center">
            <p className="text-[var(--text-secondary)] mb-4 max-w-xl mx-auto">
              Prefer searching on the web? Browse live PRI Global openings on our job board.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button to="/candidate-jobs" size="md">
                Search open positions
              </Button>
              <Button to="/job-seeker-faq" variant="secondary" size="md">
                Job seeker FAQ
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
