import { ReactNode } from "react";

type AIBubbleProps = {
  children: ReactNode;
  showProjects: boolean;
};

export const AIBubble = ({ children, showProjects }: AIBubbleProps) => {
  return (
    <div className="w-full flex flex-col">
      <div
        className={` ${
          showProjects
            ? "relative flex-col max-w-screen-md w-full rounded-l-[3rem] rounded-tr-xl "
            : "w-fit max-w-screen-sm rounded-tr-[3rem] rounded-br-0 rounded-tl-3xl rounded-bl-2xl"
        }   flex items-center gap-2.5 px-6 py-5 bg-[var(--neutral-500)] `}
      >
        {children}
      </div>
    </div>
  );
};
