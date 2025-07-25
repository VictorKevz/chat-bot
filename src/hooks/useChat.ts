import { useState } from "react";
import { ChatPair } from "../types/chatLog";
import { ProjectItem } from "../types/projects";

export const useChat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatLog, setChatLog] = useState<ChatPair[]>([]);

  const sendChatMessage = async (
    message: string,
    category?: string,
    projectsData?: ProjectItem[]
  ): Promise<string | undefined> => {
    try {
      setLoading(true);
      setError(null);

      // Add user message IMMEDIATELY so they can see
      const newUserMessage: ChatPair = { role: "user", content: message };
      setChatLog((prev) => [...prev, newUserMessage]);

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
      const aiResponse: ChatPair = {
        role: "assistant",
        content: data.text,
        projectsData: projectsData || undefined,
      };
      setChatLog((prev) => [...prev, aiResponse]);
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
  };
};
