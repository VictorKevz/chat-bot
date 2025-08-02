import { OnChangeType, OnSubmitType, InputFieldProps } from "../types/chatLog";
import { ArrowUpward, Mic } from "@mui/icons-material";
import { detectProjectIntent } from "../utils/intentDetection";
import { ProjectItem } from "../types/projects";
import { TranscribeButton } from "./TranscribeButton";
import { useSpeechToText } from "../hooks/useSpeechToText";
import { useEffect } from "react";
import { Loader, RiseLoaderWrapper } from "../loaders/Loaders";
import { useAlertProvider } from "../context/AlertContext";
import { AnimatePresence, motion } from "framer-motion";
import { ModalVariants } from "../variants";
export const InputField = ({
  sendChatMessage,
  userInput,
  setUserInput,
  fetchProjects,
}: InputFieldProps) => {
  const {
    isRecording,
    isTranscribing,
    startRecording,
    stopRecording,
    cancelRecording,
    transcript,
  } = useSpeechToText();
  const { onShowAlert } = useAlertProvider();
  const handleChange = (e: OnChangeType) => {
    setUserInput({
      message: e.target.value,
      isValid: true,
    });
  };
  const handleSubmit = async (e: OnSubmitType) => {
    e.preventDefault();
    const trimmedValue = userInput.message.trim();
    if (!trimmedValue) {
      setUserInput((prev) => ({
        ...prev,
        isValid: false,
      }));
      onShowAlert(
        {
          message:
            "Failed: Message can't be blank! Please enter a valid question!",
          type: "error",
          visible: true,
        },
        4000
      );
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

  // Auto-populate input field when transcript changes
  useEffect(() => {
    if (transcript.trim() && !isRecording) {
      setUserInput((prev) => ({
        ...prev,
        message: transcript,
        isValid: true,
      }));
    }
  }, [transcript, isRecording, setUserInput]);

  // Render recording state
  const renderRecordingState = () => (
    <div className="h-full w-full flex items-center justify-center p-4">
      <TranscribeButton
        onCancel={cancelRecording}
        onSubmit={stopRecording}
        transcript={transcript}
      />
    </div>
  );

  // Render transcribing state
  const renderTranscribingState = () => (
    <div className="h-full w-full flex items-center justify-center p-4">
      <Loader LoaderItem={RiseLoaderWrapper} size={18} color="#ffde59d4" />
    </div>
  );

  // Render normal input state
  const renderInputState = () => (
    <div className="w-full flex items-center relative px-4">
      <label htmlFor="message" className="sr-only">
        Message input
      </label>
      <textarea
        id="message"
        aria-label="Type your message"
        value={userInput.message}
        onChange={(e: OnChangeType) => handleChange(e)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as OnSubmitType);
          }
        }}
        placeholder="Ask anything..."
        className={`w-full text-[var(--neutral-1000)] text-base font-medium p-6 resize-none custom-scrollbar`}
        aria-invalid={!userInput.isValid}
        aria-describedby="input-helper"
      ></textarea>
      <div className="w-fit flex items-center">
        <button
          type="button"
          onClick={startRecording}
          className={`rounded-full bg-black text-[var(--secondary-color)] min-h-8 min-w-8 bg-cover drop-shadow-xl opacity-80 mr-4`}
          aria-label={
            isRecording ? "Recording in progress" : "Start voice input"
          }
        >
          <Mic aria-hidden="true" />
        </button>
        {userInput.message && (
          <button
            type="submit"
            className={` rounded-full min-h-10 min-w-10 bg-cover drop-shadow-xl opacity-90`}
            style={{ background: "var(--yellow-gradient)" }}
            aria-label="Send message"
          >
            <ArrowUpward aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );

  // Determine which content to render
  const renderFormContent = () => {
    if (isRecording) return renderRecordingState();
    if (isTranscribing) return renderTranscribingState();
    return renderInputState();
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={ModalVariants(20)}
        animate="visible"
        initial="hidden"
        className="p-px rounded-2xl w-full"
        style={{ background: "var(--purple-gradient)" }}
      >
        <form
          autoComplete="off"
          onSubmit={(e: OnSubmitType) => handleSubmit(e)}
          className="w-full min-h-[20dvh] z-20 flex flex-col items-center justify-end bg-cover bg-no-repeat rounded-2xl"
          style={{ backgroundImage: "url(/user-buble-bg.png)" }}
          aria-label="Chat input form"
        >
          {renderFormContent()}

          <div className="w-full bg-[var(--neutral-500)] py-3 px-4 rounded-b-2xl shadow-2xl">
            <p
              id="input-helper"
              className="text-xs md:text-sm text-white/60 text-center"
              aria-live="polite"
            >
              VCTR can make mistakes, try to ask concise and precise questions
              for a better experience❤️!
              {!userInput.isValid && (
                <span className="sr-only">
                  Error: Message can't be blank. Please enter a valid question.
                </span>
              )}
            </p>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};
