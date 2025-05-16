import { createContext, Dispatch, SetStateAction } from "react";

export type step = "home" | "form" | "collage";

export interface UsernameContextProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  formLast30Days: boolean;
  setFormLast30Days: Dispatch<SetStateAction<boolean>>;
}

export interface ModalContextProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export interface SetpContextProps {
  step: step;
  setStep: Dispatch<SetStateAction<step>>;
}

export interface CollageContextProps {
    base64Image: string;
    setBase64Image: Dispatch<SetStateAction<string>>
}

export const UsernameContext = createContext<UsernameContextProps | null>(null);
export const MoviesLast30Days = createContext<boolean>(false);
export const ModalContext = createContext<ModalContextProps | null>(null);
export const StepContext = createContext<SetpContextProps | null>(null);
export const CollageContext = createContext<CollageContextProps | undefined>(undefined);

