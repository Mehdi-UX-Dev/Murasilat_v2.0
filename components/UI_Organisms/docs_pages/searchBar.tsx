"use client";

import { searchArchiveDocuments } from "@/context/features/archiveSlice";
import { useAppDispatch } from "@/context/hooks";
import { getDictionary } from "@/i18n-server";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar({ locale, type }: { type: string; locale: string }) {
  let lang = useRef({
    placeholder: "",
    search: "",
  });
  useEffect(() => {
    (async () => {
      const langRes = (await getDictionary(locale)).searchBar;

      lang.current = langRes;
    })();
  }, [locale]);

  

  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();

  const Search: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(searchArchiveDocuments({ type, value: searchValue }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form className="flex space-x-2" onSubmit={Search}>
        <button
          disabled={searchValue.length == 0}
          className="bg-primary-900 text-white w-24 font-rounded font-bold rounded text-lg disabled:bg-gray-400 "
        >
          {lang.current.search}
        </button>
        <div className="relative grow">
          <input
            type="text"
            className="border text-right w-full border-primary-700 rounded-md h-12  focus:border-2 focus:border-primary-900 pr-12"
            name="search"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            placeholder={lang.current.placeholder}
          />
          <AiOutlineSearch size={24} className="absolute right-3 top-3 z-10" />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
