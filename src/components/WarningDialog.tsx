import { motion } from "framer-motion";
import { ModalVariants } from "../variants";
import { Close, Delete } from "@mui/icons-material";
import FocusTrap from "@mui/material/Unstable_TrapFocus";
type WarningDialogProps = {
  onDelete: () => void;
  onCancel: () => void;
};
export const WarningDialog = ({ onDelete, onCancel }: WarningDialogProps) => {
  return (
    <div className="w-full h-dvh fixed left-0 top-0 flex flex-col items-center justify-center gap-10 bg-[#0e0e0dcb] backdrop-blur-[.4rem] z-100 px-4 py-6 overflow-auto custom-scrollbar">
      <FocusTrap open>
        <motion.dialog
          variants={ModalVariants(50)}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="max-w-screen-sm w-full relative flex flex-col items-center gap-5 m-0 bg-transparent border border-[var(--border)] rounded-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="warning-dialog-title"
          aria-describedby="warning-dialog-desc"
        >
          <header className="w-full relative rounded-t-xl bg-[var(--neutral-100)] px-5 py-6 overflow-hidden">
            <div className="flex items-center gap-2.5 mt-3 sm:mt-0">
              <span className="w-12 h-12 flex items-center justify-center bg-[var(--neutral-800)] rounded-lg">
                <Delete aria-hidden="true" />
              </span>
              <div>
                <h3
                  id="warning-dialog-title"
                  className="text-xl sm:text-2xl text-white"
                >
                  Confirm chat deletion
                </h3>
                <p className="text-white/90 text-sm sm:text-base">
                  Clear chat history
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onCancel}
              className="absolute right-0 top-0 text-[var(--neutral-0)] bg-[var(--neutral-800)] p-1 rounded-bl-lg hover:scale-115"
              aria-label="Close dialog"
            >
              <span className="sr-only">Close dialog</span>
              <Close fontSize="medium" aria-hidden="true" />
            </button>
          </header>
          <div className="w-full px-5">
            <p
              id="warning-dialog-desc"
              className="text-sm sm:text-lg text-white/90"
            >
              Are you sure you want clear the whole chat history? This action is
              irreversible, the entire chat will be permanently deleted!
            </p>
          </div>
          <footer className="w-full flex gap-5 text-white px-5 py-6">
            <button
              type="button"
              onClick={onCancel}
              className="h-12 w-full px-4 rounded-lg border border-[var(--neutral-800)] hover:border-transparent hover:bg-[var(--neutral-100)] hover:text-[var(--neutral-1000)] hover:scale-90"
              aria-label="Cancel deletion"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="h-12 w-full bg-[var(--error)] px-4 rounded-lg border border-transparent hover:border-[var(--error)] hover:bg-transparent hover:scale-90"
              aria-label="Confirm delete chat history"
            >
              Delete
            </button>
          </footer>
        </motion.dialog>
      </FocusTrap>
    </div>
  );
};
