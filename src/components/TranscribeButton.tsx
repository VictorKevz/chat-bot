import { Check, Close } from "@mui/icons-material";
import { TranscribeButtonProps } from "../types/speechToText";
import { ScaleLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { ModalVariants } from "../variants";

export const TranscribeButton = ({
  onCancel,
  onSubmit,
  transcript,
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
          <button
            type="button"
            onClick={onCancel}
            className="min-h-10 min-w-10 rounded-full bg-[var(--neutral-800)]"
            aria-label="Cancel voice input"
          >
            <span className="sr-only">Cancel Voice Recording</span>
            <Close aria-hidden="true" />
          </button>
          <div className="flex items-center gap-5">
            <ScaleLoader barCount={13} color="#0cc0df" height={25} width={3} />
            <p
              className="text-white/80 text-base sm:text-lg"
              id="transcribe-status"
              aria-live="polite"
            >
              Listening
            </p>
          </div>
          <button
            type="button"
            onClick={onSubmit}
            className="min-h-10 min-w-10 rounded-full bg-[var(--neutral-1000)]"
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
