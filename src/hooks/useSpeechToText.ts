import { useState, useCallback, useRef, useEffect } from "react";
import {
  UseSpeechToTextReturn,
  SpeechToTextError,
} from "../types/speechToText";
import { useAlertProvider } from "../context/AlertContext";

export const useSpeechToText = (): UseSpeechToTextReturn => {
  const [transcript, setTranscript] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [error, setError] = useState<SpeechToTextError | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(29);

  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const mimeTypeRef = useRef<string>("audio/wav");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const shouldTranscribeRef = useRef<boolean>(true);

  const { onShowAlert } = useAlertProvider();
  const isSupported = typeof MediaRecorder !== "undefined";

  const clearError = useCallback(() => setError(null), []);

  const cleanup = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    mediaRecorderRef.current?.state !== "inactive" &&
      mediaRecorderRef.current?.stop();

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    timeoutRef.current = null;
    intervalRef.current = null;

    mediaRecorderRef.current = null;
    chunksRef.current = [];
    mimeTypeRef.current = "audio/wav";
    setIsRecording(false);
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const handleTranscription = useCallback(
    async (audioBlob: Blob) => {
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(",")[1];
          setIsTranscribing(true);

          try {
            const response = await fetch("/api/transcribe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                action: "transcribe",
                audioData: base64Audio,
                mimeType: mimeTypeRef.current,
              }),
            });

            const result = await response.json();
            if (!response.ok || !result.success || !result.transcript) {
              throw new Error(result.error || "Transcription failed");
            }

            setTranscript(result.transcript);
          } catch (err) {
            console.error("Transcription failed:", err);
            setError({
              type: "network",
              message: `Failed to transcribe audio.`,
            });
            onShowAlert(
              {
                message: `Failed to transcribe audio. Please try again later.`,
                type: "error",
                visible: true,
              },
              3800
            );
          } finally {
            setIsTranscribing(false);
          }
        };
        reader.readAsDataURL(audioBlob);
      } catch (err) {
        console.error("Audio processing error:", err);
        setError({ type: "network", message: "Failed to process audio" });
      }
    },
    [onShowAlert]
  );

  const startRecording = useCallback(async () => {
    if (!isSupported) {
      const msg = "MediaRecorder is not supported in this browser";
      setError({ type: "not-supported", message: msg });
      onShowAlert({ message: msg, type: "error", visible: true });
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported("audio/wav")
        ? "audio/wav"
        : "audio/webm";
      mimeTypeRef.current = mimeType;

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      shouldTranscribeRef.current = true;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const shouldTranscribe = shouldTranscribeRef.current;
        setIsRecording(false);

        const audioBlob = new Blob(chunksRef.current, {
          type: mimeTypeRef.current,
        });

        if (shouldTranscribe) {
          handleTranscription(audioBlob);
        }

        cleanup();
      };

      setIsRecording(true);
      setError(null);
      setTranscript("");
      mediaRecorder.start();
      setRemainingTime(29);

      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            mediaRecorder.stop();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      timeoutRef.current = setTimeout(() => {
        mediaRecorder.stop();
      }, 30000);
    } catch (err) {
      console.error("Recording error:", err);
      setError({ type: "permission", message: "Microphone access denied" });
    }
  }, [cleanup, handleTranscription, isSupported, onShowAlert]);

  const stopRecording = useCallback(() => {
    shouldTranscribeRef.current = true;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    mediaRecorderRef.current?.state === "recording" &&
      mediaRecorderRef.current.stop();
    cleanup();
  }, [cleanup]);

  const cancelRecording = useCallback(() => {
    shouldTranscribeRef.current = false;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    mediaRecorderRef.current?.state === "recording" &&
      mediaRecorderRef.current.stop();
    cleanup();
    setTranscript("");
    setError(null);
  }, [cleanup]);

  return {
    transcript,
    isRecording,
    isTranscribing,
    error,
    isSupported,
    startRecording,
    stopRecording,
    cancelRecording,
    clearError,
    remainingTime,
  };
};
