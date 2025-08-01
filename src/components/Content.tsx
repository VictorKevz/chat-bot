import { useChat } from "../hooks/useChat";
import { ChatBubble } from "./ChatBubble";
import { InputField } from "./InputField";
import { LoadingBubble } from "./LoadingBubble";
import { ArrowDownward, DeleteForever, Quiz } from "@mui/icons-material";
import { useCallback, useEffect, useRef, useState } from "react";
import { FAQs } from "./FAQs";
import { UserInputState } from "../types/chatLog";
import { AnimatePresence, motion } from "framer-motion";
import { useProjects } from "../hooks/useProjects";
import { RiseLoaderWrapper } from "../loaders/Loaders";
import { EmptyProjectItem, ProjectItem } from "../types/projects";
import { ProjectDialog } from "./projects/ProjectDialog";
import { SvgIconComponent } from "@mui/icons-material";
import { WarningDialog } from "./WarningDialog";

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
  const { fetchProjects, projectsLoading } = useProjects();

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
      if (category === "projects") {
        // Fetch projects first, then send message with projects data
        const projectsData = await fetchProjects();
        sendChatMessage(question, category, projectsData);
      } else {
        sendChatMessage(question, category);
      }
      toggleFAQS();
    },
    [fetchProjects, sendChatMessage]
  );
  const toggleWarningDialog = () => {
    setShowWarningDialog((prev) => !prev);
  };
  const handleChatDelete = useCallback(() => {
    onChatDelete();
    toggleWarningDialog();
  }, [onChatDelete]);
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <section
        ref={sectionRef}
        onScroll={handleScroll}
        className={`max-w-screen-xl w-full h-[calc(100dvh-15dvh)] relative flex flex-col items-center z-10 overflow-y-scroll no-scrollbar pb-[25dvh]  ${
          isEmpty ? "justify-center" : "justify-start"
        } `}
      >
        {isEmpty ? (
          <div className="w-full flex flex-col items-center justify-center text-center md:ml-10">
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
              Get to know Victor by chatting with his chatbot!
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4 items-center justify-between pt-5 pb-8 px-4">
            {chatLog.map((data, i) => (
              <ChatBubble key={i} data={data} onToggle={toggleProjectDialog} />
            ))}
            {loading && <LoadingBubble />}
            <div className="w-full mx-auto">
              {projectsLoading && <RiseLoaderWrapper />}
            </div>
          </div>
        )}
      </section>

      {showScrollButton && (
        <button
          type="button"
          onClick={scrollToBottom}
          className="fixed bottom-[40vh] right-8 2xl:bottom-[30vh] w-10 h-10 opacity-70 bg-gradient-to-r from-[#8c52ff] to-[#5ce1e6] rounded-full flex items-center justify-center shadow-2xl z-30 hover:from-[var(--primary-color)] hover:to-[var(--secondary-color)] hover:opacity-100 hover:scale-110"
        >
          <ArrowDownward className="text-white" fontSize="small" />
        </button>
      )}

      {/* Fixed container for the InputField and action buttons */}
      <div
        className={`w-full px-4 fixed z-20 bottom-4 max-w-screen-lg flex flex-col gap-2`}
      >
        <div className="w-fit ml-auto flex gap-2">
          {!isEmpty && (
            <ChatButton
              icon={DeleteForever}
              onToggle={toggleWarningDialog}
              color="var(--secondary-color)"
            />
          )}
          <ChatButton
            icon={Quiz}
            onToggle={toggleFAQS}
            color="var(--primary-color)"
          />
        </div>
        <InputField
          sendChatMessage={sendChatMessage}
          userInput={userInput}
          setUserInput={setUserInput}
          fetchProjects={fetchProjects}
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
          />
        )}
      </AnimatePresence>
    </div>
  );
};
type ChatButtonProps = {
  onToggle: () => void;
  icon: SvgIconComponent;
  color: string;
};
export const ChatButton = ({
  onToggle,
  icon: Icon,
  color,
}: ChatButtonProps) => {
  return (
    <button
      type="button"
      className={`text-white text-lg shadow-white/10 shadow-xl h-12 w-14 rounded-xl border border-[var(--border)] bg-[var(--neutral-0)]`}
      onClick={onToggle}
    >
      <span className={`text-[${color}]`}>
        <Icon />
      </span>
    </button>
  );
};
