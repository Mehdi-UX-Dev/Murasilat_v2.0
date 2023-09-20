import Header from "@/components/UI_Organisms/login_page/loginHeader";
import Card from "@/components/UI_Organisms/login_page/loginCard";
import { getDictionary } from "@/i18n-server";
import CardV3 from "@/components/UI_Organisms/login_page/loginCardV3";
import { localeProps } from "@/universalTypes";

async function Home({ params: { locale } }: localeProps) {
  const lang = (await getDictionary(locale)).login;

  return (
    <div>
      <Header />
      <Card {...lang} />
    </div>
  );
}

export default Home;
