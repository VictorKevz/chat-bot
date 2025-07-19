import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export const SearchBar = ({ submitPrompt }) => {
    const [userInput, setUserInput] = useState({
        message: "",
        isValid: true,
    });
    const handleChange = (e) => {
        setUserInput({
            message: e.target.value,
            isValid: true,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedValue = userInput.message.trim();
        if (!trimmedValue && trimmedValue.length <= 5) {
            setUserInput((prev) => ({
                ...prev,
                isValid: false,
            }));
            return;
        }
        submitPrompt(userInput.message);
    };
    return (_jsx("form", { onSubmit: (e) => handleSubmit(e), className: "w-full flex items-center justify-center", children: _jsxs("div", { className: "w-full flex items-center relative", children: [_jsx("label", { htmlFor: "message", className: "w-full", children: _jsx("input", { type: "text", id: "message", value: userInput.message, onChange: (e) => handleChange(e), placeholder: "Ask anything...", className: `h-30 w-full border  border-r-0 rounded-l-xl pl-6 text-[var(--neutral-900)] ${!userInput.isValid
                            ? "border-[var(--error)]"
                            : "border-[var(--neutral-100)]"}` }) }), _jsx("button", { type: "submit", className: `h-30.5  px-4 rounded-r-xl -ml-2 ${!userInput.isValid
                        ? "bg-[var(--error)]"
                        : "bg-[var(--primary-color)]"} `, children: "Search" }), !userInput.isValid && (_jsx("span", { className: "absolute top-full mt-2 left-6 text-xs text-[var(--error)]", children: "Please enter a valid question!" }))] }) }));
};
