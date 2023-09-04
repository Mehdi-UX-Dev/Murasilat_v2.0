"use client";
import { InputField } from "@/components/UI_Molecules/Input";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiFilter } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

function ListTable() {
  const [filterGroupVisible, setFilterGroupVisible] = useState(false);

  return (
    <div className=" h-screen">
      {/*  */}
      <div className="grow text-right mx-12">
        {/* <Id /> */}
        <div className="flex justify-end items-end space-x-4">
          <BiFilter
            size={36}
            onClick={() => setFilterGroupVisible(!filterGroupVisible)}
          />

          <div className="relative ">
            <InputField
              label="شماره"
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
        <div
          className={` ${
            filterGroupVisible ? "grid" : "hidden"
          } justify-items-end space-y-3 mt-4`}
        >
          <div>
            <label htmlFor="">فرستنده</label>
            <input type="text" className="border border-black" />
          </div>
          <div>
            <label htmlFor="">عنوان</label>
            <input type="text" className="border border-black" />
          </div>
        </div>
        {/* table */}
        <table className="w-full table-auto   mt-4 shadow-lg  ">
          <thead className="border-b border-primary-500 bg-primary-500">
            <tr className=" bg-light font-IranSans ">
              <th>تاریخ</th>
              <th>عنوان</th>
              <th>فرستنده</th>
              <th>موضوع</th>
              <th>شماره</th>
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
