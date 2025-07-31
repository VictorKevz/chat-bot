import { ReactNode } from "react";

type AIBubbleProps = {
  children: ReactNode;
  showProjects: boolean;
};

export const AIBubble = ({ children, showProjects }: AIBubbleProps) => {
  return (
    <div className="w-full z-20">
      <div
        className={`relative flex-col items-center pl-4 pr-8 py-3 bg-[var(--neutral-500)] ${
          showProjects
            ? "max-w-screen-md w-full rounded-l-[3rem] rounded-tr-xl "
            : "w-fit max-w-screen-sm rounded-l-[4rem] rounded-tr-4xl"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
