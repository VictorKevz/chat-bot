import { Variants } from "framer-motion";

export const ModalVariants = (i: number): Variants => ({
  hidden: { y: i, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "tween" as const,
      ease: "easeInOut",
      duration: 0.6,
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
