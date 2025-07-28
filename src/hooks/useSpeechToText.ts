import { useState, useCallback } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { UseSpeechToTextReturn, SpeechToTextError } from "../types/speech";

export const useSpeechToText = (
  language: string = "en-US"
): UseSpeechToTextReturn => {
  const [error, setError] = useState<SpeechToTextError | null>(null);

  const {
    transcript,
    listening,
    resetTranscript: resetSpeechTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Check browser support
  const isSupported = browserSupportsSpeechRecognition;

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const cancelRecording = useCallback(() => {
    // Stop speech recognition first
    SpeechRecognition.abortListening();

    // Then clean up state
    resetSpeechTranscript();
    setError(null);
  }, [resetSpeechTranscript]);

  const startRecording = useCallback(async () => {
    if (!isSupported) {
      setError({
        type: "not-supported",
        message: "Speech recognition is not supported in this browser",
      });
      return;
    }

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Clear any previous errors and transcript
      setError(null);
      resetSpeechTranscript();

      // Start listening
      SpeechRecognition.startListening({
        continuous: true,
        language: language,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError({
        type: "permission",
        message: "Microphone access denied or not available",
      });
    }
  }, [isSupported, language, resetSpeechTranscript]);

  const stopRecording = useCallback(() => {
    console.log("stopRecording called, listening:", listening);

    // Stop speech recognition first
    SpeechRecognition.abortListening();

    console.log("stopRecording completed");
  }, [listening]);

  return {
    // State
    transcript,
    isRecording: listening,
    error,
    isSupported,

    // Actions
    startRecording,
    stopRecording,
    cancelRecording,
    clearError,
  };
};
