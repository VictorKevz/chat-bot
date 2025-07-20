import { useChat } from "../hooks/useChat";
import { ChatBubble } from "./ChatBubble";
import { SearchBar } from "./SearchBar";
import { LoadingBubble } from "./LoadingBubble";
import { ArrowDownward } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";

export const Content = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const { chat, chatLog, loading } = useChat();
  const isEmpty = chatLog.length === 0;

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollTo({
        top: sectionRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatLog, loading]);

  // Handle scroll to detect if user scrolled up
  const handleScroll = () => {
    if (sectionRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = sectionRef.current;
      const isAtBottom = scrollHeight - scrollTop <= clientHeight + 50; // 50px threshold
      setShowScrollButton(!isAtBottom);
    }
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollTo({
        top: sectionRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <section
        ref={sectionRef}
        onScroll={handleScroll}
        className={`max-w-screen-xl w-full h-[calc(100dvh-8rem)] relative flex flex-col items-center px-4 z-10 overflow-y-scroll no-scrollbar pb-[9rem] ${
          isEmpty ? "justify-center" : "justify-start"
        } `}
      >
        {isEmpty ? (
          <div className="w-full flex flex-col items-center justify-center text-center md:ml-10">
            <h2 className="text-3xl md:text-5xl bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">
              Hello, Welcome!
            </h2>
            <p className="text-base md:text-lg text-[var(--neutral-400)]">
              Get to know Victor by chatting with his chatbot!
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4 items-center justify-between pt-4">
            {chatLog.map((data, i) => (
              <ChatBubble key={i} data={data} />
            ))}
            {loading && <LoadingBubble />}
          </div>
        )}
      </section>
      {showScrollButton && (
        <button
          type="button"
          onClick={scrollToBottom}
          className="fixed bottom-[11rem] w-10 h-10 opacity-90 bg-gradient-to-r from-[#8c52ff] to-[#5ce1e6] rounded-full flex items-center justify-center shadow-2xl z-30 hover:from-[var(--primary-color)] hover:to-[var(--secondary-color)] hover:opacity-100 hover:scale-110"
        >
          <ArrowDownward className="text-white" fontSize="small" />
        </button>
      )}
      <div className=" max-w-screen-lg w-full px-4 fixed bottom-6 z-20">
        <SearchBar submitPrompt={chat} />
      </div>
    </div>
  );
};
