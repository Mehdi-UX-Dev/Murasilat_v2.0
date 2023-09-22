import ListTable from "@/components/UI_Organisms/docs_pages/list";
import SearchBar from "@/components/UI_Organisms/docs_pages/searchBar";
import { getDictionary } from "@/i18n-server";
import { localeProps } from "@/universalTypes";
import React from "react";

async function Page({ params: { locale } }: localeProps) {
  const lang = (await getDictionary(locale)).list_page;

  return (
    <div>
      <SearchBar {...lang} />
      <ListTable {...lang} />
    </div>
  );
}

export default Page;
