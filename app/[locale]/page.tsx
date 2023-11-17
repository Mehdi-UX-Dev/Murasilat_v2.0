"use client";

import React, { useEffect, useState } from "react";

import { getDictionary } from "@/i18n-server";
import { langProps_LOGIN, localeProps } from "@/universalTypes";
import { useAppSelector } from "@/context/hooks";
import LoadingIndicator from "@/components/suspenseOrganisms/LoadingIndicator";
import Redirect from "@/components/misc/Redirect";
import LoginSuspense from "@/components/suspenseOrganisms/login";
import AltLogin from "@/components/UI_Organisms/login_page/altLogin";
import Login from "../../components/UI_Organisms/login_page/login";
import Header from "@/components/UI_Organisms/login_page/loginHeader";

function Home({ params: { locale } }: localeProps) {
  const [lang, setLang] = useState<langProps_LOGIN>();
  const { user } = useAppSelector((store) => store.user);

  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).login;
      setLang(res);
    })();
  }, [locale]);

  const expiryDate = new Date(user?.exp * 1000);
  const tokenExpired = new Date() > expiryDate;

  return (
    <div>
      {lang && <Header />}
      {lang ? (
          user ? (
            tokenExpired ? (
              <AltLogin locale={locale} {...lang} />
            ) : (
              <Redirect to={`/${locale}/dashboard`} />
            )
          ) : (
            <Login locale={locale} {...lang} />
          )
        ) : !tokenExpired ? (
          <LoginSuspense />
        ) : (
          <LoadingIndicator text="لطفاً صبر کنید" />
        )}
    </div>
  );
}

export default Home;
