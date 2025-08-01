import { ReactNode } from "react";

export type AlertType = "error" | "success";
export type AlertState = {
  message: string;
  type: AlertType;
  visible: boolean;
};
export interface AlertContextType {
  onShowAlert: (update: AlertState, timeOut?: number) => void;
  alert: AlertState;
}

export const InitialAlertState: AlertState = {
  message: "",
  type: "success",
  visible: false,
};
export type AlertproviderProps = {
  children: ReactNode;
};
