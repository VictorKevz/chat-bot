import { useState } from "react";
import { ChatPair } from "../types/chatLog";

export const useChat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatLog, setChatLog] = useState<ChatPair[]>([
    { role: "user", content: "Hello there!" },
    { role: "ai", content: "Hi! How can I help you today?" },
  ]);
  const chat = async (message: string): Promise<string | undefined> => {
    try {
      setLoading(true);
      setError(null);
      const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL ||
        "https://chat-bot-3p26.onrender.com";

      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setChatLog((prev) => [
        ...prev,
        { role: "user", content: message },
        { role: "ai", content: data.text },
      ]);
      return data.text;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return { chat, loading, error, chatLog };
};
