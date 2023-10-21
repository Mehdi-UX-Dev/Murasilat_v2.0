"use client";

import React, { useEffect, useState } from "react";
import { getDictionary } from "@/i18n-server";
import { langProps_DASHBOARD, localeProps } from "@/universalTypes";
import { fetchDocuments } from "@/context/features/documentSlice";

import { useAppDispatch, useAppSelector } from "@/context/hooks";
import PDF_DASHBOARD from "@/components/UI_Organisms/modal/showPDFModal";
import SearchBar from "@/components/UI_Organisms/docs_pages/searchBar";
import StackCards from "@/components/UI_Organisms/Card/stackCards";
import SearchedResults from "@/components/UI_Organisms/Card/searchedResultsModal";
import ID from "@/components/UI_Organisms/write_page/ID";

function Dashboard({ params: { locale } }: localeProps) {
  const [lang, setDashLang] = useState<langProps_DASHBOARD | undefined>(
    undefined
  );
  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).dashboard;
      setDashLang(res);
    })();
  }, [locale]);

  const { pdf, searchedDoumentsModalActive, documents } = useAppSelector(
    (store) => store.documents
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  return (
    lang && (
      <div className="">
        <ID />

        {pdf.visible && <PDF_DASHBOARD locale={locale} />}

        {/* type is not specified properly in here // may be type is not needed in the first place */}
        <div className=" relative mt-8 mb-16 max-w-3xl mx-auto">
          <SearchBar type="" locale={locale} />
          {searchedDoumentsModalActive && <SearchedResults {...lang} />}
        </div>

        <div className="pb-10 space-y-8">
          <StackCards type={"unreadDocuments"} {...lang} />
          <StackCards type={"receivedRecently"} {...lang} />
          <StackCards type={"sentRecently"} {...lang} />
        </div>
      </div>
    )
  );
}

export default Dashboard;
