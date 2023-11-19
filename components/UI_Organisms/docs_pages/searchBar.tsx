"use client";

import { searchArchiveDocuments } from "@/context/features/archiveSlice";
import {
  hideSearchedDocumentModal,
  searchDocumentsDashboardPage,
  showSearchedDocumentModal,
} from "@/context/features/documentSlice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { getDictionary } from "@/i18n-server";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";

function SearchBar({ locale, type }: { locale: string; type: string }) {
  let [lang, setLang] = useState<
    { placeholder: string; search: string; clear_search: string } | undefined
  >(undefined);

  const path = usePathname();

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
  useEffect(() => {
    if (path === "/ps/dashboard" || "/per") {
      searchValue.length == 0 && dispatch(hideSearchedDocumentModal());
    }
  }, [searchValue.length, dispatch, path]);

  const Search: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    dispatch(showSearchedDocumentModal());
    // the code is bad in here seperation of code is needed in here
    path === "/per/dashboard" || path === "/ps/dashboard"
      ? dispatch(searchDocumentsDashboardPage({ value: searchValue }))
      : dispatch(searchArchiveDocuments({ type, value: searchValue }));
  };

  const clearSearch = () => {
    setSearchValue("");
    path === "/per/dashboard" ||
      (path == "/ps/dashboard" && dispatch(hideSearchedDocumentModal()));
  };

  

  return (
    lang && (
      <div className="max-w-3xl mx-auto">
        <form className="flex space-x-2" onSubmit={Search}>
          {searchedDoumentsModalActive && searchValue.length ? (
            <button
              type="button"
              onClick={clearSearch}
              className="bg-myAccent-error-400 text-white w-40 font-rounded font-bold rounded text-lg flex items-center justify-center space-x-2 "
            >
              <RxCrossCircled size={24}/>
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
              required
            />
            <AiOutlineSearch size={24} className="absolute right-3 top-3 " />
          </div>
        </form>
      </div>
    )
  );
}

export default SearchBar;
