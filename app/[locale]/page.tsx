"use client";

import { useState } from "react";
import Header from "@/components/pages/login/loginHeader";
import Card from "@/components/pages/login/loginCard";
import { Credentials } from "@/hooks/credentialsContext";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/i18n-server";
import { baseUrlByLocale } from "@/i18n-server";

type error = {
  inputState: "Default" | "ErrorState";
  msg: string;
  status: boolean;
};

type PageProps = {
  params: { locale: Locale };
};

export default function Home({ params: { locale } }: PageProps) {
  const router = useRouter();
    
  
  const [credentials, setCredentials] = useState<{ [key: string]: string }>({});
  const [errorState, setErrorState] = useState<error>({
    inputState: "Default",
    status: false,
    msg: "",
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

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
        setErrorState({ inputState: "Default", status: false, msg: "" });
      }, 5000);
    }

    router.replace(baseUrlByLocale.en);
  };

  return (
    <Credentials.Provider value={{ setCredentials, handleSubmit, errorState }}>
      <div>
        {/* Header Component */}
        <Header />

        {/* Card and Form */}
        <Card  locale={locale}/>
      </div>
    </Credentials.Provider>
  );
}