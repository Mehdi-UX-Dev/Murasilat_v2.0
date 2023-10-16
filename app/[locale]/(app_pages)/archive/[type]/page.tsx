"use client";

import ListTable from "@/components/UI_Organisms/docs_pages/list";
import SearchBar from "@/components/UI_Organisms/docs_pages/searchBar";
import { fetchArchiveDocuments } from "@/context/features/archiveSlice";
import { getDictionary } from "@/i18n-server";
import { langProps_LIST, localeProps } from "@/universalTypes";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Page({
  params: { locale, type },
}: localeProps & { params: { type: string } }) {
  const [lang, setLang] = useState<langProps_LIST>();
  const [data, setData] = useState();

  const dispatch = useDispatch()


  useEffect(() => {
    (async () => {
      const lang = (await getDictionary(locale)).list_page;
      setLang(lang);

      dispatch(fetchArchiveDocuments(type))

      // setData(res.data);

      // console.log(res.data);
    })();
  }, []);

  return (
    <div className="mx-4 2xl:max-w-6xl 2xl:ml-auto">
      <SearchBar {...lang} type={type}/>
      <ListTable {...lang}  type={type} />
    </div>
  );
}

export default Page;
