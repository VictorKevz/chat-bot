import { useRef } from "react";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import { Loader } from "../loaders/Loaders";
import { ClipLoader } from "react-spinners";
import { Error, PauseCircle, PlayCircle, Refresh } from "@mui/icons-material";
import { replaceLinks } from "../utils/replaceText";

export const AudioPlayer = ({
  text,
  isPlaying,
  setIsPlaying,
}: {
  text: string;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const {
    getAudio,
    data: audioData,
    loading,
    error,
    clearError,
  } = useTextToSpeech();

  const handleButtonClick = async () => {
    if (!audioData) {
      const refinedText = replaceLinks(text);
      await getAudio(refinedText);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.playbackRate = 1.1;
          audioRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      }, 300); // Small delay for state update
    } else if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };
  if (error)
    return (
      <div className="flex items-center gap-3 border border-[var(--error)] text-xs text-white py-0.5 px-1.5 rounded-md min-w-max">
        <span className="flex items-center gap-1">
          <Error fontSize="small" />
          Failed!
        </span>
        <button
          type="button"
          onClick={clearError}
          className="bg-[var(--success)] scale-90 p-1 rounded-full"
        >
          <Refresh fontSize="small" />
        </button>
      </div>
    );
  return (
    <div className="flex items-center">
      <audio
        ref={audioRef}
        src={audioData ? `data:audio/wav;base64,${audioData}` : undefined}
        style={{ display: "none" }}
        onEnded={handleEnded}
      />
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={loading}
        className="text-[var(--neutral-800)]"
      >
        {loading ? (
          <Loader LoaderItem={ClipLoader} size={20} color="#ffde59d4" />
        ) : isPlaying ? (
          <PauseCircle className="text-[var(--error)]" />
        ) : (
          <PlayCircle />
        )}
      </button>
    </div>
  );
};
