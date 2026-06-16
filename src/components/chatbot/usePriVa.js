import { useState, useCallback } from "react";
import { generatePrivaReply, privaReplyDelayMs } from "./privaLocalEngine";

export default function usePriVa() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I'm PriVa — PRI Global's assistant. I answer from our website content (services, PR1SM.AI, careers, offices, and more). What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(
    async (text) => {
      const userMessage = (text ?? input).trim();
      if (!userMessage || loading) return;

      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      setInput("");
      setLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, privaReplyDelayMs(userMessage)));
        const reply = generatePrivaReply(userMessage);
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      } catch {
        setError("Something went wrong. Please try again.");
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I couldn't process that — please try again or email info@priglobal.com.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading]
  );

  return { messages, input, setInput, loading, error, sendMessage };
}
