import { useState } from "react";
import {
  OnChangeType,
  OnSubmitType,
  SearchBarProps,
  UserInputState,
} from "../types/chatLog";
import { ArrowUpward } from "@mui/icons-material";

export const SearchBar = ({ submitPrompt }: SearchBarProps) => {
  const [userInput, setUserInput] = useState<UserInputState>({
    message: "",
    isValid: true,
  });
  const handleChange = (e: OnChangeType) => {
    setUserInput({
      message: e.target.value,
      isValid: true,
    });
  };

  const handleSubmit = (e: OnSubmitType) => {
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
    setUserInput({
      message: "",
      isValid: true,
    });
  };
  return (
    <div
      className="p-px rounded-2xl"
      style={{ background: "var(--purple-gradient)" }}
    >
      <form
        autoComplete="off"
        onSubmit={(e: OnSubmitType) => handleSubmit(e)}
        className="w-full h-[8rem] flex flex-col items-center justify-between bg-cover bg-no-repeat px-6 rounded-2xl z-30"
        style={{ backgroundImage: "url(/user-buble-bg.png)" }}
      >
        <div className="w-full flex items-center relative h-full ">
          <label htmlFor="message" className="w-full h-full">
            <input
              type="text"
              id="message"
              value={userInput.message}
              onChange={(e: OnChangeType) => handleChange(e)}
              placeholder="Ask anything..."
              className={`w-full h-full text-[var(--neutral-1000)] text-base font-medium ${
                !userInput.isValid
                  ? "border-[var(--error)]"
                  : "border-[var(--neutral-100)]"
              }`}
            />
          </label>
          <button
            type="submit"
            className={`px-4 rounded-full h-10 w-10 bg-cover drop-shadow-xl opacity-90`}
            style={{ background: "var(--yellow-gradient)" }}
          >
            <ArrowUpward />
          </button>
          {!userInput.isValid && (
            <span className="absolute top-full mt-2 left-6 text-xs text-[var(--error)]">
              Please enter a valid question!
            </span>
          )}
        </div>
        <p className="text-xs md:text-sm text-[var(--neutral-400)] pb-2 text-center">
          My chatbot can make mistakes, try to ask concise and precise questions
          for a better experience. Thank you!❤️
        </p>
      </form>
    </div>
  );
};
