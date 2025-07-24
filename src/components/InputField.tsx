import { OnChangeType, OnSubmitType, SearchBarProps } from "../types/chatLog";
import { ArrowUpward } from "@mui/icons-material";

export const InputField = ({
  submitPrompt,
  userInput,
  setUserInput,
}: SearchBarProps) => {
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
        className="w-full min-h-[8rem] flex flex-col items-center justify-between bg-cover bg-no-repeat px-6 rounded-2xl z-30"
        style={{ backgroundImage: "url(/user-buble-bg.png)" }}
      >
        <div className="w-full flex items-center relative h-full ">
          <label htmlFor="message" className="w-full h-full">
            <textarea
              tabIndex={-1}
              id="message"
              value={userInput.message}
              onChange={(e: OnChangeType) => handleChange(e)}
              placeholder="Ask anything..."
              className={`w-full h-full text-[var(--neutral-1000)] text-base font-medium p-6 resize-none custom-scrollbar ${
                !userInput.isValid
                  ? "border-[var(--error)]"
                  : "border-[var(--neutral-100)]"
              }`}
            ></textarea>
          </label>
          <button
            type="submit"
            className={`px-4 rounded-full h-10 w-10 bg-cover drop-shadow-xl opacity-90`}
            style={{ background: "var(--yellow-gradient)" }}
          >
            <ArrowUpward />
          </button>
        </div>
        {!userInput.isValid && (
          <span className="absolute top-full mt-2 left-6 text-xs text-[var(--error)]">
            Please enter a valid question!
          </span>
        )}
        {!userInput.message && (
          <p className="text-xs md:text-base text-[var(--neutral-400)] pb-4 text-center">
            VCTR can make mistakes, try to ask concise and precise questions for
            a better experience. Thank you!❤️
          </p>
        )}
      </form>
    </div>
  );
};
