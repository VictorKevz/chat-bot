import {
  WorkOutline,
  SchoolOutlined,
  CodeOutlined,
  Celebration,
} from "@mui/icons-material";
import { faqIntents } from "./faqIntents";

const categoryIcons: Record<string, typeof CodeOutlined> = {
  projects: CodeOutlined,
  experience: WorkOutline,
  education: SchoolOutlined,
  personal: Celebration,
};

export const faqsData = faqIntents.map((item) => ({
  ...item,
  icon: categoryIcons[item.category],
}));
