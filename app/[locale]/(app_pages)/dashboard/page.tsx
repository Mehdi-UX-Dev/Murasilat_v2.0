"use client";

import React, { useEffect, useState } from "react";
import { getDictionary } from "@/i18n-server";
import { langProps_DASHBOARD, localeProps } from "@/universalTypes";
import {
  fetchDocuments,
  hideBookmarkModal,
} from "@/context/features/documentSlice";

import { useAppDispatch, useAppSelector } from "@/context/hooks";
import SearchBar from "@/components/UI_Organisms/docs_pages/searchBar";
import StackCards from "@/components/UI_Organisms/Card/stackCards";
import SearchedResults from "@/components/UI_Organisms/Card/searchedResultsModal";
import ID from "@/components/UI_Organisms/write_page/ID";
import ErrorBox from "@/components/misc/errorBox";

function Dashboard({ params: { locale } }: localeProps) {
  const [lang, setDashLang] = useState<langProps_DASHBOARD | undefined>(
    undefined
  );

  const { user } = useAppSelector((store) => store.user);

  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).dashboard;
      setDashLang(res);
    })();
  }, [locale]);

  const {
    bookmark,
    searchedDoumentsModalActive,
    error: { fetchDocumentsError },
  } = useAppSelector((store) => store.documents);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  useEffect(() => {
    bookmark.error &&
      setTimeout(() => {
        dispatch(hideBookmarkModal());
      }, 4000);
  }, [dispatch, bookmark.error]);

  return !fetchDocumentsError ? (
    lang && (
      <div className="relative">
        {bookmark.activeModal && (
          <div className="absolute left-[45%]  max-w-sm  mx-auto">
            {bookmark.data ? (
              <h1 className="bg-white shadow-lg rounded-full text-green-400 font-bold px-4 py-4  text-center">
                Success
                {/* {bookmark?.response} */}
              </h1>
            ) : (
              <div className="bg-white shadow-lg  rounded-full text-myAccent-error-300 font-bold px-4 py-4 text-center">
                {bookmark.error}
              </div>
            )}
          </div>
        )}

        <ID />

        <div className=" relative mt-8 mb-16 max-w-3xl mx-auto">
          <SearchBar page="dashboard" locale={locale} />
          {searchedDoumentsModalActive && <SearchedResults {...lang} />}
        </div>

        {user?.role === "head" ? (
          <div>head</div>
        ) : (
          <div className="pb-10 space-y-8">
            <StackCards type={"unreadDocuments"} {...lang} />
            <StackCards type={"receivedRecently"} {...lang} />
            <StackCards type={"sentRecently"} {...lang} />
          </div>
        )}
      </div>
    )
  ) : (
    <ErrorBox message={fetchDocumentsError} />
  );
}

export default Dashboard;
