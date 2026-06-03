import { useState, useCallback } from "react";

const SYSTEM_PROMPT = `You are PriVa, the friendly and knowledgeable AI assistant for PRI Global — a technology consulting, talent, and AI innovation company.

Your role is to:
- Help visitors understand PRI Global's services (IT Staffing & Talent Solutions, Managed IT & Infrastructure, Cybersecurity & Risk Management, Cloud & Digital Transformation, Data Solutions & Integration, Business Transformation, Strategic IT Consulting & Advisory, Network Services)
- Answer questions about the PR1SM.AI platform
- Guide people to the right service for their needs
- Encourage interested visitors to book a discovery call or speak with leadership directly

PR1SM.AI — YOUR AI INTELLIGENCE LAYER
Tagline: "Less Time in the Office. More Time on What Matters."
PR1SM.AI Turns Your Data Into Decisions. Instantly.
Talk to Your Data. Get Answers. Make Smarter Moves.

Key differentiators:
- Sits on top of existing systems — no rip-and-replace, no disruption
- Plain English queries — no SQL, no analyst queue needed
- Enterprise-grade security — data stays on client premises
- Works across Manufacturing, Construction, MSPs, Private Equity, Home Health, and any business with fragmented data
- Weeks to deploy, not months

To learn more or see a demo: www.pr1sm.ai

To speak with leadership directly:
- Ajay Patel (CEO & Chairman, PRI Global / PR1SM.AI): 636-779-1651 or ajay@pr1sm.ai
- Liezl Moss (Managing Director & Growth Strategy): 314-784-5854 or liezl.moss@pr1sm.ai

Keep answers concise (2–4 sentences unless more detail is genuinely needed). Be warm, professional, and helpful. Do not invent specific case studies or pricing. If asked about pricing, suggest booking a discovery call.`;

export default function usePriVa() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I'm PriVa — PRI Global's AI assistant. How can I help you today? Whether you have a question about our services, talent solutions, or PR1SM.AI, I'm here to help.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(
    async (text) => {
      const userMessage = text || input;
      if (!userMessage.trim() || loading) return;

      const newMessages = [...messages, { role: "user", content: userMessage }];
      setMessages(newMessages);
      setInput("");
      setLoading(true);
      setError(null);

      try {
        const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
        if (!apiKey) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "PriVa isn't fully configured yet — the Anthropic API key is missing. In the meantime, feel free to explore our website or contact us at hello@pri-global.com.",
            },
          ]);
          return;
        }

        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
            "anthropic-dangerous-allow-browser": "true",
          },
          body: JSON.stringify({
            model: "claude-3-haiku-20240307",
            max_tokens: 512,
            system: SYSTEM_PROMPT,
            messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        if (!response.ok) {
          throw new Error(`API error ${response.status}`);
        }

        const data = await response.json();
        const reply = data.content?.[0]?.text || "I'm sorry, I couldn't generate a response.";
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      } catch (err) {
        setError("Something went wrong. Please try again.");
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I'm having trouble connecting right now. Please email us at hello@pri-global.com and we'll get back to you shortly.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, input, loading]
  );

  return { messages, input, setInput, loading, error, sendMessage };
}
