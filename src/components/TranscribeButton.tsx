import { Check, Close } from "@mui/icons-material";
import { SpeechButtonProps } from "../types/speechToText";
import { ScaleLoader } from "react-spinners";

export const TranscribeButton = ({
  onCancel,
  onSubmit,
  transcript,
}: SpeechButtonProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-5 mt-6">
      <div className="w-full flex items-center justify-center gap-4 md:gap-12">
        <button
          type="button"
          onClick={onCancel}
          className="min-h-10 min-w-10 rounded-full bg-[var(--neutral-800)]"
        >
          <Close />
        </button>
        <div className="flex items-center gap-5">
          <ScaleLoader barCount={13} color="#0cc0df" height={25} width={3} />
          <p className="text-white/80 text-base sm:text-lg">Listening</p>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          className="min-h-10 min-w-10 rounded-full bg-[var(--neutral-1000)]"
        >
          <Check />
        </button>
      </div>
      <p className="text-white text-lg">
        {transcript.charAt(0).toUpperCase() + transcript.slice(1)}
      </p>
    </div>
  );
};
