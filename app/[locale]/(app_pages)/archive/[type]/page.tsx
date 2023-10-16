"use client";

import ListTable from "@/components/UI_Organisms/docs_pages/list";
import SearchBar from "@/components/UI_Organisms/docs_pages/searchBar";
import { fetchArchiveDocuments } from "@/context/features/archiveSlice";
import { useAppDispatch } from "@/context/hooks";
import { getDictionary } from "@/i18n-server";
import { localeProps } from "@/universalTypes";
import React, { useEffect, useState } from "react";

function Page({
  params: { locale, type },
}: localeProps & { params: { type: string } }) {
  const [lang, setLang] = useState();

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const lang = (await getDictionary(locale)).list_page;
      setLang(lang);
    })();
    dispatch(fetchArchiveDocuments(type));
  }, [dispatch, locale, type]);

  return (
    <div className="mx-4 2xl:max-w-6xl 2xl:ml-auto">
      <SearchBar type={type} />
      <ListTable {...lang} type={type} />
    </div>
  );
}

export default Page;
