import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Quote } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import SectionHeading from "../ui/SectionHeading";
import { useInView } from "../../hooks/useInView";
import "swiper/css";
import "swiper/css/pagination";

function Avatar({ src }) {
  return (
    <img
      src={src}
      alt="Client avatar"
      width={44}
      height={44}
      className="w-11 h-11 rounded-full object-cover shrink-0"
      loading="lazy"
      decoding="async"
    />
  );
}

export default function Testimonials() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Client Stories"
          heading="What our clients say"
          subheading="Don't just take our word for it. Here's what the organisations we've partnered with have to say."
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
            autoplay={{ delay: 4500, disableOnInteraction: true, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            className="!pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl3 p-7 h-full flex flex-col">
                  <Quote size={28} className="text-royal/30 dark:text-royaldark/30 mb-4" />
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1 mb-6 italic">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar src={t.avatar} />
                    <div>
                      <div className="font-semibold text-sm text-[var(--text-primary)]">
                        {t.name}
                      </div>
                      <div className="text-xs text-[var(--text-muted)]">
                        {t.title} · {t.company}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
