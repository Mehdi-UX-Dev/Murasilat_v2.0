import { useContext, createContext, Dispatch, SetStateAction } from "react";

export type CredentialsType = {
  credentials?: { [key: string]: string };
  setCredentials: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;
  handleSubmit : React.FormEventHandler<HTMLFormElement> ;
  errorState : {inputState : 'Default' | 'ErrorState' , msg : string, status : boolean}
};


export const Credentials = createContext<CredentialsType | undefined>(
  undefined
);

export const useCredentialsContext = () => useContext(Credentials);
