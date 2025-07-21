import { Person } from "@mui/icons-material";
import { AIBubble } from "./AIBubble";
import { parseTextWithLinks } from "../utils/textFormatter";

export const ChatBubble = ({
  data,
}: {
  data: { role: "user" | "ai"; content: string };
}) => {
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
        <div className="w-[calc(100%-2.5vw)] sm:w-[60%] lg:w-[48%] rounded-tl-3xl rounded-br-3xl relative p-px">
          <div
            className="w-full flex items-center gap-2.5 bg-cover bg-no-repeat p-4  shadow-[4rem] rounded-tl-3xl rounded-br-3xl border border-[#2d2c2c79]"
            style={{ backgroundImage: "url(/user-buble-bg.png)" }}
          >
            <span className="min-h-12 min-w-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#8c52ff] to-[#5ce1e6]">
              <Person fontSize="medium" className="shadow-xl" />
            </span>
            <p
              className="text-[var(--neutral-1000)]"
              style={{ whiteSpace: "normal", wordWrap: "break-word" }}
            >
              {renderContent(data.content)}
            </p>
          </div>
        </div>
      ) : (
        <AIBubble>
          <p
            className="text-white"
            style={{ whiteSpace: "normal", wordWrap: "break-word" }}
          >
            {renderContent(data.content)}
          </p>
        </AIBubble>
      )}
    </div>
  );
};
