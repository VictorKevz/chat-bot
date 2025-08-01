import { Alert } from "@mui/material";
import { useAlertProvider } from "../context/AlertContext";
import { AnimatePresence, motion } from "framer-motion";
import { AlertVariants } from "../variants";

export const AlertMessage = () => {
  const { alert } = useAlertProvider();
  return (
    <AnimatePresence>
      {alert.visible && (
        <motion.div
          variants={AlertVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed w-full flex items-center justify-center top-[6rem] z-999 px-4"
        >
          <Alert
            variant="filled"
            severity={alert.type}
            className="max-w-md w-full shadow-2xl"
          >
            {alert.message}
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
