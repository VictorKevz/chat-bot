import { Person, SmartToy } from "@mui/icons-material";
import { ChatBubbleProps } from "../types/chatLog";

const ChatBubble = ({ data }: ChatBubbleProps) => {
  const isUser = data.role === "user";
  return (
    <div className="w-full flex items-center justify-between gap-10 z-20">
      {isUser ? (
        <div className="w-[50%] flex items-center gap-2.5 mb-5 p-3 bg-[var(--neutral-200)] backdrop-blur-[1.8rem] rounded-2xl shadow-[4rem]">
          <span className="min-h-12 min-w-12 rounded-full flex items-center justify-center bg-[var(--primary-color)]">
            <Person fontSize="medium" />
          </span>
          <p className="text-[var(--neutral-1000)]">{data.content}</p>
        </div>
      ) : (
        <div className="w-[50%] flex flex-row-reverse items-center gap-2.5 p-3 bg-black/60 backdrop-blur-[1.5rem] rounded-2xl shadow-[4rem] ml-auto">
          <span className="min-h-12 min-w-12 rounded-full flex items-center justify-center bg-[var(--secondary-color)]">
            <SmartToy fontSize="medium" />
          </span>
          <p className="text-white">{data.content}</p>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
