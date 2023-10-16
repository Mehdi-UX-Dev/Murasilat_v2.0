"use client";

import { InputField } from "@/components/UI_Molecules/Input";
import { searchArchiveDocuments } from "@/context/features/archiveSlice";
import { langProps_ARCHIVE } from "@/universalTypes";
import { cx } from "class-variance-authority";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";

function SearchBar({ type, ...lang }: langProps_ARCHIVE) {
  const [filterGroupVisible, setFilterGroupVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const Search: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(searchArchiveDocuments({ type, value: searchValue }));
  };

  return (
    <div className="flex items-end  justify-end space-x-4 ">
      <form onSubmit={Search}>
        <div className="relative ">
          <InputField
            state="Default"
            label={lang.number}
            inputType="number"
            name="search"
            fullWidth={false}
            lang="RTL"
            disabled={filterGroupVisible}
            handleChange={(value) => setSearchValue(value)}
          />
          <AiOutlineSearch size={16} className="absolute right-3 top-10 z-10" />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
