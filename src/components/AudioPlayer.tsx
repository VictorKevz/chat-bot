import { PlayCircle, PauseCircle } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import { Loader } from "../loaders/Loaders";
import { ClipLoader } from "react-spinners";

export const AudioPlayer = ({ text }: { text: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { getAudio, data: audioData, loading } = useTextToSpeech();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleButtonClick = async () => {
    if (!audioData) {
      await getAudio(text);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.playbackRate = 1.2;
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
