import { createContext, useContext, useRef, useState } from "react";
import {
  AlertContextType,
  AlertproviderProps,
  AlertState,
  InitialAlertState,
} from "../types/alert";

// eslint-disable-next-line react-refresh/only-export-components
export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export const AlertProvider = ({ children }: AlertproviderProps) => {
  const [alert, setAlert] = useState<AlertState>(InitialAlertState);
  const alertTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAlert = (update: AlertState, timeOut: number = 3500) => {
    // 1. Show the new alert message (success or error)
    setAlert(update);

    // 2. If a previous alert is still active, cancel its timeout
    if (alertTimeout.current) clearTimeout(alertTimeout.current);

    // 3. Start a new timeout to hide the alert after 3 seconds
    alertTimeout.current = setTimeout(() => {
      setAlert(InitialAlertState);
    }, timeOut);
  };
  return (
    <AlertContext.Provider value={{ alert, onShowAlert: handleAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAlertProvider = () => {
  const context = useContext(AlertContext);
  if (!context)
    throw new Error("useAlertProvider must be used within AlertProvider!");
  return context;
};
