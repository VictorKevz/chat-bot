import { SmartToy } from "@mui/icons-material";
import { ReactNode } from "react";

interface AIBubbleProps {
  children: ReactNode;
}

export const AIBubble = ({ children }: AIBubbleProps) => {
  return (
    <div className="w-full p-px rounded-tr-3xl rounded-bl-3xl ">
      <div className="w-[calc(100%-2.5vw)] sm:w-[60%] lg:w-[48%] flex flex-row-reverse items-start justify-between gap-2.5 p-4 bg-[var(--neutral-500)] rounded-tr-3xl rounded-bl-3xl ml-auto">
        <span className="min-h-12 min-w-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)]">
          <SmartToy fontSize="medium" className="text-[var(--neutral-0)]" />
        </span>
        {children}
      </div>
    </div>
  );
};
