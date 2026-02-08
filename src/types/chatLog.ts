import { ProjectItem } from "./projects";

export type ChatPair = {
  role: "user" | "assistant";
  content: string;
  projectsData?: ProjectItem[];
  projectPaging?: ProjectPaging;
  uiActions?: ChatUiAction[];
};
// ....................SEARCH BAR TYPES....................
export type OnChangeType = React.ChangeEvent<HTMLTextAreaElement>;
export type OnSubmitType = React.FormEvent<HTMLFormElement>;

export type UserInputState = {
  message: string;
  isValid: boolean;
};

export type InputFieldProps = {
  sendChatMessage: (
    message: string,
    category?: string,
    projectsData?: ProjectItem[],
    projectPaging?: ProjectPaging,
  ) => Promise<string | undefined>;
  userInput: UserInputState;
  setUserInput: React.Dispatch<React.SetStateAction<UserInputState>>;
};
// ....................CHAT BUBBLE TYPES....................

export type ChatBubbleProps = {
  data: ChatPair;
  onToggle: (data?: ProjectItem) => void;
  onShowNextProjects?: (paging: ProjectPaging) => void;
};

export type ProjectPaging = {
  offset: number;
  limit: number;
  total: number;
  hasMore: boolean;
};

export type ChatUiAction = {
  type: "show_projects";
  items: ProjectItem[];
  paging: ProjectPaging;
};

export type FAQsProps = {
  onCloseFAQs: () => void;
  onUpdate: (message: string, category: string) => void;
};
