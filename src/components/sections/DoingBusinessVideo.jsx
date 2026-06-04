import VideoSection from "./VideoSection";
import { VIDEOS } from "../../data/videos";

export default function DoingBusinessVideo() {
  return (
    <VideoSection
      label="Why Choose PRI Global"
      heading="Doing Business With PRI"
      subheading="See how we deliver results for our clients — from first conversation to long-term partnership."
      src={VIDEOS.doingBusiness}
      title="Doing Business With PRI Global"
      sectionClassName="py-20"
      bgClassName="bg-[var(--bg-secondary)]"
    />
  );
}
