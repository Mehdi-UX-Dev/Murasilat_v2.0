"use client";
import SearchBar from "@/components/UI_Organisms/docs_pages/searchBar";
import { getShelf } from "@/context/features/docsHard_scan_archive_Slice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import Link from "next/link";
import React, { useEffect } from "react";
import { IoFileTrayStackedOutline } from "react-icons/io5";

function page({
  params: { locale, year },
}: {
  params: { locale: string; year: number };
}) {
  const dispatch = useAppDispatch();
  const { shelf } = useAppSelector((store) => store.docsHard_scan_archive);

  useEffect(() => {
    dispatch(getShelf({ year }));
  }, []);
  return (
    <div>
      <h1 className="font-IranSans font-bold text-3xl text-right mr-5 mb-10">
        دوسیه های سال {year}
      </h1>
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
