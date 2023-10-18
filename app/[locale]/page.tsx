'use client';
import Header from '@/components/UI_Organisms/login_page/loginHeader';
import Card from '@/components/UI_Organisms/login_page/loginCard';
import { getDictionary } from '@/i18n-server';
import CardV3 from '@/components/UI_Organisms/login_page/loginCardV3';
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
          <CardV3 {...lang} />
        ) : (
          <Card {...lang} />
        )
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default Home;
