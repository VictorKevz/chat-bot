import { Close, KeyboardArrowRight, Add, Remove } from "@mui/icons-material";
import { motion } from "framer-motion";

import { FAQsProps } from "../types/chatLog";
import { useState } from "react";
import { ModalVariants } from "../variants";
import { faqsData } from "../data/faqsData";

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

  const isEmpty = categories.length === 0;
  return (
    <div className="w-full h-dvh fixed top-0 flex flex-col items-center justify-end gap-10 bg-[#0000003b] backdrop-blur-[.2rem] z-50">
      <button
        type="button"
        onClick={onCloseFAQs}
        className={`bg-white rounded-full w-12 h-12 absolute ${
          isEmpty ? "top-[20dvh]" : "top-[10dvh] 2xl:top-[30dvh]"
        }`}
      >
        <Close fontSize="large" />
      </button>
      <motion.dialog
        variants={ModalVariants(50)}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`relative bg-[var(--neutral-0)] border-t border-[var(--border)] ${
          isEmpty
            ? "h-fit"
            : "lg:h-[calc(100dvh-20dvh)] 2xl:h-[calc(100dvh-40dvh)]"
        }  w-full flex flex-col items-center justify-between px-4 py-8 rounded-t-[2rem] overflow-auto custom-scrollbar`}
      >
        <h2 className="text-2xl md:text-4xl text-white text-center mb-7">
          Here are some FAQS
        </h2>

        <ul className="max-w-screen-2xl w-full grid md:grid-cols-2 2xl:grid-cols-3 gap-5">
          {faqsData.map((faq) => {
            const isOpen = categories.includes(faq.title);
            return (
              <li
                key={faq.title}
                onClick={() => updateCategories(faq.title)}
                className="flex flex-col items-center gap-5 bg-[var(--neutral-300)] py-5 px-4 rounded-xl shadow-xl cursor-pointer"
              >
                <span className="w-full flex items-center justify-between min-h-fit  text-sm text-[var(--neutral-1000)] sm:text-base">
                  <h3 className="text-xl flex items-center gap-0.5 hover:text-[var(--primary-color)]">
                    <faq.icon />
                    {faq.title}
                  </h3>
                  <button
                    type="button"
                    className="h-8 w-8 rounded-full text-[var(--neutral-0)]"
                    style={{
                      background: `${
                        isOpen
                          ? "var(--purple-gradient)"
                          : "var(--yellow-gradient)"
                      }`,
                    }}
                  >
                    {isOpen ? <Remove /> : <Add fontSize="medium" />}
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
                          onUpdate(question, faq.category);
                        }}
                        className="w-full flex items-start justify-between py-3 cursor-pointer hover:translate-x-2.5 group"
                      >
                        <span className="text-white text-sm lg:text-base group-hover:text-[var(--secondary-color)]">
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
      </motion.dialog>
    </div>
  );
};
