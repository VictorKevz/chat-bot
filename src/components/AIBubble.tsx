import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ModalVariants } from "../variants";
type AIBubbleProps = {
  children: ReactNode;
  showProjects: boolean;
  isPlaying?: boolean;
};

export const AIBubble = ({
  children,
  showProjects,
  isPlaying,
}: AIBubbleProps) => {
  return (
    <AnimatePresence>
      <motion.div
        variants={ModalVariants(-15)}
        animate="visible"
        initial="hidden"
        className={`z-20 relative mr-auto ${
          isPlaying
            ? "shadow-yellow-300/40 shadow-xl p-px bg-gradient-to-r from-[#8c52ff] to-[#5ce1e6]"
            : ""
        } ${
          isPlaying && showProjects
            ? "max-w-screen-lg w-full rounded-l-[3rem] rounded-tr-xl "
            : "w-fit max-w-screen-lg rounded-l-[4rem] rounded-tr-4xl"
        }
      `}
      >
        <div
          className={`relative flex-col items-start bg-[var(--neutral-500)] pl-4 pr-8 py-3 transition-all duration-300 ease-in-out  ${
            isPlaying ? "shadow-blue-300/50 shadow-lg " : ""
          } ${
            showProjects
              ? "w-full rounded-l-[3rem] rounded-tr-xl"
              : "w-fit max-w-screen-sm rounded-l-[4rem] rounded-tr-4xl"
          }`}
        >
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
