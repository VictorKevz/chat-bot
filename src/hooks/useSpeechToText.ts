import { useState, useCallback, useRef, useEffect } from "react";
import {
  UseSpeechToTextReturn,
  SpeechToTextError,
} from "../types/speechToText";

export const useSpeechToText = (): UseSpeechToTextReturn => {
  const [transcript, setTranscript] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [error, setError] = useState<SpeechToTextError | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const mimeTypeRef = useRef<string>("audio/wav");

  // Check if browser supports MediaRecorder
  const isSupported = typeof MediaRecorder !== "undefined";

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    mediaRecorderRef.current = null;
    chunksRef.current = [];
    mimeTypeRef.current = "audio/wav";
    setIsRecording(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const startRecording = useCallback(async () => {
    if (!isSupported) {
      setError({
        type: "not-supported",
        message: "MediaRecorder is not supported in this browser",
      });
      return;
    }

    try {
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported("audio/wav")
        ? "audio/wav"
        : "audio/webm";

      mimeTypeRef.current = mimeType;

      // Set up MediaRecorder with WAV format
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: mimeType,
      });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        try {
          const audioBlob = new Blob(chunksRef.current, {
            type: mimeTypeRef.current,
          });

          // Convert to base64 for API
          const reader = new FileReader();
          reader.onloadend = async () => {
            try {
              setIsTranscribing(true);
              const base64Audio = (reader.result as string).split(",")[1];

              const response = await fetch("/api/transcribe", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  action: "transcribe",
                  audioData: base64Audio,
                  mimeType: mimeTypeRef.current,
                }),
              });

              const result = await response.json();

              if (!response.ok) {
                console.error("HTTP Error:", response.status, result);
                throw new Error(
                  `HTTP ${response.status}: ${result.error || "Unknown error"}`
                );
              }

              if (result.success && result.transcript) {
                setTranscript(result.transcript);
                setIsTranscribing(false);
              } else {
                console.error("Transcription failed:", result);
                setIsTranscribing(false);
                throw new Error(result.error || "Transcription failed");
              }
            } catch (transcriptionError) {
              console.error("Transcription error:", transcriptionError);
              setIsTranscribing(false);
              setError({
                type: "network",
                message: "Failed to transcribe audio",
              });
            }
          };

          reader.readAsDataURL(audioBlob);
        } catch (blobError) {
          console.error("Audio processing error:", blobError);
          setError({
            type: "network",
            message: "Failed to process audio",
          });
        }
      };

      setIsRecording(true);
      setError(null);
      setTranscript("");

      // Start recording
      mediaRecorder.start();
    } catch (err) {
      console.error("Recording start error:", err);
      setError({
        type: "permission",
        message: "Microphone access denied",
      });
    }
  }, [isSupported]);

  const stopRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsRecording(false);
  }, []);

  const cancelRecording = useCallback(() => {
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
  };
};
