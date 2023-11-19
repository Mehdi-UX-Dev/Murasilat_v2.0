import { getDictionary } from "@/i18n-server";
import React, { useEffect, useState } from "react";
import { Button } from "../UI_Molecules/Button";
import { useRouter } from "next/navigation";


//? userError should be used or not in here ??? 
function UnAuthorizedRedirect({ locale }: { locale: string }) {
  const { replace } = useRouter();
  const [lang, setLang] = useState<{ header: string; redirect: string }>();
  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).unauhtorized_redirect;
      setLang(res);
    })();
  });
  return (
    lang && (
      <div dir="rtl" className="flex  justify-center items-center  h-screen">
        <div className="shadow-lg rouned-lg p-10 space-y-5 ">
          <h1 className="text-lg font-bold font-IranSans ">{lang?.header}</h1>
          {/* <p className="font-semibold font-nazanin">{lang?.redirect}</p> */}
          <Button
            label={lang?.redirect}
            handleClick={() => replace(`/${locale}`)}
          />
        </div>
      </div>
    )
  );
}

export default UnAuthorizedRedirect;
