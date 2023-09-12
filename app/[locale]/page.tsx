"use client";

import { Suspense, useEffect, useState } from "react";
import { Credentials } from "@/hooks/credentialsContext";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n-config";
import Header from "@/components/UI_Organisms/login_page/loginHeader";
import Card from "@/components/UI_Organisms/login_page/loginCard";
import { getDictionary } from "@/i18n-server";

type error = {
  inputState: "Default" | "ErrorState";
  msg: string;
  status: boolean;
};

type PageProps = {
  params: { locale: Locale };
};

export type langProps = {
  header: string;
  username: string;
  password: string;
  submit: string;
  invalid_credentials: string;
};

function Home({ params: { locale } }: PageProps) {
  const router = useRouter();

  const [credentials, setCredentials] = useState<{ [key: string]: string }>({});
  const [errorState, setErrorState] = useState<error>({
    inputState: "Default",
    status: false,
    msg: "",
  });

  const [lang, setLang] = useState<langProps | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).login;
      setLang(res);
    })();
  }, [locale]);

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
  };

  return (
    <Credentials.Provider value={{ setCredentials, handleSubmit, errorState }}>
      <div>
        {/* Header Component */}
        <Header />
        <Suspense
          fallback={<p className="bg-red-500 h-screen text-2xl">Loading...</p>}
        >
          {/* Card and Form */}
          {lang && <Card lang={lang} />}
        </Suspense>
      </div>
    </Credentials.Provider>
  );
}

export default Home;
