import { SmartToy } from "@mui/icons-material";
import { ReactNode } from "react";

interface AIBubbleProps {
  children: ReactNode;
}

export const AIBubble = ({ children }: AIBubbleProps) => {
  return (
    <div className="w-full p-px">
      <div className="w-fit max-w-screen-sm flex items-center gap-2.5 px-6 py-5 bg-[var(--neutral-500)] rounded-tr-full rounded-br-lg rounded-tl-full rounded-bl-full">
        <span className="min-h-12 min-w-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)]">
          <SmartToy fontSize="medium" className="text-[var(--neutral-0)]" />
        </span>
        {children}
      </div>
    </div>
  );
};
