"use client";

import { InputField } from "@/components/UI_Molecules/Input";
import { langProps_ARCHIVE } from "@/universalTypes";
import { cx } from "class-variance-authority";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiFilter } from "react-icons/bi";

function SearchBar({ ...lang }: langProps_ARCHIVE) {
  const [filterGroupVisible, setFilterGroupVisible] = useState(false);
  const data = [];
  const Filter = (filterType: string, value: string) => {
    console.log(value);
    console.log(filterType);

    switch (filterType) {
      case "id":
        data.filter((list) => list === value);
        break;
      case "sender":
        data.filter((list) => list === value);
        break;
      case "date":
        data.filter((list) => list === value);
        break;
      case "title":
        data.filter((list) => list === value);
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
          handleChange={(value) => Filter("date", value)}
        />
        <InputField
          state="Default"
          label={lang.sender}
          lang="RTL"
          inputType="text"
          fullWidth
          name="sender"
          handleChange={(value) => Filter("sender", value)}
        />
        <InputField
          state="Default"
          label={lang.title}
          lang="RTL"
          inputType="text"
          fullWidth
          name="title"
          handleChange={(value) => Filter("title", value)}
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
          handleChange={(value) => Filter("id", value)}
        />
        <AiOutlineSearch size={16} className="absolute right-3 top-10 z-10" />
      </div>
    </div>
  );
}

export default SearchBar;
