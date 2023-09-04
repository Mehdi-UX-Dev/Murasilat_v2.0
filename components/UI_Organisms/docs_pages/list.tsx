"use client";
import { InputField } from "@/components/UI_Molecules/Input";
import { cx } from "class-variance-authority";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiFilter } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

type ListProps = {
  lang: {
    search: string;
    date: string;
    sender: string;
    title: string;
    number: string;
    content: string;
  };
};

function ListTable({ lang }: ListProps) {
  const [filterGroupVisible, setFilterGroupVisible] = useState(false);

  return (
    <div className=" h-screen">
      {/*  */}
      <div className="grow text-right mx-12">
        {/* <Id /> */}
        <div className="flex justify-end items-end space-x-4">
          <BiFilter
            size={36}
            // * give the icon a transition of rotating 360 degree 
            onClick={() => setFilterGroupVisible(!filterGroupVisible)}
          />
        <div className={cx('flex space-x-4', {
            'flex' : !filterGroupVisible, 
            'hidden': filterGroupVisible
        })}>
          <InputField
            label={lang.date}
            lang="LTR"
            inputType="date"
            fullWidth
            name="date"
          />
          <InputField
            label={lang.sender}
            lang="RTL"
            inputType="text"
            fullWidth
            name="sender"
          />
          <InputField
            label={lang.title}
            lang="RTL"
            inputType="text"
            fullWidth
            name="title"
          />
          </div>

          <div className="relative ">
            <InputField
              label={lang.number}
              inputType="number"
              name="search"
              fullWidth={false}
              lang="RTL"
            />
            <AiOutlineSearch
              size={16}
              className="absolute right-3 top-10 z-10"
            />
          </div>
        </div>

        {/* table */}
        <table className="w-full table-auto mt-8 shadow-lg">
          <thead className="border-b border-primary-500 bg-primary-500">
            <tr className=" bg-light font-IranSans ">
              <th>{lang.date}</th>
              <th>{lang.title}</th>
              <th>{lang.sender}</th>
              <th>{lang.content}</th>
              <th>{lang.number}</th>
            </tr>
          </thead>
          <tbody className="font-nazanin ">
            <tr className="border-b border-primary-500">
              <td> 25/4/1402</td>
              <td>تایید راپور</td>
              <td>رییس پوهنحی</td>
              <td> راپور احصاییه اساتید</td>
              <td>1</td>
            </tr>
            <tr className="border-b border-primary-500">
              <td> 25/4/1402</td>
              <td>تایید راپور</td>
              <td>رییس پوهنحی</td>
              <td> راپور احصاییه اساتید</td>
              <td>1</td>
            </tr>
            <tr className="border-b border-primary-500">
              <td> 25/4/1402</td>
              <td>تایید راپور</td>
              <td>رییس پوهنحی</td>
              <td> راپور احصاییه اساتید</td>
              <td>1</td>
            </tr>{" "}
            <tr className="border-b border-primary-500">
              <td> 25/4/1402</td>
              <td>تایید راپور</td>
              <td>رییس پوهنحی</td>
              <td> راپور احصاییه اساتید</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListTable;
