import {
  WorkOutline,
  SchoolOutlined,
  CodeOutlined,
  Celebration,
} from "@mui/icons-material";

export const faqsData = [
  {
    title: "Projects",
    icon: CodeOutlined,
    questions: [
      {
        question: "What are some of Victor's personal projects?",
        tags: ["projects", "portfolio"],
      },
      {
        question: "Where can I see his portfolio?",
        tags: ["projects", "portfolio"],
      },
      {
        question: "What tech stack does he use for his projects?",
        tags: ["projects", "tech stack"],
      },
      {
        question: "Which project is he most proud of?",
        tags: ["projects", "highlight"],
      },
      {
        question: "How does he come up with project ideas?",
        tags: ["projects", "creativity"],
      },
    ],
  },
  {
    title: "Experience",
    icon: WorkOutline,
    questions: [
      {
        question: "Tell me about Victor's work experience.",
        tags: ["experience", "career"],
      },
      {
        question: "What was his most challenging project?",
        tags: ["experience", "projects"],
      },
      {
        question: "What is his role currently?",
        tags: ["experience", "current role"],
      },
      {
        question: "How many years of experience does he have?",
        tags: ["experience", "timeline"],
      },
      {
        question: "What kind of teams has he worked with?",
        tags: ["experience", "collaboration"],
      },
    ],
  },
  {
    title: "Education",
    icon: SchoolOutlined,
    questions: [
      {
        question: "Where did Victor study?",
        tags: ["education", "university"],
      },
      {
        question: "What was his major?",
        tags: ["education", "degree"],
      },
      {
        question: "What was his graduation year?",
        tags: ["education", "timeline"],
      },
      {
        question: "Any relevant certifications?",
        tags: ["education", "certifications"],
      },
    ],
  },
  {
    title: "Personal",
    icon: Celebration,
    questions: [
      {
        question: "What does Victor do for fun?",
        tags: ["personal", "hobbies"],
      },
      {
        question: "How can I contact Victor?",
        tags: ["personal", "contact"],
      },
      {
        question: "What are his hobbies and interests?",
        tags: ["personal", "interests"],
      },
      {
        question: "Does he have any pets?",
        tags: ["personal", "fun facts"],
      },
    ],
  },
];
