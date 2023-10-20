"use client";

import ListTable from "@/components/UI_Organisms/docs_pages/list";
import SearchBar from "@/components/UI_Organisms/docs_pages/searchBar";
import { fetchArchiveDocuments } from "@/context/features/archiveSlice";
import { useAppDispatch } from "@/context/hooks";
import { getDictionary } from "@/i18n-server";
import { langProps_LIST, localeProps } from "@/universalTypes";
import React, { useEffect, useState } from "react";
import {
  AiFillIdcard,
  AiOutlineIdcard,
  AiOutlineOrderedList,
} from "react-icons/ai";
import { FaListOl } from "react-icons/fa";

function Page({
  params: { locale, type },
}: localeProps & { params: { type: string } }) {
  const [lang, setLang] = useState<langProps_LIST>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const lang = (await getDictionary(locale)).list_page;
      setLang(lang);
    })();
    dispatch(fetchArchiveDocuments(type));
  }, [dispatch, locale, type]);

  const [listType, setListType] = useState({
    cardType: false,
    tableType: true,
  });

  return (
    lang && (
      <div className="mx-4 2xl:max-w-6xl 2xl:ml-auto">
        <SearchBar type={type} />

        <div className="flex justify-end items-center space-x-4 mt-4">
          {listType.cardType ? (
            <AiFillIdcard size={36} />
          ) : (
            <AiOutlineIdcard size={24} onClick={() => setListType({cardType: true, tableType : false})} />
          )}

          {listType.tableType ? (
            <FaListOl size={listType.tableType ? 28 : 24} />
          ) : (
            <AiOutlineOrderedList size={24} onClick={ () => setListType({cardType: false, tableType : true})} />
          )}
        </div>

        <ListTable locale={locale} {...lang} type={type} showMethod={listType} />
      </div>
    )
  );
}

export default Page;
