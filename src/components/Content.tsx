import { useChat } from "../hooks/useChat";
import ChatBubble from "./ChatBubble";
import { SearchBar } from "./SearchBar";

export const Content = () => {
  const { chat, loading, error, chatLog } = useChat();
  return (
    <section className="w-full max-w-screen-xl h-[calc(100vh-12rem)] relative flex flex-col items-center justify-between mx-auto px-4 z-10">
      <article className="w-full flex flex-col items-center min-h-[20rem] relative py-6">
        {chatLog.map((data, i) => (
          <ChatBubble key={i} data={data} />
        ))}
      </article>
      <div className="w-full mt-8 bg-[var(--neutral-0)] rounded-xl">
        <SearchBar submitPrompt={chat} />
      </div>
    </section>
  );
};
