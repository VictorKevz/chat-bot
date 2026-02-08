import { useCallback, useState } from "react";
import { ChatPair, ChatUiAction, ProjectPaging } from "../types/chatLog";
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
    projectsData?: ProjectItem[],
    projectPaging?: ProjectPaging,
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

      const lastProjectsMessage = [...newChat]
        .reverse()
        .find((entry) => entry.projectsData && entry.projectsData.length > 0);
      const projectContext = lastProjectsMessage
        ? {
            items: lastProjectsMessage.projectsData,
            paging: lastProjectsMessage.projectPaging,
          }
        : undefined;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          category,
          chatHistory: currentChatLog,
          projectPaging,
          projectContext,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      const uiActions: ChatUiAction[] = data.uiActions ?? [];
      const projectAction = uiActions.find(
        (action) => action.type === "show_projects"
      );
      const actionProjects = projectAction?.items;
      const actionPaging = projectAction?.paging;
      // Add only AI response (user already added above)
      const aiResponse: ChatPair = {
        role: "assistant",
        content: data.text,
        projectsData: actionProjects ?? projectsData ?? undefined,
        projectPaging: actionPaging ?? projectPaging,
        uiActions: uiActions.length > 0 ? uiActions : undefined,
      };
      const followUpPrompt = data.followUpPrompt;
      const followUpMessage: ChatPair | null = followUpPrompt
        ? { role: "assistant", content: followUpPrompt }
        : null;
      const finalChatLog = followUpMessage
        ? [...newChat, aiResponse, followUpMessage]
        : [...newChat, aiResponse];

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
