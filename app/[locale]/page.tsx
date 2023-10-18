'use client';
import Header from '@/components/UI_Organisms/login_page/loginHeader';
import Login from '@/components/UI_Organisms/login_page/login';
import { getDictionary } from '@/i18n-server';
import AltLogin from '@/components/UI_Organisms/login_page/altLogin';
import { getUser } from '@/utils/auth';
import { langProps_LOGIN, localeProps } from '@/universalTypes';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/context/hooks';

function Home({ params: { locale } }: localeProps) {
  const [lang, setLang] = useState<langProps_LOGIN>();
  const { user } = useAppSelector((store) => store.user);

  useEffect(() => {
    (async () => {
      const writePageDocTypeResponse = (await getDictionary(locale)).login;
      setLang(writePageDocTypeResponse);
    })();
  }, [locale]);

  return (
    <div>
      <Header />
      {lang ? (
        user ? (
          <AltLogin {...lang} />
        ) : (
          <Login {...lang} />
        )
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default Home;
