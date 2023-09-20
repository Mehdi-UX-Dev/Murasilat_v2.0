"use client";

import { InputField } from "@/components/UI_Molecules/Input";
import { langProps_ARCHIVE } from "@/universalTypes";
import { cx } from "class-variance-authority";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiFilter } from "react-icons/bi";

function SearchBar({ ...lang }: langProps_ARCHIVE) {
  const [filterGroupVisible, setFilterGroupVisible] = useState(false);
  const Filter = (filterType) => {
    switch (filterType) {
      case "id":
        console.log(filterType);
        break;
      case "sender":
        console.log(filterType);
        break;
      case "date":
        console.log(filterType);
        break;
      case "title":
        console.log(filterType);
    }
  };

  return (
    <div className="flex items-center  justify-end space-x-4 ">
      <BiFilter
        size={36}
        // * give the icon a transition of rotating 360 degree
        onClick={() => setFilterGroupVisible(!filterGroupVisible)}
      />
      <div
        className={cx("space-x-4", {
          flex: filterGroupVisible,
          hidden: !filterGroupVisible,
        })}
      >
        <InputField
          state="Default"
          label={lang.date}
          lang="LTR"
          inputType="date"
          fullWidth
          name="date"
          handleChange={() => Filter("date")}
        />
        <InputField
          state="Default"
          label={lang.sender}
          lang="RTL"
          inputType="text"
          fullWidth
          name="sender"
          handleChange={() => Filter("sender")}
        />
        <InputField
          state="Default"
          label={lang.title}
          lang="RTL"
          inputType="text"
          fullWidth
          name="title"
          handleChange={() => Filter("title")}
        />
      </div>

      <div className="relative ">
        <InputField
          state="Default"
          label={lang.number}
          inputType="number"
          name="search"
          fullWidth={false}
          lang="RTL"
          disabled={filterGroupVisible}
          handleChange={() => Filter("id")}
        />
        <AiOutlineSearch size={16} className="absolute right-3 top-10 z-10" />
      </div>
    </div>
  );
}

export default SearchBar;
