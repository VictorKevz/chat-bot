import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Person, SmartToy } from "@mui/icons-material";
const ChatBubble = ({ data }) => {
    const isUser = data.role === "user";
    return (_jsx("div", { className: "w-full flex items-center justify-between z-20", children: isUser ? (_jsxs("div", { className: "w-[48%] flex items-center gap-2.5 p-3 bg-[var(--neutral-200)] backdrop-blur-[1.8rem] rounded-xl shadow-[4rem]", children: [_jsx("span", { className: "min-h-12 min-w-12 rounded-full flex items-center justify-center bg-[var(--primary-color)]", children: _jsx(Person, { fontSize: "medium" }) }), _jsx("p", { className: "text-[var(--neutral-1000)]", children: data.content })] })) : (_jsxs("div", { className: "w-[48%] flex flex-row-reverse items-center gap-2.5 p-3 bg-black/60 backdrop-blur-[1.5rem] rounded-xl shadow-[4rem] ml-auto", children: [_jsx("span", { className: "min-h-12 min-w-12 rounded-full flex items-center justify-center bg-[var(--secondary-color)]", children: _jsx(SmartToy, { fontSize: "medium" }) }), _jsx("p", { className: "text-white", children: data.content })] })) }));
};
export default ChatBubble;
