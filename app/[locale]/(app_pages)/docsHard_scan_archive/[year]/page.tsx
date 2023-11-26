"use client";
import SearchBar from "@/components/UI_Organisms/docs_pages/searchBar";
import { getShelf } from "@/context/features/docsHard_scan_archive_Slice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoFileTrayStackedOutline } from "react-icons/io5";

function page({
  params: { locale, year },
}: {
  params: { locale: string; year: number };
}) {
  const dispatch = useAppDispatch();
  const { shelf } = useAppSelector((store) => store.docsHard_scan_archive);
  const { back } = useRouter();

  useEffect(() => {
    dispatch(getShelf({ year }));
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center ">
        <div className="flex items-center space-x-2 ">
          <FaArrowLeft
            size={32}
            onClick={() => back()}
            className="hover:cursor-pointer"
          />
          <p className="font-bold text-lg ">برگشت</p>
        </div>
        <h1 className="font-IranSans font-bold text-3xl text-right mr-5 mb-10">
          دوسیه های سال {year}
        </h1>
      </div>
      <SearchBar locale={locale} page="docs_scan_archive" />

      <div className="flex space-x-7 items-center justify-end flex-wrap mt-8">
        {shelf?.map((item: { shelf_number: number }, idx: number) => (
          <Link
            key={idx}
            href={`/${locale}/docsHard_scan_archive/${year}/${item.shelf_number}`}
          >
            <IoFileTrayStackedOutline size={64} />
            <p className="text-center text-primary-700">{item.shelf_number}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default page;
