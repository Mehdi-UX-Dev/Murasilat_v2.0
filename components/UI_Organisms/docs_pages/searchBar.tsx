"use client";

import { searchArchiveDocuments } from "@/context/features/archiveSlice";
import {
  hideSearchedDocumentModal,
  searchDocumentsDashboardPage,
  showSearchedDocumentModal,
} from "@/context/features/documentSlice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { getDictionary } from "@/i18n-server";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar({ locale, type }: { type: string; locale: string }) {
  let [lang, setLang] = useState<
    { placeholder: string; search: string; clear_search: string } | undefined
  >(undefined);

  const { searchedDoumentsModalActive } = useAppSelector(
    (store) => store.documents
  );

  useEffect(() => {
    (async () => {
      const langRes = (await getDictionary(locale)).searchBar;

      setLang(langRes);
    })();
  }, [locale]);

  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();

  const Search: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(showSearchedDocumentModal());
    dispatch(searchDocumentsDashboardPage({ value: searchValue }));
  };

  const clearSearch = () => {
    setSearchValue("");
    dispatch(hideSearchedDocumentModal());
  };

  return (
    
    lang && (
      <div className="max-w-3xl mx-auto">
        <form className="flex space-x-2" onSubmit={Search}>
          {searchedDoumentsModalActive ? (
            <button
              type="button"
              onClick={clearSearch}
              className="bg-primary-900 text-white w-40 font-rounded font-bold rounded text-lg  "
            >
              {lang.clear_search}
            </button>
          ) : (
            <button
              disabled={searchValue.length == 0}
              className="bg-primary-900 text-white w-24 font-rounded font-bold rounded text-lg disabled:bg-gray-400 "
            >
              {lang.search}
            </button>
          )}

          <div className="relative grow">
            <input
              value={searchValue}
              type="text"
              className="border text-right w-full border-primary-700 rounded-md h-12  focus:border-2 focus:border-primary-900 pr-12"
              name="search"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder={lang.placeholder}
            />
            <AiOutlineSearch
              size={24}
              className="absolute right-3 top-3 z-10"
            />
          </div>
        </form>
      </div>
    )
  );
}

export default SearchBar;
