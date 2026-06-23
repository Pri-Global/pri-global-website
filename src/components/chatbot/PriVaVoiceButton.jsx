import { Mic, MicOff, PhoneOff, Loader2 } from "lucide-react";
import usePriVaVoice from "./usePriVaVoice";

/**
 * Compact voice control for PriVa (OpenAI Realtime, WebRTC).
 * - Idle: a mic button that starts a live call.
 * - Connecting: spinner.
 * - Active: live indicator + mute toggle + end-call button.
 *
 * Live transcripts are pushed to the chat log via onTranscript.
 */
export default function PriVaVoiceButton({ onTranscript, className = "" }) {
  const { status, error, assistantSpeaking, micMuted, start, stop, toggleMute } =
    usePriVaVoice({ onTranscript });

  if (status === "active") {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        <button
          type="button"
          onClick={toggleMute}
          className="w-8 h-8 rounded-full glass-btn flex items-center justify-center text-[var(--text-primary)]"
          aria-label={micMuted ? "Unmute microphone" : "Mute microphone"}
          title={micMuted ? "Unmute" : "Mute"}
        >
          {micMuted ? <MicOff size={14} /> : <Mic size={14} />}
        </button>

        <span className="flex items-center gap-1 px-2 text-xs text-[var(--text-secondary)] whitespace-nowrap">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              assistantSpeaking ? "bg-royal animate-pulse" : "bg-green-400"
            }`}
          />
          {assistantSpeaking ? "PriVa speaking…" : "Listening…"}
        </span>

        <button
          type="button"
          onClick={stop}
          className="w-8 h-8 rounded-full bg-red-500/90 hover:bg-red-500 flex items-center justify-center text-white"
          aria-label="End voice call"
          title="End call"
        >
          <PhoneOff size={14} />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={start}
      disabled={status === "connecting"}
      className={`w-8 h-8 rounded-full glass-btn flex items-center justify-center text-[var(--text-primary)] disabled:opacity-50 ${className}`}
      aria-label="Talk to PriVa"
      title={error || "Talk to PriVa"}
    >
      {status === "connecting" ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Mic size={14} />
      )}
    </button>
  );
}
