import { Variants, easeInOut } from "framer-motion";

export const ModalVariants = (i: number): Variants => ({
  hidden: { y: i, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "tween" as const,
      ease: "easeInOut",
      duration: 0.5,
    },
  },
  exit: {
    y: i,
    opacity: 0,
    transition: {
      type: "tween" as const,
      delay: 0,
      ease: "easeInOut",
      duration: 0.5,
    },
  },
});

export const AlertVariants = {
  hidden: { y: "-100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 200,
      bounce: 0.5,
    },
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 200,
      bounce: 0.5,
      duration: 0.5,
    },
  },
};

export const SliderVariants = (direction: "left" | "right") => ({
  hidden: { opacity: 0.9, x: direction === "left" ? -50 : 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "tween" as const, ease: easeInOut, duration: 0.5 },
  },
  exit: {
    opacity: 0,
    x: direction === "left" ? 100 : -100,
    transition: { duration: 0.5, type: "tween" as const, ease: easeInOut },
  },
});
