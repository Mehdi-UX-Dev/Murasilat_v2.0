"use client";

import SearchBar from "@/components/UI_Organisms/docs_pages/searchBar";
import { getDocumentsFromShelf } from "@/context/features/docsHard_scan_archive_Slice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";

function page({
  params: { locale, year, shelf },
}: {
  params: { locale: string; year: number; shelf: number };
}) {
  const dispatch = useAppDispatch();
  const { documents } = useAppSelector((store) => store.docsHard_scan_archive);

  useEffect(() => {
    dispatch(getDocumentsFromShelf({ year, shelf }));
  });

  const { back } = useRouter();

  return (
    <div>
      <h1 className="font-bold font-IranSans text-2xl text-right mb-14 ">
        لیست اسناد در دوسیه {shelf}
      </h1>

      <div className="flex items-center space-x-2 ">
        <FaArrowLeft
          size={32}
          onClick={() => back()}
          className="hover:cursor-pointer"
        />
        <p className="font-bold text-lg ">برگشت</p>
      </div>

      <SearchBar page="docs_scan_archive" locale={locale} />

      <table
        id="table"
        className="w-full mx-10 text-center table-auto mt-14 border"
      >
        <thead className="border-b border-primary-500  bg-primary-900 text-white ">
          <tr className=" bg-light font-IranSans ">
            <th></th>
            <th>دوسیه</th>
            <th>عنوان</th>
            <th>شماره</th>
          </tr>
        </thead>
        <tbody className="font-rounded ">
          {documents?.map((item) => (
            <tr key={item.serial} className="hover:bg-primary-300">
              <td>
                <a
                  className="bg-primary-900 text-white py-2 px-2 rounded hover:bg-primary-600"
                  href={`${process.env.NEXT_PUBLIC_MEDIA_SERVER}${item.archived_document}`}
                  download={item.title}
                >
                  دانلود
                </a>
              </td>
              <td>{item.shelf}</td>
              <td>{item.title}</td>
              <td>{item.serial}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default page;
