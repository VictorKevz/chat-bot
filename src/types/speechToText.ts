export type SpeechRecognitionState = "idle" | "recording" | "error";
export interface SpeechToTextError {
  type: "permission" | "not-supported" | "network" | "no-speech" | "general";
  message: string;
}

export interface UseSpeechToTextReturn {
  // State
  transcript: string;
  isRecording: boolean;
  isTranscribing: boolean;
  error: SpeechToTextError | null;
  isSupported: boolean;
  remainingTime: number;

  // Actions
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  cancelRecording: () => void;
  clearError: () => void;
}
export type TranscribeButtonProps = {
  onCancel: () => void;
  transcript: string;
  onSubmit: () => void;
  remainingTime: number;
  // error: SpeechToTextError | null;
  // onClearError: () => void;
};
