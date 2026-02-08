import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ModalVariants } from "../variants";
type AIBubbleProps = {
  children: ReactNode;
  showProjects: boolean;
  isPlaying?: boolean;
  disableAnimation?: boolean;
};

export const AIBubble = ({
  children,
  showProjects,
  isPlaying,
  disableAnimation = false,
}: AIBubbleProps) => {
  const containerClass = `z-20 relative mr-auto ${
    isPlaying
      ? "shadow-yellow-300/10 shadow-xl p-px bg-gradient-to-r from-[#8c52ff] to-[#5ce1e6] transition-all duration-300 ease-in-out"
      : ""
  } ${
    isPlaying && showProjects
      ? "max-w-screen-lg w-full rounded-l-3xl rounded-tr-xl "
      : "w-fit max-w-screen-lg rounded-l-4xl rounded-tr-4xl"
  }`;

  const innerClass = `relative flex-col items-start bg-[var(--neutral-500)] pl-4 pr-8 py-3 transition-all duration-300 ease-in-out  ${
    isPlaying ? "shadow-blue-300/50 shadow-lg " : ""
  } ${
    showProjects
      ? "w-full rounded-l-3xl rounded-tr-xl"
      : "w-fit max-w-screen-sm rounded-l-4xl rounded-tr-4xl"
  }`;

  if (disableAnimation) {
    return (
      <div className={containerClass}>
        <div className={innerClass}>{children}</div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        variants={ModalVariants(-15)}
        animate="visible"
        initial="hidden"
        className={containerClass}
      >
        <div className={innerClass}>{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};
