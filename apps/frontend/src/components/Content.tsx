import { useChat } from "../hooks/useChat";
import ChatBubble from "./ChatBubble";
import { SearchBar } from "./SearchBar";

export const Content = () => {
  const { chat, chatLog } = useChat();
  return (
    <div className="w-full flex flex-col items-center justify-center mt-6">
      <section className="max-w-screen-xl w-full h-[calc(100vh-12rem)] 2xl:h-[calc(100vh-15rem)] relative flex flex-col items-center justify-between px-4 z-10 overflow-y-scroll no-scrollbar pb-[9rem]">
        <div className="w-full flex flex-col gap-4 items-center justify-between">
          {chatLog.map((data, i) => (
            <ChatBubble key={i} data={data} />
          ))}
        </div>
      </section>
      <div className=" max-w-screen-xl w-full mt-8 px-4 fixed bottom-6 z-20">
        <SearchBar submitPrompt={chat} />
      </div>
    </div>
  );
};
