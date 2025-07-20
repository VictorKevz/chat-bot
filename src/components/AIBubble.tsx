import { SmartToy } from "@mui/icons-material";
import { ReactNode } from "react";

interface AIBubbleProps {
  children: ReactNode;
}

export const AIBubble = ({ children }: AIBubbleProps) => {
  return (
    <div className="w-full z-20">
      <div
        className="w-[48%] p-px rounded-tr-3xl rounded-bl-3xl ml-auto"
        style={{ background: "var(--yellow-gradient)" }}
      >
        <div className="w-full flex flex-row-reverse items-center gap-2.5 p-4 bg-[var(--neutral-300)] rounded-tr-3xl rounded-bl-3xl">
          <span className="min-h-12 min-w-12 rounded-full flex items-center justify-center bg-[var(--secondary-color)]">
            <SmartToy fontSize="medium" className="text-[var(--neutral-0)]" />
          </span>
          {children}
        </div>
      </div>
    </div>
  );
};
