"use client";

import SearchBar from "@/components/UI_Organisms/docs_pages/searchBar";
import { getAllFolders } from "@/context/features/docsHard_scan_archive_Slice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { getDictionary } from "@/i18n-server";
import { docsHard_Type, localeProps } from "@/universalTypes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { FaFolder } from "react-icons/fa";

function Archive({ params: { locale } }: localeProps) {
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const { folders, searchDetail } = useAppSelector(
    (store) => store.docsHard_scan_archive
  );

  useEffect(() => {
    dispatch(getAllFolders());
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

        <div className="relative mt-8 mb-16 max-w-3xl mx-auto">
          <SearchBar locale={locale} page="docs_scan_archive" />
          {searchDetail.length && (
            <div className="absolute bg-white mt-2 font-rounded rounded shadow-lg h-64 z-10 w-full space-y-2  overflow-auto">
              {searchDetail.map((item) => (
                <a
                  key={item.id}
                  href={`${process.env.NEXT_PUBLIC_MEDIA_SERVER}${item.archived_document}`}
                  download={item.title}
                  className=""
                >
                  <div className="shadow-lg text-right pr-4 hover:bg-primary-500 mt-4 mx-2 ">
                    <h1>
                      <span className="text-lg">{item.title}</span>{" "}
                      <span className="font-bold  ">:عنوان</span>
                    </h1>
                    <p>
                      <span className="text-lg">{item.serial}</span>{" "}
                      <span className="font-bold">: شماره مکتوب</span>
                    </p>
                    <p>
                      <span className="text-lg ">{item.shelf}</span>{" "}
                      <span className="font-bold">:دوسیه</span>
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
        <div
          onClick={() => push(`/${locale}/docsHard_scan_archive/addFile`)}
          className="flex ml-auto mt-10 mr-5  items-center justify-center space-x-2 border w-fit p-2 rounded border-black cursor-pointer hover:scale-105 "
        >
          <p className="font-nazanin font-semibold text-lg">اضافه سند جدید</p>
          <CiSquarePlus size={24} />
        </div>

        <h1 className="font-bold font-IranSans text-xl text-right my-7">
          آرشیف اسناد نظر به سال
        </h1>
        <div className="flex space-x-7 items-center justify-end flex-wrap">
          {folders?.map((item: { year?: string }, idx: number) => (
            <Link
              key={idx}
              href={`/${locale}/docsHard_scan_archive/${item.year}`}
            >
              <FaFolder size={64} />
              <p className="text-center text-primary-700">{item.year}</p>
            </Link>
          ))}
        </div>
      </div>
    )
  );
}

export default Archive;
