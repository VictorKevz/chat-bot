import { Check, Close } from "@mui/icons-material";
import { TranscribeButtonProps } from "../types/speechToText";
import { ScaleLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { ModalVariants } from "../variants";

export const TranscribeButton = ({
  onCancel,
  onSubmit,
  transcript,
  remainingTime,
}: TranscribeButtonProps) => {
  return (
    <AnimatePresence>
      <motion.div
        variants={ModalVariants(-20)}
        animate="visible"
        initial="hidden"
        className="w-full flex flex-col items-center gap-5 mt-6"
      >
        <div className="w-full flex items-center justify-center gap-4 md:gap-12">
          <span
            className="text-xs text-white/90 font-bold bg-[var(--error)] rounded-full h-7 w-7 flex items-center justify-center md:ml-4"
            aria-live="polite"
            aria-atomic="true"
          >
            {remainingTime !== undefined ? `${remainingTime}s` : ""}
          </span>
          <button
            type="button"
            onClick={onCancel}
            className="min-h-8 min-w-8 sm:w-10 sm:h-10 rounded-full bg-[var(--neutral-800)]"
            aria-label="Cancel voice input"
          >
            <span className="sr-only">Cancel Voice Recording</span>
            <Close aria-hidden="true" />
          </button>
          <div className="flex items-center gap-5">
            <ScaleLoader barCount={10} color="#0cc0df" height={25} width={2} />
            <p
              className="text-white/80 text-sm sm:text-lg"
              id="transcribe-status"
              aria-live="polite"
            >
              Listening
            </p>
          </div>
          <button
            type="button"
            onClick={onSubmit}
            className="min-h-8 min-w-8 sm:w-10 sm:h-10 rounded-full bg-[var(--neutral-1000)]"
            aria-label="Submit transcript"
          >
            <span className="sr-only">Submit</span>
            <Check aria-hidden="true" />
          </button>
        </div>
        <p className="text-white text-lg" role="status" aria-live="polite">
          {transcript.charAt(0).toUpperCase() + transcript.slice(1)}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};
