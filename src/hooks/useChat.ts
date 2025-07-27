import { useCallback, useState } from "react";
import { ChatPair } from "../types/chatLog";
import { ProjectItem } from "../types/projects";

export const useChat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatLog, setChatLog] = useState<ChatPair[]>(() => {
    const chats = localStorage.getItem("chats");
    return chats ? JSON.parse(chats) : [];
  });

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
      const newChat = [...chatLog, newUserMessage];
      setChatLog(newChat);
      localStorage.setItem("chats", JSON.stringify(newChat));

      // Get current chat history including the new message
      const currentChatLog = newChat;

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
      const finalChatLog = [...newChat, aiResponse];

      setChatLog(finalChatLog);
      localStorage.setItem("chats", JSON.stringify(finalChatLog));

      return data.text;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };
  const DeleteChat = useCallback(() => {
    setChatLog([]);
    localStorage.removeItem("chats");
  }, []);

  return {
    sendChatMessage,
    loading,
    error,
    chatLog,
    onChatDelete: DeleteChat,
  };
};
