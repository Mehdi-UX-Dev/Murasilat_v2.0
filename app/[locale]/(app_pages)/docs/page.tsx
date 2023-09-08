import ListTable from "@/components/UI_Organisms/docs_pages/list";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/i18n-server";
import React from "react";

type PageProps = {
  params: { locale: Locale };
};

async function Page({ params: { locale } }: PageProps) {
  const lang = (await getDictionary(locale)).list_page;
  return (
    <div className="">
      {/* the header must be with the id in the same row  */}
      <h1 className="font-IranSans text-4xl ">لیست تمام صادره</h1>

      <ListTable lang={lang} />
    </div>
  );
}

export default Page;
