import { useContext, createContext, Dispatch, SetStateAction } from "react";

type ContextTypes = {
  userModuleState?: boolean;
  setModuleState?: Dispatch<SetStateAction<boolean>>;
};

export const Context = createContext<ContextTypes | undefined>(undefined);

export const useMyContext = () => useContext(Context);
