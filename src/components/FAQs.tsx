import { Close, KeyboardArrowRight, Add, Remove } from "@mui/icons-material";
import { motion } from "framer-motion";

import { FAQsProps } from "../types/chatLog";
import { useState } from "react";
import { ModalVariants } from "../variants";
import { faqsData } from "../data/faqsData";
import FocusTrap from "@mui/material/Unstable_TrapFocus";

export const FAQs = ({ onCloseFAQs, onUpdate }: FAQsProps) => {
  const [categories, setCategories] = useState<string[]>(() => {
    const faqs = localStorage.getItem("faqs");
    return faqs ? JSON.parse(faqs) : [];
  });

  const updateCategories = (category: string) => {
    setCategories((prev) => {
      const exists = prev.some((c: string) => c === category);

      let newCategories;
      if (exists) {
        newCategories = prev.filter((c) => c !== category);
      } else {
        newCategories = [...prev, category];
      }

      // Save to localStorage
      localStorage.setItem("faqs", JSON.stringify(newCategories));
      return newCategories;
    });
  };

  const isEmpty = categories.length === 0;
  return (
    <div className="w-full h-dvh fixed top-0 flex flex-col items-center justify-end gap-10 bg-[#0000003b] backdrop-blur-[.2rem] z-50 overflow-auto">
      <FocusTrap open>
        <motion.dialog
          variants={ModalVariants(50)}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-labelledby="faqs-title"
          aria-describedby="faqs-desc"
          className={`relative bg-[var(--neutral-0)] border-t border-[var(--border)] ${
            isEmpty
              ? "h-fit"
              : "lg:h-[calc(100dvh-20dvh)] 2xl:h-[calc(100dvh-40dvh)]"
          }  w-full flex flex-col items-center justify-between px-4 pb-8 rounded-t-[2rem] overflow-auto custom-scrollbar`}
        >
          <header className="w-full relative py-5">
            <h2
              id="faqs-title"
              className="text-2xl md:text-4xl text-white text-center mt-10 sm:mt-4"
            >
              Here are some FAQS
            </h2>
            <button
              type="button"
              onClick={onCloseFAQs}
              className={`bg-white absolute rounded-xl w-12 h-12 scale-65 top-3 right-0 `}
              aria-label="Close FAQs dialog"
            >
              <span className="sr-only">Close FAQs dialog</span>
              <Close fontSize="large" aria-hidden="true" />
            </button>
          </header>

          <ul
            className="max-w-screen-2xl w-full grid md:grid-cols-2 2xl:grid-cols-3 gap-5"
            id="faqs-desc"
          >
            {faqsData.map((faq, idx) => {
              const isOpen = categories.includes(faq.title);
              return (
                <li
                  key={faq.title}
                  className="flex flex-col items-center gap-5 bg-[var(--neutral-300)] py-5 px-4 rounded-xl shadow-xl cursor-pointer"
                >
                  <span className="w-full flex items-center justify-between min-h-fit  text-sm text-[var(--neutral-1000)] sm:text-base">
                    <h3 className="text-xl flex items-center gap-0.5 hover:text-[var(--primary-color)]">
                      <faq.icon aria-hidden="true" />
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
                      aria-label={
                        isOpen ? `Collapse ${faq.title}` : `Expand ${faq.title}`
                      }
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${idx}`}
                      onClick={() => updateCategories(faq.title)}
                    >
                      <span className="sr-only">
                        {isOpen
                          ? `Collapse ${faq.title}`
                          : `Expand ${faq.title}`}
                      </span>
                      {isOpen ? (
                        <Remove aria-hidden="true" />
                      ) : (
                        <Add fontSize="medium" aria-hidden="true" />
                      )}
                    </button>
                  </span>

                  {/*....................................... Questions List....................................... */}
                  {isOpen && (
                    <ul
                      className="w-full bg-[var(--neutral-0)] py-5 px-4 rounded-lg divide-y divide-[var(--border)]"
                      id={`faq-panel-${idx}`}
                      aria-label={`${faq.title} questions`}
                    >
                      {faq.questions.map((question) => (
                        <li
                          key={question}
                          onClick={() => {
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
                            aria-label={`Select question: ${question}`}
                          >
                            <span className="sr-only">
                              Select question: {question}
                            </span>
                            <KeyboardArrowRight
                              fontSize="medium"
                              aria-hidden="true"
                            />
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
      </FocusTrap>
    </div>
  );
};
