import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import VideoPlayer from "../ui/VideoPlayer";
import { VIDEOS } from "../../data/videos";

const caresVideos = [
  { title: "PRI Cares", src: VIDEOS.priCares },
  { title: "Care & Gift Giving", src: VIDEOS.careGiftGiving },
  { title: "PRI Cares Community", src: VIDEOS.priCaresFacebook },
];

export default function PriCaresVideos() {
  return (
    <section id="pri-cares" className="py-20 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="PRI Cares"
          heading="Giving Back to the Communities We Serve"
          subheading="At PRI Global, we believe business success means community success. See how we give back."
          className="mb-10"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caresVideos.map((video, i) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <VideoPlayer src={video.src} title={video.title} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
