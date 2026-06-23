import { useCallback, useEffect, useRef, useState } from "react";

/**
 * PriVa voice via the OpenAI Realtime API over WebRTC.
 *
 * Flow:
 *  1. POST /api/priva-realtime  -> short-lived ephemeral key (real key stays server-side)
 *  2. getUserMedia(mic) + RTCPeerConnection + data channel
 *  3. POST our SDP offer to OpenAI, apply the SDP answer
 *  4. Remote audio plays through a hidden <audio> element
 *
 * Status: "idle" | "connecting" | "active" | "error"
 * Also surfaces whether PriVa is currently speaking, for UI affordances.
 */
const SDP_URL = "https://api.openai.com/v1/realtime/calls";

export default function usePriVaVoice({ onTranscript } = {}) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [assistantSpeaking, setAssistantSpeaking] = useState(false);
  const [micMuted, setMicMuted] = useState(false);

  const pcRef = useRef(null);
  const dcRef = useRef(null);
  const streamRef = useRef(null);
  const audioRef = useRef(null);
  const onTranscriptRef = useRef(onTranscript);
  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  const cleanup = useCallback(() => {
    try {
      dcRef.current?.close();
    } catch { /* noop */ }
    try {
      pcRef.current?.getSenders().forEach((s) => s.track?.stop());
      pcRef.current?.close();
    } catch { /* noop */ }
    streamRef.current?.getTracks().forEach((t) => t.stop());
    if (audioRef.current) {
      audioRef.current.srcObject = null;
      audioRef.current.remove();
    }
    dcRef.current = null;
    pcRef.current = null;
    streamRef.current = null;
    audioRef.current = null;
    setAssistantSpeaking(false);
  }, []);

  const stop = useCallback(() => {
    cleanup();
    setMicMuted(false);
    setStatus("idle");
  }, [cleanup]);

  const handleEvent = useCallback((evt) => {
    switch (evt.type) {
      case "output_audio_buffer.started":
      case "response.output_audio.delta":
        setAssistantSpeaking(true);
        break;
      case "output_audio_buffer.stopped":
      case "response.done":
        setAssistantSpeaking(false);
        break;
      // Live transcripts (optional consumer wiring for the chat panel).
      case "response.output_audio_transcript.done":
        if (evt.transcript) onTranscriptRef.current?.({ role: "assistant", text: evt.transcript });
        break;
      case "conversation.item.input_audio_transcription.completed":
        if (evt.transcript) onTranscriptRef.current?.({ role: "user", text: evt.transcript });
        break;
      default:
        break;
    }
  }, []);

  const start = useCallback(async () => {
    if (status === "connecting" || status === "active") return;
    setError(null);
    setStatus("connecting");

    try {
      // 1. Ephemeral token from our backend.
      const tokenRes = await fetch("/api/priva-realtime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      if (!tokenRes.ok) throw new Error(`token ${tokenRes.status}`);
      const { value: ephemeralKey } = await tokenRes.json();
      if (!ephemeralKey) throw new Error("no ephemeral key");

      // 2. Mic + peer connection.
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      audioRef.current = audioEl;
      pc.ontrack = (e) => {
        audioEl.srcObject = e.streams[0];
      };

      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;
      dc.addEventListener("message", (e) => {
        try {
          handleEvent(JSON.parse(e.data));
        } catch { /* ignore malformed */ }
      });
      dc.addEventListener("open", () => {
        // Greet immediately so PriVa starts the conversation (server VAD would
        // otherwise wait for the user to speak first).
        dc.send(
          JSON.stringify({
            type: "response.create",
            response: {
              instructions:
                "In English, greet the visitor in one short, warm sentence as PriVa and ask how you can help with PRI Global.",
            },
          })
        );
      });

      pc.addEventListener("connectionstatechange", () => {
        const st = pc.connectionState;
        if (st === "failed" || st === "disconnected" || st === "closed") {
          if (pcRef.current === pc) stop();
        }
      });

      // 3. SDP offer -> OpenAI -> answer.
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpRes = await fetch(SDP_URL, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${ephemeralKey}`,
          "Content-Type": "application/sdp",
        },
      });
      if (!sdpRes.ok) throw new Error(`sdp ${sdpRes.status}`);
      const answer = { type: "answer", sdp: await sdpRes.text() };
      await pc.setRemoteDescription(answer);

      setStatus("active");
    } catch (err) {
      console.error("PriVa voice failed:", err);
      cleanup();
      setStatus("error");
      setError(
        err?.name === "NotAllowedError"
          ? "Microphone access is needed for voice. Please allow it and try again."
          : "Voice couldn't start. Please try again."
      );
    }
  }, [status, handleEvent, cleanup, stop]);

  const toggleMute = useCallback(() => {
    const track = streamRef.current?.getAudioTracks()[0];
    if (!track) return;
    track.enabled = !track.enabled;
    setMicMuted(!track.enabled);
  }, []);

  // Tear down on unmount.
  useEffect(() => cleanup, [cleanup]);

  return { status, error, assistantSpeaking, micMuted, start, stop, toggleMute };
}
