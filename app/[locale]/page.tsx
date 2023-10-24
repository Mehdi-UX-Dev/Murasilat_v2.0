"use client";

const Header = React.lazy(
  () => import("@/components/UI_Organisms/login_page/loginHeader")
);
const Login = React.lazy(
  () => import("../../components/UI_Organisms/login_page/login")
);

const AltLogin = React.lazy(
  () => import("@/components/UI_Organisms/login_page/altLogin")
);
import { getDictionary } from "@/i18n-server";
import { langProps_LOGIN, localeProps } from "@/universalTypes";
import React, { Suspense, useEffect, useState } from "react";
import { useAppSelector } from "@/context/hooks";
import LoginSuspense from "@/components/suspenseOrganisms/login";

function Home({ params: { locale } }: localeProps) {
  const [lang, setLang] = useState<langProps_LOGIN>();
  const { user } = useAppSelector((store) => store.user);

  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).login;
      setLang(res);
    })();
  }, [locale]);

  return (
    <div>
      <Suspense fallback={<LoginSuspense />}>
        {lang && (
          <>
            <Header />
            {user ? <AltLogin {...lang} /> : <Login {...lang} />}
          </>
        )}
      </Suspense>
    </div>
  );
}

export default Home;
