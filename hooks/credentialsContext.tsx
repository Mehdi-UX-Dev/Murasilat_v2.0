import { useContext, createContext, Dispatch, SetStateAction } from "react";

export type ContextTypes = {
  credentials?: { [key: string]: string };
  setCredentials?: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;
  handleSubmit ?: React.FormEventHandler<HTMLFormElement> ;
  errorState? : {inputState : 'Default' | 'ErrorState' , msg : string, status : boolean}
  userModuleState ?: boolean, 
  setModuleState?:  Dispatch<SetStateAction<boolean>>
};


export const Credentials = createContext<ContextTypes | undefined>(
  undefined
);

export const useMyContext = () => useContext(Credentials);
