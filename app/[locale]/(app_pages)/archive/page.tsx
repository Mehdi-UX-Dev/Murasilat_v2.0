import ListTable from "@/components/UI_Organisms/docs_pages/list";
import SearchBar from "@/components/UI_Organisms/docs_pages/searchBar";
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
      <SearchBar {...lang} />
      <ListTable {...lang} />
    </div>
  );
}

export default Page;
