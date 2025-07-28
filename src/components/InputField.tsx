import { OnChangeType, OnSubmitType, InputFieldProps } from "../types/chatLog";
import { ArrowUpward, Mic } from "@mui/icons-material";
import { detectProjectIntent } from "../utils/intentDetection";
import { ProjectItem } from "../types/projects";
import { SpeechButton } from "./SpeechButton";
import { useSpeechToText } from "../hooks/useSpeechToText";
import { useCallback } from "react";

export const InputField = ({
  sendChatMessage,
  userInput,
  setUserInput,
  fetchProjects,
}: InputFieldProps) => {
  const { isRecording, startRecording, stopRecording, transcript } =
    useSpeechToText();

  const handleChange = (e: OnChangeType) => {
    setUserInput({
      message: e.target.value,
      isValid: true,
    });
  };
  const handleSubmit = async (e: OnSubmitType) => {
    e.preventDefault();
    const trimmedValue = userInput.message.trim();
    if (!trimmedValue && trimmedValue.length <= 5) {
      setUserInput((prev) => ({
        ...prev,
        isValid: false,
      }));
      return;
    }

    // Detect if user is asking about projects
    const isProjectQuery = detectProjectIntent(trimmedValue);
    let projectsData: ProjectItem[] | undefined;

    if (isProjectQuery) {
      projectsData = await fetchProjects();
    }

    await sendChatMessage(userInput.message, undefined, projectsData);
    setUserInput({
      message: "",
      isValid: true,
    });
  };
  const submitRecording = useCallback(() => {
    stopRecording();
    if (transcript.trim()) {
      setUserInput((prev) => ({ ...prev, message: transcript }));
    }
  }, [stopRecording, transcript, setUserInput]);
  return (
    <div
      className="p-px rounded-2xl w-full"
      style={{ background: "var(--purple-gradient)" }}
    >
      <form
        autoComplete="off"
        onSubmit={(e: OnSubmitType) => handleSubmit(e)}
        className="w-full min-h-[20dvh] z-20 flex flex-col items-center justify-between bg-cover bg-no-repeat rounded-2xl"
        style={{ backgroundImage: "url(/user-buble-bg.png)" }}
      >
        {isRecording ? (
          <div className="h-full w-full flex items-center justify-center p-4">
            <SpeechButton
              onCancel={stopRecording}
              onSubmit={submitRecording}
              transcript={transcript}
            />
          </div>
        ) : (
          <div className="w-full flex items-center relative h-full px-4">
            <label
              htmlFor="message"
              className="w-full h-full relative flex justify-between items-center"
            >
              <textarea
                tabIndex={-1}
                id="message"
                value={userInput.message}
                onChange={(e: OnChangeType) => handleChange(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as unknown as OnSubmitType);
                  }
                }}
                placeholder="Ask anything..."
                className={`w-full h-full text-[var(--neutral-1000)] text-base font-medium p-6 resize-none custom-scrollbar ${
                  !userInput.isValid
                    ? "border-[var(--error)]"
                    : "border-[var(--neutral-100)]"
                }`}
              ></textarea>

              {!userInput.isValid && (
                <span className="absolute top-full mt-2 left-6 text-xs text-[var(--error)]">
                  Please enter a valid question!
                </span>
              )}
            </label>
            <div className="w-fit flex items-center justify-between">
              <button
                type="button"
                onClick={startRecording}
                className={`rounded-full bg-black text-[var(--secondary-color)] min-h-8 min-w-8 bg-cover drop-shadow-xl opacity-90 mr-8`}
              >
                <Mic />
              </button>
              <button
                type="submit"
                className={` rounded-full min-h-10 min-w-10 bg-cover drop-shadow-xl opacity-90`}
                style={{ background: "var(--yellow-gradient)" }}
              >
                <ArrowUpward />
              </button>
            </div>
          </div>
        )}

        {!userInput.message && (
          <div className="w-full bg-[var(--neutral-500)] py-3 px-4 rounded-b-2xl shadow-2xl">
            <p className="text-xs md:text-sm text-white/60 text-center">
              VCTR can make mistakes, try to ask concise and precise questions
              for a better experience❤️!
            </p>
          </div>
        )}
      </form>
    </div>
  );
};
