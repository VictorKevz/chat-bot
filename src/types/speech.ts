export type SpeechRecognitionState = "idle" | "recording" | "error";
export interface SpeechToTextError {
  type: "permission" | "not-supported" | "network" | "no-speech" | "general";
  message: string;
}

export interface UseSpeechToTextReturn {
  // State
  transcript: string;
  isRecording: boolean;
  error: SpeechToTextError | null;
  isSupported: boolean;

  // Actions
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  cancelRecording: () => void;
  clearError: () => void;
}
export type SpeechButtonProps = {
  onCancel: () => void;
  transcript: string;
  onSubmit: () => void;
};
