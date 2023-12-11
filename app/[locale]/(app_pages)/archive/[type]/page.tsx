"use client";

import { Button } from "@/components/UI_Molecules/Button";
import ListTable from "@/components/UI_Organisms/docs_pages/list";
import SearchBar from "@/components/UI_Organisms/docs_pages/searchBar";
import ErrorBox from "@/components/misc/errorBox";
import { fetchArchiveDocuments } from "@/context/features/archiveSlice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { getDictionary } from "@/i18n-server";
import { langProps_LIST, localeProps } from "@/universalTypes";
import React, { useEffect, useState } from "react";

import html2pdf from "html2pdf.js";

function Page({
  params: { locale, type },
}: localeProps & { params: { type: string } }) {
  const [lang, setLang] = useState<langProps_LIST>();

  const dispatch = useAppDispatch();
  const { error } = useAppSelector((store) => store.archive);

  useEffect(() => {
    (async () => {
      const lang = (await getDictionary(locale)).list_page;
      setLang(lang);
    })();
  }, [dispatch, locale, type]);

  const [table, setTable] = useState<HTMLElement | null>(null);

  const printForm = (item: HTMLElement) => {
    html2pdf(item);
  };

  return !error ? (
    lang && (
      <div className="mx-4 2xl:max-w-6xl 2xl:ml-auto">
        {type !== "unread " && (
          <SearchBar page="archive" locale={locale} type={type} />
        )}

        <div className="flex justify-end mt-2">
          <Button
            intent={"secondary"}
            label="دانلود آرشیف"
            handleClick={() => table && printForm(table)}
          />
        </div>

        <ListTable locale={locale} {...lang} type={type} setTable={setTable} />
      </div>
    )
  ) : (
    <ErrorBox message={error} />
  );
}

export default Page;
