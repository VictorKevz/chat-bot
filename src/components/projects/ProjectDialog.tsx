import { Close, KeyboardArrowRight } from "@mui/icons-material";
import { ProjectDialogProps } from "../../types/projects";
import { motion } from "framer-motion";
import { ModalVariants } from "../../variants";

export const ProjectDialog = ({ data, onToggle }: ProjectDialogProps) => {
  const {
    title,
    image_urls: images,
    description,
    tech_stack: techStack,
    live_url: live,
    github_url: github,
  } = data;

  const getColor = (i: number) => {
    const colors = ["#0cc0df", "#ffde59d4", "#8c52ff", "#5ce1e6", "#de7474"];
    if (i >= 0 && i < colors.length) {
      return colors[i];
    }
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  const links = [
    { text: "Website", url: live },
    { text: "Github", url: github },
  ];
  return (
    <div className="w-full h-dvh fixed left-0 top-0 bg-cover bg-center flex flex-col items-center justify-start gap-10 bg-[#0e0e0dc6] backdrop-blur-[.3rem] z-100 px-4 py-6 overflow-auto custom-scrollbar">
      <motion.dialog
        variants={ModalVariants(50)}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="max-w-screen-xl w-full flex flex-col items-center gap-5 m-0 bg-transparent relative"
      >
        <header className="w-full relative bg-transparent border border-[var(--border)] rounded-xl px-6 py-8 shadow-amber-200/5 shadow-md">
          <h2 className="text-4xl text-white">{title}</h2>
          <p className="text-lg text-white/80 mt-2">{description}</p>
          <button
            type="button"
            onClick={() => onToggle()}
            className="h-12 w-12 absolute right-6 top-6 2xl:fixed bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full"
          >
            <Close />
          </button>
        </header>
        <div className="w-full px-6 py-8 bg-[var(--neutral-100)] rounded-xl shadow-xl">
          <h3 className="text-3xl text-white">Tech Stack</h3>
          <ul className="w-full flex items-center gap-4 mt-4 flex-wrap">
            {techStack.map((item, i) => {
              const color = getColor(i);
              return (
                <li
                  key={item}
                  style={{ backgroundColor: `${color}` }}
                  className={`px-4 h-10 flex items-center font-medium text-[var(--neutral-0)] rounded-xl`}
                >
                  {item}
                </li>
              );
            })}
          </ul>
          <ul className="w-full flex flex-col gap-3 mt-6 py-5 border-t border-[#ffffff38]">
            <li>
              <h3 className="text-white text-2xl">Links</h3>
            </li>
            {links.map((link) => {
              return (
                <li key={link.text}>
                  <a
                    href={link.url}
                    className="w-full flex items-center justify-between px-5 text-white/90 gap-5 bg-[var(--neutral-0)] h-12 rounded-xl"
                  >
                    {link.text}
                    <span className="text-[var(--secondary-color)] scale-110">
                      <KeyboardArrowRight />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-full bg-transparent border border-[var(--border)] rounded-xl px-6 py-8 shadow-amber-200/5 shadow-md">
          <h2 className="text-4xl text-white">Image Gallery</h2>
          <ul className="w-full grid lg:grid-cols-3 gap-8 mt-6">
            {images.map((image, i) => {
              const isFirst = i === 0;

              return (
                <li
                  key={image}
                  className={`w-full rounded-xl min-h-[20rem] bg-top bg-cover shadow-white/20 shadow-2xl lg:last:col-span-3 lg:nth-[3]:col-span-2 ${
                    isFirst && "lg:col-span-2"
                  }`}
                  style={{ backgroundImage: `url(${image})` }}
                ></li>
              );
            })}
          </ul>
        </div>
      </motion.dialog>
    </div>
  );
};
