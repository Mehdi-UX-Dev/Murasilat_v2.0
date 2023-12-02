"use client";

import {
  clearSearch,
  searchArchiveDocuments,
} from "@/context/features/archiveSlice";
import {
  clearSearch_scan,
  searchDocScans,
} from "@/context/features/docsHard_scan_archive_Slice";
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

function SearchBar({
  locale,
  type,
  page,
}: {
  locale: string;
  type?: string;
  page: string;
}) {
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
    page === "dashboard" &&
      searchValue.length == 0 &&
      dispatch(hideSearchedDocumentModal());
  }, [searchValue.length, dispatch, path]);

  const Search: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(showSearchedDocumentModal());
    page === "dashboard" &&
      dispatch(searchDocumentsDashboardPage({ value: searchValue }));
    type && dispatch(searchArchiveDocuments({ type, value: searchValue }));
    page === "docs_scan_archive" &&
      dispatch(searchDocScans({ serial: searchValue }));
  };

  const clearSearchBar = () => {
    setSearchValue("");
    page === "dashboard" && dispatch(hideSearchedDocumentModal());
    page === "docs_scan_archive" && dispatch(clearSearch_scan());
    page === "archive" && dispatch(clearSearch());
  };

  return (
    lang && (
      <div className="max-w-3xl mx-auto">
        <form className="flex space-x-2" onSubmit={Search}>
          {searchValue.length ? (
            <button
              type="button"
              onClick={clearSearchBar}
              className="bg-myAccent-error-400 text-white w-40 font-rounded font-bold rounded text-lg flex items-center justify-center space-x-2 "
            >
              <RxCrossCircled size={24} />
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
