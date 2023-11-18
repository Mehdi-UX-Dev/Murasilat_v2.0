"use client";

import SearchBar from "@/components/UI_Organisms/docs_pages/searchBar";
import { localeProps } from "@/universalTypes";
import { useRouter } from "next/navigation";
import React from "react";
import { CiSquarePlus } from "react-icons/ci";

function Archive({ params: { locale } }: localeProps) {
  const { push } = useRouter();
  return (
    <div>
      <h1 className="font-IranSans font-bold text-3xl text-right mr-5 mb-10">
        آرشیف اسناد
      </h1>

      <SearchBar locale={locale} type="" />

      <div
        onClick={() => push(`/${locale}/docsHard_scan_archive/addFile`)}
        className="flex ml-auto mt-10 mr-5  items-center justify-center space-x-2 border w-fit p-2 rounded border-black cursor-pointer"
      >
        <p className="font-nazanin font-semibold text-lg">اضافه سند جدید</p>
        <CiSquarePlus size={24} />
      </div>

      {/* <table id="table" className="w-full text-center table-auto mt-8 border">
        <thead className="border-b border-primary-500  bg-primary-900 text-white ">
          <tr className=" bg-light font-IranSans ">
            <th>{lang.date}</th>
            <th>{lang.title}</th>
            <th>{type === "sadira" ? lang.sender : lang.search}</th>
            <th>{lang.content}</th>
            <th>{lang.number}</th>
          </tr>
        </thead>
        <tbody className="font-rounded ">
          {data.map(
            (item) => (
              console.log(item),
              (
                <tr
                  key={item.document.serial}
                  className="border-b border-primary-500 hover:bg-primary-400"
                  onClick={() =>
                    router.push(`${item.document_type}/${item.document.serial}`)
                  }
                >
                  <td>{GetShamsiDate(item?.document?.date)}</td>
                  <td>{item?.document?.title}</td>
                  <td>
                    {type === "sadira"
                      ? item?.document?.receiver?.fullname
                      : item?.document?.sender?.fullname}
                  </td>
                  <td>{item?.summary}</td>
                  <td>{item?.document?.serial}</td>
                </tr>
              )
            )
          )}
        </tbody>
      </table> */}
    </div>
  );
}

export default Archive;
