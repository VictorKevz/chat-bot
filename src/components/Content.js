import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useChat } from "../hooks/useChat";
import ChatBubble from "./ChatBubble";
import { SearchBar } from "./SearchBar";
export const Content = () => {
    const { chat, chatLog } = useChat();
    return (_jsxs("section", { className: "w-full max-w-screen-xl h-[calc(100vh-12rem)] relative flex flex-col items-center justify-between mx-auto px-4 z-10", children: [_jsx("article", { className: "w-full flex flex-col items-center", children: chatLog.map((data, i) => (_jsx(ChatBubble, { data: data }, i))) }), _jsx("div", { className: "w-full mt-8 bg-[var(--neutral-0)] rounded-xl", children: _jsx(SearchBar, { submitPrompt: chat }) })] }));
};
