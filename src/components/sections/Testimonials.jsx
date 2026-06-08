import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import SectionHeading from "../ui/SectionHeading";
import { useInView } from "../../hooks/useInView";
import "swiper/css";
import "swiper/css/pagination";

const CATEGORY_BADGE = {
  client: "bg-royal/10 text-royal dark:bg-royaldark/15 dark:text-royaldark border-royal/20",
  talent: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/25",
};

const CATEGORY_LABEL = {
  client: "Client",
  talent: "IT Professional",
};

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-sm leading-none" aria-hidden>
          ★
        </span>
      ))}
    </div>
  );
}

function InitialsAvatar({ initials }) {
  return (
    <div className="w-11 h-11 rounded-full bg-royal dark:bg-royaldark flex items-center justify-center shrink-0">
      <span className="text-white text-sm font-bold font-heading">{initials}</span>
    </div>
  );
}

function TestimonialCard({ t }) {
  const badgeClass = CATEGORY_BADGE[t.category] || CATEGORY_BADGE.client;

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl3 p-7 w-full h-full min-h-[22rem] flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-4 shrink-0">
        <span
          className="font-heading text-[64px] leading-none text-royal dark:text-royaldark select-none"
          aria-hidden
        >
          &ldquo;
        </span>
        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border shrink-0 ${badgeClass}`}>
          {CATEGORY_LABEL[t.category] || "Client"}
        </span>
      </div>

      <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1 min-h-[9.5rem] line-clamp-6 mb-6 italic">
        {t.quote}
      </p>

      <div className="border-t border-[var(--border)] pt-5 shrink-0 mt-auto">
        <div className="flex items-center gap-3">
          <InitialsAvatar initials={t.initials} />
          <div className="min-w-0 flex-1">
            <div className="font-heading font-bold text-sm text-[var(--text-primary)] line-clamp-1">
              {t.name}
            </div>
            <div className="text-sm text-[var(--text-secondary)] line-clamp-2">{t.title}</div>
            <div className="mt-1.5">
              <Stars count={t.rating} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Client Stories"
          heading="Let our clients tell the story"
          subheading="Real feedback from clients and IT professionals who partner with PRI Global every day."
          className="mb-14"
        />

        <div
          ref={ref}
          className={inView ? "anim-fade-up" : "opacity-0"}
          style={{ animationDuration: "0.6s" }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.5 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            className="!pb-12 [&_.swiper-wrapper]:items-stretch"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="!h-auto flex">
                <TestimonialCard t={t} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-4 text-center max-w-xl mx-auto">
            <p className="text-[var(--text-secondary)] text-sm md:text-base mb-5 leading-relaxed">
              Join 12,700+ IT professionals and hundreds of satisfied clients who trust PRI Global.
            </p>
            <a
              href="mailto:info@priglobal.com?subject=Testimonial%20Submission"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-royal text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-sm shadow-royal/20"
            >
              Share Your Experience <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
