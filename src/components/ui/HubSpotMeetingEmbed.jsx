import { useEffect } from "react";
import { HUBSPOT_MEETING_EMBED } from "../../constants/links";

export default function HubSpotMeetingEmbed() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div
      className="meetings-iframe-container rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] min-h-[400px]"
      data-src={HUBSPOT_MEETING_EMBED}
    />
  );
}
