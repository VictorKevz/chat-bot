import { Person } from "@mui/icons-material";
import { AIBubble } from "./AIBubble";
import { parseTextWithLinks } from "../utils/textFormatter";
import { ChatPair } from "../types/chatLog";

export const ChatBubble = ({ data }: { data: ChatPair }) => {
  const isUser = data.role === "user";

  // Here I only parse links for AI messages
  const renderContent = (text: string) => {
    if (isUser) {
      return text;
    }

    const cleanText = text.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();

    const parts = parseTextWithLinks(cleanText);

    return (
      <span style={{ display: "inline" }}>
        {parts.map((part, index) => {
          if (part.type === "link") {
            const isUrl = part.href?.startsWith("http");
            return (
              <a
                key={index}
                href={part.href}
                target={isUrl ? "_blank" : undefined}
                rel={isUrl ? "noopener noreferrer" : undefined}
                style={{
                  color: "#67e8f9",
                  textDecoration: "underline",
                  transition: "color 0.2s ease",
                  display: "inline",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#a5f3fc";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#67e8f9";
                }}
              >
                {part.text}
              </a>
            );
          }
          return (
            <span key={index} style={{ color: "white", display: "inline" }}>
              {part.text}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className="w-full z-20">
      {isUser ? (
        <div className="w-fit flex items-center justify-end gap-2.5 shadow-2xl rounded-tl-[2.5rem] rounded-bl-lg rounded-tr-[4rem] rounded-br-[4rem] relative p-4 bg-[var(--neutral-600)] ml-auto">
          <p
            className="text-[var(--neutral-1000)] text-sm sm:text-lg"
            style={{ whiteSpace: "normal", wordWrap: "break-word" }}
          >
            {renderContent(data.content)}
          </p>
          <span className="min-h-12 min-w-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#8c52ff] to-[#5ce1e6]">
            <Person fontSize="medium" className="shadow-xl" />
          </span>
        </div>
      ) : (
        <AIBubble>
          <p
            className="text-white text-sm sm:text-lg"
            style={{ whiteSpace: "normal", wordWrap: "break-word" }}
          >
            {renderContent(data.content)}
          </p>
        </AIBubble>
      )}
    </div>
  );
};
