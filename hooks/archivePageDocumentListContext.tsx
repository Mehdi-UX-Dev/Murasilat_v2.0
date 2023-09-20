import { useContext, createContext, Dispatch, SetStateAction } from "react";

type ContextTypes = {
  Data: {};
  setData: Dispatch<SetStateAction<{}>>;
};

export const DocumentListContext = createContext<ContextTypes | undefined>(
  undefined
);

export const useDocumentListContext = () => useContext(DocumentListContext);
