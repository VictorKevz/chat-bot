import { Close } from "@mui/icons-material";

export const FAQs = () => {
  const faqs = [
    "What does Victor do?",
    "Tell me about Victor's work experience.",
    "Where is Victor located?",
    "What tech stack does victor use?",
    "How can I contact Victor?",
    "What does Victor do for fun?",
  ];
  return (
    <div className="w-full h-dvh fixed top-0 flex flex-col items-center justify-end gap-10 bg-[#0006] backdrop-blur-[.4rem] z-50">
      <dialog className="mx-auto bg-[var(--neutral-0)] border-t border-[var(--border)] min-h-[20vw] w-full flex flex-col items-center justify-center px-4 rounded-t-[2rem] relative">
        <ul className="max-w-screen-sm w-full flex flex-col">
          <li>
            <h2>Here are some FAQS</h2>
          </li>
          {faqs.map((faq) => {
            return (
              <li key={faq} className="flex items-center justify-between gap-5">
                <span className="">{faq}</span>
                <button type="button">Ask</button>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className="bg-white rounded-full w-12 h-12 absolute -top-[5rem]"
        >
          <Close fontSize="large" />
        </button>
      </dialog>
    </div>
  );
};
