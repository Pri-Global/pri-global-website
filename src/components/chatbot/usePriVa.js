import { useState, useCallback } from "react";
import { generatePrivaReply } from "./privaLocalEngine";

const GREETING =
  "Hi, I'm PriVa — PRI Global's assistant. I answer from our website content (services, PR1SM.AI, careers, offices, and more). What would you like to know?";

/** Call the server-side PriVa API; throws on any non-OK response. */
async function fetchApiReply(history) {
  const res = await fetch("/api/priva", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: history }),
  });
  if (!res.ok) throw new Error(`PriVa API ${res.status}`);
  const data = await res.json();
  if (!data?.reply) throw new Error("PriVa API: empty reply");
  return data.reply;
}

export default function usePriVa() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(
    async (text) => {
      const userMessage = (text ?? input).trim();
      if (!userMessage || loading) return;

      // Build the history the model sees (greeting is UI-only, drop it).
      const history = [
        ...messages.filter((m) => m.content !== GREETING),
        { role: "user", content: userMessage },
      ];

      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      setInput("");
      setLoading(true);
      setError(null);

      try {
        let reply;
        try {
          reply = await fetchApiReply(history);
        } catch (apiErr) {
          // Graceful degradation: fall back to the local site-knowledge engine
          // if the API is unconfigured or unreachable.
          console.warn("PriVa API unavailable, using local engine:", apiErr);
          reply = generatePrivaReply(userMessage);
        }
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      } catch {
        setError("Something went wrong. Please try again.");
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I couldn't process that — please try again or use /get-pricing to reach our team.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages]
  );

  // Append a message from outside the text flow (e.g. live voice transcripts).
  const appendMessage = useCallback((role, content) => {
    const text = (content ?? "").trim();
    if (!text) return;
    setMessages((prev) => {
      // De-dupe identical consecutive transcript lines the model may repeat.
      const last = prev[prev.length - 1];
      if (last && last.role === role && last.content === text) return prev;
      return [...prev, { role, content: text }];
    });
  }, []);

  return { messages, input, setInput, loading, error, sendMessage, appendMessage };
}
