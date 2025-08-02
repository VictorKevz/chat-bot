import {
  ArrowBack,
  ArrowForward,
  CheckCircle,
  Close,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { ProjectDialogProps } from "../../types/projects";
import { motion } from "framer-motion";
import { ModalVariants, SliderVariants } from "../../variants";
import FocusTrap from "@mui/material/Unstable_TrapFocus";
import { useState } from "react";

export const ProjectDialog = ({ data, onToggle }: ProjectDialogProps) => {
  const {
    title,
    image_urls: images,
    description,
    features,
    tech_stack: techStack,
    icons,
    live_url: live,
    github_url: github,
  } = data;
  const [currentIndex, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState<"left" | "right">("left");

  const nextSlide = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setDirection("right");
  };
  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setDirection("left");
  };
  const getColor = (i: number) => {
    const colors = [
      "#0cc0df",
      "#ffde59d4",
      "#875ddb",
      "#5ce1e6",
      "#de7474",
      "#25c578",
    ];
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
    <div className="w-full h-dvh fixed left-0 top-0 bg-cover bg-center flex flex-col items-center justify-start gap-10 bg-[#0e0e0ddc] backdrop-blur-[.4rem] z-100 px-4 py-6 overflow-auto custom-scrollbar">
      <FocusTrap open>
        <motion.dialog
          variants={ModalVariants(50)}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="max-w-screen-xl w-full flex flex-col items-center gap-5 m-0 bg-transparent relative"
        >
          <header className="w-full relative bg-transparent border border-[var(--border)] rounded-xl px-6 py-8 shadow-amber-200/5 shadow-md">
            <h2 className="text-3xl md:text-4xl mt-6 sm:mt-0 text-white">
              {title}
            </h2>
            <p className="text-sm sm:text-lg text-white/80 mt-2 w-[90%]">
              {description}
            </p>
            <button
              type="button"
              onClick={() => onToggle()}
              className="h-12 w-12 absolute right-4 top-4 scale-80 xl:scale-100 2xl:fixed bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl hover:from-[#8c52ff] hover:to-[#5ce1e6] hover:-translate-0.5 hover:scale-105"
            >
              <Close />
            </button>
          </header>
          <div className="w-full px-6 py-8 bg-[var(--neutral-100)] rounded-xl shadow-xl">
            <h3 className="text-3xl text-white">Tech Stack</h3>
            <div className="w-full flex flex-col-reverse md:flex-row items-start justify-between gap-6 mt-4">
              <ul className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-4">
                {techStack.map((item, i) => {
                  const color = getColor(i);
                  return (
                    <li
                      key={item}
                      style={{ backgroundColor: `${color}` }}
                      className={`h-10 flex items-center justify-center font-medium text-[var(--neutral-0)] rounded-lg sm:scale-100`}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
              <ul className="flex w-full justify-between gap-4 sm:w-fit sm:justify-start sm:gap-0">
                {icons.map((icon) => (
                  <li
                    key={icon}
                    className="flex items-center justify-center rounded-xl bg-[var(--neutral-0)] last:bg-white/50 border border-[var(--border)] min-w-10 min-h-10 sm:h-12 sm:w-12 sm:not-first:-ml-4"
                  >
                    <img src={icon} className="w-7 sm:w-8 " alt="" />
                  </li>
                ))}
              </ul>
            </div>
            <ul className="w-full flex flex-col gap-3 mt-6 py-5 border-t border-[#ffffff38]">
              <li>
                <h3 className="text-white text-2xl">Links</h3>
              </li>
              {links.map((link) => {
                return (
                  <li key={link.text}>
                    <a
                      href={link.url}
                      target="_blank"
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
          <div className="w-full flex flex-col xl:flex-row xl:items-start gap-8 justify-between rounded-xl bg-[var(--neutral-0)] border border-[var(--border)] px-6 xl:pl-6 xl:px-0 py-8 shadow-amber-200/5 shadow-md">
            <ul className="w-full xl:w-[50%] flex flex-col">
              <li>
                <h2 className="text-3xl text-white mb-2">Main Features</h2>
              </li>
              {features.map((feature) => (
                <li
                  key={feature}
                  className="text-white/90 not-first:mt-2 flex items-center gap-1 text-sm sm:text-base"
                >
                  <CheckCircle
                    className="rounded-full text-black opacity-80"
                    style={{ background: "var(--yellow-gradient)" }}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <img
              src={images[images.length - 1]}
              className="h-full w-full xl:w-[50%] rounded-xl xl:rounded-l-3xl"
              alt=""
            />
          </div>
          <div className="w-full bg-[var(--neutral-100)] border border-[var(--border)] rounded-xl px-4 py-6 shadow-yellow-200/5 shadow-md overflow-x-hidden">
            <header className="w-full flex items-center justify-between gap-5">
              <h2 className="text-2xl sm:text-3xl text-white">Image Gallery</h2>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-[var(--neutral-800)] bg-gradient-to-r hover:from-[var(--primary-color)] hover:to-[var(--secondary-color)] hover:scale-110 hover:-translate-x-1"
                >
                  <ArrowBack className="scale-80 sm:scale-100" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-[var(--neutral-800)] bg-gradient-to-r hover:from-[var(--primary-color)] hover:to-[var(--secondary-color)] hover:scale-110 hover:translate-x-1"
                >
                  <ArrowForward className="scale-80 sm:scale-100" />
                </button>
              </div>
            </header>
            <motion.figure
              variants={SliderVariants(direction)}
              initial="hidden"
              animate="visible"
              exit="exit"
              key={images[currentIndex]}
              className="w-full mt-6 shadow-yellow-300/10 shadow-2xl rounded-2xl xl:rounded-3xl"
            >
              <img
                src={images[currentIndex]}
                alt=""
                className={`w-full rounded-2xl xl:rounded-3xl min-h-[10rem] sm:min-h-[20rem] md:min-h-[25rem] lg:min-h-[35rem] object-cover`}
              />
            </motion.figure>
          </div>
        </motion.dialog>
      </FocusTrap>
    </div>
  );
};
