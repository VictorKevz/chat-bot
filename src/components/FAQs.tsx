import {
  Close,
  KeyboardArrowRight,
  WorkOutline,
  SchoolOutlined,
  CodeOutlined,
  Celebration,
  Add,
} from "@mui/icons-material";
import { motion } from "framer-motion";

import { FAQsProps } from "../types/chatLog";
import { useState } from "react";
import { ModalVariants } from "../variants";

export const FAQs = ({ onCloseFAQs, onUpdate }: FAQsProps) => {
  const [categories, setCategories] = useState(["Projects"]);

  const updateCategories = (category: string) => {
    setCategories((prev) => {
      const exists = prev.some((c: string) => c === category);

      if (exists) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
  };
  const faqsData = [
    {
      title: "Projects",
      icon: <CodeOutlined />,
      questions: [
        "What are some of Victor's personal projects?",
        "Can I see his portfolio?",
        "What tech stack does he use for his projects?",
        "Which project is he most proud of?",
        "How does he come up with project ideas?",
      ],
    },
    {
      title: "Experience",
      icon: <WorkOutline />,
      questions: [
        "Tell me about Victor's work experience.",
        "What was his most challenging project?",
        "What is his role currently?",
        "How many years of experience does he have?",
        "What kind of teams has he worked with?",
      ],
    },
    {
      title: "Education",
      icon: <SchoolOutlined />,
      questions: [
        "Where did Victor study?",
        "What was his major?",
        "What was his graduation year?",
        "Any relevant certifications?",
      ],
    },

    {
      title: "Personal",
      icon: <Celebration />,
      questions: [
        "What does Victor do for fun?",
        "How can I contact Victor?",
        "What are his hobbies and interests?",
        "Does he have any pets?",
      ],
    },
  ];
  const isEmpty = categories.length === 0;
  return (
    <div className="w-full h-dvh fixed top-0 flex flex-col items-center justify-end gap-10 bg-[#0000003b] backdrop-blur-[.2rem] z-50">
      <button
        type="button"
        onClick={onCloseFAQs}
        className={`bg-white rounded-full w-12 h-12 absolute ${
          isEmpty ? "top-[20dvh]" : "top-[10dvh]"
        }`}
      >
        <Close fontSize="large" />
      </button>
      <motion.div
        variants={ModalVariants(50)}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`relative mx-auto bg-[var(--neutral-0)] border-t border-[var(--border)] ${
          isEmpty ? "h-fit" : "h-[calc(100dvh-20dvh)]"
        }  w-full flex flex-col items-center justify-between px-4 py-8 rounded-t-[2rem] overflow-auto custom-scrollbar`}
      >
        <h2 className="text-2xl md:text-4xl text-white text-center mb-5">
          Here are some FAQS
        </h2>

        <ul className="max-w-screen-sm w-full flex flex-col gap-5">
          {faqsData.map((faq) => {
            const isOpen = categories.includes(faq.title);
            return (
              <li
                key={faq.title}
                onClick={() => updateCategories(faq.title)}
                className="flex flex-col items-center gap-5 bg-[var(--neutral-300)] py-5 px-4 rounded-xl shadow-2xl cursor-pointer"
              >
                <span className="w-full flex items-center justify-between min-h-fit  text-sm text-[var(--neutral-1000)] sm:text-base">
                  <h3 className="text-xl flex items-center gap-0.5 hover:text-[var(--primary-color)]">
                    {faq.icon}
                    {faq.title}
                  </h3>
                  <button
                    type="button"
                    className="h-8 w-8 rounded-full text-[var(--neutral-0)]"
                    style={{ background: "var(--yellow-gradient)" }}
                  >
                    <Add fontSize="medium" />
                  </button>
                </span>

                {/*....................................... Questions List....................................... */}

                {isOpen && (
                  <ul className="w-full bg-[var(--neutral-0)] py-5 px-4 rounded-lg divide-y divide-[var(--border)]">
                    {faq.questions.map((question) => (
                      <li
                        key={question}
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdate(question);
                        }}
                        className="w-full flex items-start justify-between py-3 cursor-pointer hover:translate-x-2.5 group"
                      >
                        <span className="text-white group-hover:text-[var(--secondary-color)]">
                          {question}
                        </span>
                        <button
                          type="button"
                          className="text-[var(--secondary-color)]"
                        >
                          <KeyboardArrowRight fontSize="medium" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
};
