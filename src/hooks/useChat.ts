import { useState } from "react";
import { ChatPair } from "../types/chatLog";

export const useChat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatLog, setChatLog] = useState<ChatPair[]>([]);
  const [keyCategory, setKeyCategory] = useState<string>("");

  const sendChatMessage = async (
    message: string,
    category?: string
  ): Promise<string | undefined> => {
    try {
      setLoading(true);
      setError(null);

      // Add user message IMMEDIATELY so they can see
      const newUserMessage: ChatPair = { role: "user", content: message };
      setChatLog((prev) => [...prev, newUserMessage]);
      setKeyCategory(category ?? "");
      // Get current chat history including the new message
      const currentChatLog = [...chatLog, newUserMessage];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          category,
          chatHistory: currentChatLog,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      // Add only AI response (user already added above)
      setChatLog((prev) => [
        ...prev,
        { role: "assistant", content: data.text },
      ]);
      return data.text;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return {
    sendChatMessage,
    loading,
    error,
    chatLog,
    keyCategory,
  };
};
