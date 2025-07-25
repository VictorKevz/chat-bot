export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  image_urls: string[];
  features: string[];
  icons: string[];
  tech_stack: string[];
  highlighted: boolean;
  created_at: string;
  live_url: string;
  github_url: string;
  inspiration: string;
};

export const EmptyProjectItem: ProjectItem = {
  id: "",
  title: "",
  description: "",
  image_urls: [],
  features: [],
  icons: [],
  tech_stack: [],
  highlighted: false,
  created_at: "",
  live_url: "",
  github_url: "",
  inspiration: "",
};

export type ProjectPreviewProps = {
  data: ProjectItem;
  onToggle: (data?: ProjectItem) => void;
};

export type ProjectDialogProps = {
  data: ProjectItem;
  onToggle: (data?: ProjectItem) => void;
};
