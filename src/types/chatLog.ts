import { ProjectItem } from "./projects";

export type ChatPair = {
  role: "user" | "assistant";
  content: string;
  projectsData?: ProjectItem[]; // Optional projects data for assistant messages
};
// ....................SEARCH BAR TYPES....................
export type OnChangeType = React.ChangeEvent<HTMLTextAreaElement>;
export type OnSubmitType = React.FormEvent<HTMLFormElement>;

export type UserInputState = {
  message: string;
  isValid: boolean;
};

export type SearchBarProps = {
  submitPrompt: (message: string) => Promise<string | undefined>;
  userInput: UserInputState;
  setUserInput: React.Dispatch<React.SetStateAction<UserInputState>>;
};
// ....................CHAT BUBBLE TYPES....................

export type ChatBubbleProps = {
  data: ChatPair;
  loading: boolean;
};

export type FAQsProps = {
  onCloseFAQs: () => void;
  onUpdate: (message: string, category: string) => void;
};
