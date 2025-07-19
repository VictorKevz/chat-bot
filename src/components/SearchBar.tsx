import { useState } from "react";
import {
  OnChangeType,
  OnSubmitType,
  SearchBarProps,
  UserInputState,
} from "../types/chatLog";

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
  };
  return (
    <form
      onSubmit={(e: OnSubmitType) => handleSubmit(e)}
      className="w-full flex items-center justify-center"
    >
      <div className="w-full flex items-center relative">
        <label htmlFor="message" className="w-full">
          <input
            type="text"
            id="message"
            value={userInput.message}
            onChange={(e: OnChangeType) => handleChange(e)}
            placeholder="Ask anything..."
            className={`h-30 w-full border  border-r-0 rounded-l-xl pl-6 text-[var(--neutral-900)] ${
              !userInput.isValid
                ? "border-[var(--error)]"
                : "border-[var(--neutral-100)]"
            }`}
          />
        </label>
        <button
          type="submit"
          className={`h-30.5  px-4 rounded-r-xl -ml-2 ${
            !userInput.isValid
              ? "bg-[var(--error)]"
              : "bg-[var(--primary-color)]"
          } `}
        >
          Search
        </button>
        {!userInput.isValid && (
          <span className="absolute top-full mt-2 left-6 text-xs text-[var(--error)]">
            Please enter a valid question!
          </span>
        )}
      </div>
    </form>
  );
};
