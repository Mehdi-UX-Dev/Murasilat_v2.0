"use client";

import { useState } from "react";
import Header from "@/components/login/loginHeader";
import Card from "@/components/login/loginCard";
import { Credentials } from "@/hooks/credentialsContext";
import { useRouter } from "next/navigation";

type error = {
  inputState: "Default" | "ErrorState";
  msg: string;
  status: boolean;
};

export default function Home() {
  const router = useRouter();

  const [credentials, setCredentials] = useState<{ [key: string]: string }>({});
  const [errorState, setErrorState] = useState<error>({
    inputState: "Default",
    status: false,
    msg: "",
  });

  //* i am in doubt to have lang change property in the login page
  // const [langSettingVisible, setLangeSettingVisible] = useState(false);
  // const handleLangChange = () => {
  //   setLangeSettingVisible(!langSettingVisible);
  // };
  // const chooseLang = (lang: string) => {};

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    // router.push('/dashboard')

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/login`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true.toString(),
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: credentials.username,
            password: credentials.password,
          }),
        }
      );

      const nextRes = await res.json();

      if (nextRes.success) {
        window.localStorage.setItem("token", nextRes.token);
      } else {
        throw new Error(nextRes.message);
      }
    } catch (e: any) {
      setErrorState({ inputState: "ErrorState", status: true, msg: e });
      setTimeout(() => {
        setErrorState({ inputState: "Default", status: false, msg: '' });
      }, 5000);
    }
  };

  return (
    <Credentials.Provider value={{ setCredentials, handleSubmit, errorState }}>
      <div>
        {/* Header Component */}
        <Header />

        {/* Card and Form */}
        <Card />
      </div>
    </Credentials.Provider>
  );
}
