"use client";

import SearchBar from "@/components/UI_Organisms/docs_pages/searchBar";
import { getAllFiles } from "@/context/features/docsHard_scan_archive_Slice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { getDictionary } from "@/i18n-server";
import { docsHard_Type, localeProps } from "@/universalTypes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";

function Archive({ params: { locale } }: localeProps) {
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const { documents } = useAppSelector((store) => store.docsHard_scan_archive);

  useEffect(() => {
    dispatch(getAllFiles());
  }, []);

  const [lang, setLang] = useState<docsHard_Type>();

  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).hardDocs_scan_archive;
      setLang(res);
    })();
  });

  return (
    lang && (
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

        <table id="table" className="w-full text-center table-auto mt-8 border">
          <thead className="border-b border-primary-500  bg-primary-900 text-white ">
            <tr className=" bg-light font-IranSans ">
              <th>{lang.title}</th>
              <th>{lang.doc_number}</th>
              <th>{lang.shelf_no}</th>
              <th>{lang.year}</th>
            </tr>
          </thead>
          <tbody className="font-rounded ">
            {documents?.map(
              (item) => (
                console.log(item),
                (
                  <tr
                    key={item.serial}
                    className="border-b border-primary-500 hover:bg-primary-400"
                    // onClick={() =>
                    //   // push(`${item.document_type}/${item.document.serial}`)
                    // }
                  >
                    {/* <td>{GetShamsiDate(item?.document?.date)}</td> */}
                    <td>{item.title}</td>

                    {/* <td>{item?.summary}</td> */}
                    {/* <td>{item?.document?.serial}</td> */}
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    )
  );
}

export default Archive;
