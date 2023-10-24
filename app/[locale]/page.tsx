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
'use client';
import Header from '@/components/UI_Organisms/login_page/loginHeader';
import Login from '@/components/UI_Organisms/login_page/login';
import { getDictionary } from '@/i18n-server';
import AltLogin from '@/components/UI_Organisms/login_page/altLogin';
import { langProps_LOGIN, localeProps } from '@/universalTypes';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/context/hooks';
import LoadingIndicator from '@/components/suspenseOrganisms/LoadingIndicator';
import Redirect from '@/components/misc/Redirect';

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
      <Header />
      {lang ? (
        user ? (
          tokenExpired ? (
            <AltLogin {...lang} />
          ) : (
            <Redirect to="/dashboard" />
          )
        ) : (
          <Login {...lang} />
        )
      ) : (
        <LoadingIndicator text="لطفاً صبر کنید" />
      )}
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
