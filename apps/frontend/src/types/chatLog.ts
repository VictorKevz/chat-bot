export type ChatPair = {
  role: "user" | "ai";
  content: string;
};
// ....................SEARCH BAR TYPES....................
export type OnChangeType = React.ChangeEvent<HTMLInputElement>;
export type OnSubmitType = React.FormEvent<HTMLFormElement>;

export type UserInputState = {
  message: string;
  isValid: boolean;
};

export type SearchBarProps = {
  submitPrompt: (message: string) => Promise<string | undefined>;
};
// ....................CHAT BUBBLE TYPES....................

export type ChatBubbleProps = {
  data: ChatPair;
};
