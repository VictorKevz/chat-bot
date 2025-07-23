import { SmartToy } from "@mui/icons-material";
import { ReactNode } from "react";

interface AIBubbleProps {
  children: ReactNode;
}

export const AIBubble = ({ children }: AIBubbleProps) => {
  return (
    <div className="w-full p-px">
      <div className="w-fit max-w-screen-sm flex items-center gap-2.5 p-4 bg-[var(--neutral-500)] rounded-tr-[2.5rem] rounded-br-lg rounded-tl-[4rem] rounded-bl-[4rem]">
        <span className="min-h-12 min-w-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)]">
          <SmartToy fontSize="medium" className="text-[var(--neutral-0)]" />
        </span>
        {children}
      </div>
    </div>
  );
};
