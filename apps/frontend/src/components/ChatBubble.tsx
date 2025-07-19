import { Person, SmartToy } from "@mui/icons-material";
import { ChatBubbleProps } from "../types/chatLog";

const ChatBubble = ({ data }: ChatBubbleProps) => {
  const isUser = data.role === "user";
  return (
    <div className="w-full z-20">
      {isUser ? (
        <div
          className="w-[48%] rounded-tl-3xl rounded-br-3xl relative p-px"
          style={{ background: "var(--purple-gradient)" }}
        >
          <div className="w-full flex items-center gap-2.5 p-4 bg-[var(--neutral-200)] rounded-tl-3xl rounded-br-3xl">
            <span className="min-h-12 min-w-12 rounded-full flex items-center justify-center bg-[var(--primary-color)]">
              <Person fontSize="medium" className="shadow-xl" />
            </span>
            <p className="text-[var(--neutral-1000)]">{data.content}</p>
          </div>
        </div>
      ) : (
        <div
          className="w-[48%] p-px rounded-tr-3xl rounded-bl-3xl ml-auto"
          style={{ background: "var(--yellow-gradient)" }}
        >
          <div className=" w-full flex flex-row-reverse items-center gap-2.5 p-4 bg-[var(--neutral-300)] rounded-tr-3xl rounded-bl-3xl">
            <span className="min-h-12 min-w-12 rounded-full flex items-center justify-center bg-[var(--secondary-color)]">
              <SmartToy fontSize="medium" className="text-[var(--neutral-0)]" />
            </span>
            <p className="text-white">{data.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
