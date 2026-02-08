import { useChat } from "../hooks/useChat";
import { ChatBubble } from "./ChatBubble";
import { InputField } from "./InputField";
import { LoadingBubble } from "./LoadingBubble";
import { ArrowDownward, DeleteForever, Quiz } from "@mui/icons-material";
import { useCallback, useEffect, useRef, useState } from "react";
import { FAQs } from "./FAQs";
import { UserInputState } from "../types/chatLog";
import { AnimatePresence, motion } from "framer-motion";
import { RiseLoaderWrapper } from "../loaders/Loaders";
import { EmptyProjectItem, ProjectItem } from "../types/projects";
import { ProjectDialog } from "./projects/ProjectDialog";
import { WarningDialog } from "./WarningDialog";
import { useAlertProvider } from "../context/AlertContext";
import { VCTR } from "./common/VCTR";
import { ChatButton } from "./common/ChatButton";

export const Content = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showFaqs, setShowFaqs] = useState(false);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [isActivelyScrolling, setIsActivelyScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [userInput, setUserInput] = useState<UserInputState>({
    message: "",
    isValid: true,
  });

  const { sendChatMessage, chatLog, onChatDelete, loading } = useChat();
  const { onShowAlert } = useAlertProvider();

  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [currentProject, setCurrentProject] =
    useState<ProjectItem>(EmptyProjectItem);

  const toggleProjectDialog = useCallback(
    (data?: ProjectItem) => {
      setCurrentProject(() => {
        if (showProjectDialog || !data) {
          return EmptyProjectItem;
        }
        return data;
      });
      setShowProjectDialog((prev) => !prev);
    },
    [showProjectDialog]
  );
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

      // Detect active scrolling
      setIsActivelyScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsActivelyScrolling(false);
      }, 200);
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

  const toggleFAQS = () => {
    setShowFaqs((prev) => !prev);
  };

  const OnFAQsUpdate = useCallback(
    async (question: string, category: string) => {
      sendChatMessage(question, category);
      toggleFAQS();
    },
    [sendChatMessage]
  );
  const toggleWarningDialog = () => {
    setShowWarningDialog((prev) => !prev);
  };
  const handleChatDelete = useCallback(() => {
    onChatDelete();
    toggleWarningDialog();
    onShowAlert({
      message: "Chat deleted successfully!",
      type: "success",
      visible: true,
    });
  }, [onChatDelete, onShowAlert]);
  return (
    <div
      className="w-full flex flex-col items-center justify-center"
      aria-label="Chat main content"
    >
      <section
        ref={sectionRef}
        onScroll={handleScroll}
        aria-label="Chat conversation"
        className={`max-w-screen-xl w-full h-[calc(100dvh-15dvh)] relative flex flex-col items-center z-10 overflow-y-scroll no-scrollbar pb-[25dvh]  ${
          isEmpty ? "justify-center" : "justify-start"
        } `}
      >
        {isEmpty ? (
          <WelcomeUI />
        ) : (
          <div
            className="w-full flex flex-col gap-4 items-center justify-between pt-5 pb-8 px-4"
            role="log"
            aria-live="polite"
          >
            {chatLog.map((data, i) => (
              <ChatBubble
                key={i}
                data={data}
                onToggle={toggleProjectDialog}
                onShowNextProjects={(paging) => {
                  const nextOffset = paging.offset + paging.limit;
                  sendChatMessage("Show next project", undefined, undefined, {
                    ...paging,
                    offset: nextOffset,
                  });
                }}
              />
            ))}
            {loading && <LoadingBubble />}
            <div className="w-full mx-auto">
              {loading && <RiseLoaderWrapper />}
            </div>
          </div>
        )}
      </section>

      {showScrollButton && (
        <button
          type="button"
          onClick={scrollToBottom}
          aria-label="Scroll to latest message"
          className="fixed bottom-[40vh] right-8 2xl:bottom-[30vh] w-10 h-10 opacity-70 bg-gradient-to-r from-[#8c52ff] to-[#5ce1e6] rounded-full flex items-center justify-center shadow-2xl z-30 hover:from-[var(--primary-color)] hover:to-[var(--secondary-color)] hover:opacity-100 hover:scale-110"
        >
          <ArrowDownward
            className="text-white"
            fontSize="small"
            aria-hidden="true"
          />
          <span className="sr-only">Scroll to latest message</span>
        </button>
      )}

      {/* Fixed container for the InputField and action buttons */}
      <div
        className={`w-full px-4 fixed z-20 bottom-4 max-w-screen-lg flex flex-col gap-2`}
        aria-label="Chat input and actions"
      >
        <div className="w-fit ml-auto flex gap-2" aria-label="Chat actions">
          {!isEmpty && (
            <ChatButton
              icon={DeleteForever}
              onToggle={toggleWarningDialog}
              color="var(--secondary-color)"
              ariaLabel="Delete chat"
            />
          )}
          <ChatButton
            icon={Quiz}
            onToggle={toggleFAQS}
            color="var(--primary-color)"
            ariaLabel="Open FAQs"
          />
        </div>
        <InputField
          sendChatMessage={sendChatMessage}
          userInput={userInput}
          setUserInput={setUserInput}
        />
        {isActivelyScrolling && (
          <div className="fixed bottom-0 left-0 w-screen h-[15vh] backdrop-blur-[.5rem] -z-1"></div>
        )}
      </div>

      {/* Dialogs - FAQS, Projects and Warning */}
      <AnimatePresence mode="wait">
        {showFaqs && <FAQs onCloseFAQs={toggleFAQS} onUpdate={OnFAQsUpdate} />}
      </AnimatePresence>
      <AnimatePresence>
        {showProjectDialog && (
          <ProjectDialog data={currentProject} onToggle={toggleProjectDialog} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showWarningDialog && (
          <WarningDialog
            onDelete={handleChatDelete}
            onCancel={toggleWarningDialog}
            aria-label="Delete chat warning dialog"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export const WelcomeUI = () => {
  return (
    <header
      className="w-full flex flex-col items-center justify-center text-center md:ml-10"
      aria-label="Welcome message"
    >
      <motion.h2
        className="text-3xl md:text-7xl bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent"
        animate={{ scale: [0.9, 1.02, 0.9] }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        Hello, Welcome!
      </motion.h2>
      <p className="text-base md:text-lg text-[var(--neutral-400)]">
        Get to know Victor by chatting with <VCTR />, his personal AI assistant.
      </p>
    </header>
  );
};
