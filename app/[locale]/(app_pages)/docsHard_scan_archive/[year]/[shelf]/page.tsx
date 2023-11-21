"use client";

import SearchBar from "@/components/UI_Organisms/docs_pages/searchBar";
import { getDocumentsFromShelf } from "@/context/features/docsHard_scan_archive_Slice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

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

  const { push } = useRouter();
  return (
    <div>
      <h1 className="font-bold font-IranSans text-lg text-right">
        لیست اسناد در دوسیه {shelf}
      </h1>

      <SearchBar type="" locale={locale} />

      <table
        id="table"
        className="w-full mx-10 text-center table-auto mt-8 border"
      >
        <thead className="border-b border-primary-500  bg-primary-900 text-white ">
          <tr className=" bg-light font-IranSans ">
            <th>شماره</th>
            <th>عنوان</th>
            <th>دوسیه</th>
          </tr>
        </thead>
        <tbody className="font-rounded ">
          {documents?.map((item) => (
            <tr
              key={item.serial}
              className="hover:bg-primary-300"
              onClick={() =>
                push(
                  `/${locale}/docsHard_scan_archive/${year}/${shelf}/${item.serial}`
                )
              }
            >
              <td>{item.serial}</td>
              <td>{item.title}</td>
              <td>{item.shelf}</td>
              <td>
                <a></a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default page;
