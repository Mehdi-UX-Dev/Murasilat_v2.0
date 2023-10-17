"use client";

import Card from "@/components/UI_Organisms/write_page/Card";
import React, { useEffect, useRef, useState } from "react";
import { getDictionary } from "@/i18n-server";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { langProps_DASHBOARD, localeProps } from "@/universalTypes";
import { fetchDocuments } from "@/context/features/documentSlice";

import { useAppDispatch, useAppSelector } from "@/context/hooks";
import UserInfo from "@/components/UI_Organisms/user/userInfo";
import PDF_DASHBOARD from "@/components/UI_Organisms/modal/showPDFModal";
import SearchBar from "@/components/UI_Organisms/docs_pages/searchBar";

function Dashboard({ params: { locale } }: localeProps) {
  const containerRef = useRef<HTMLDivElement>(null!);

  const scrollLeft = () => {
    containerRef.current.scrollLeft -= 100;
  };

  const scrollRight = () => {
    containerRef.current.scrollLeft += 100;
  };
  const [lang, setDashLang] = useState<langProps_DASHBOARD | undefined>(
    undefined
  );
  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).dashboard;
      setDashLang(res);
    })();
  }, [locale]);

  const { documents, pdf, userProfileView } = useAppSelector(
    (store) => store.documents
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  return (
    lang && (
      <div className=" space-y-8">
        {/* //? can not the user info be used in the layout ?? */}
        {userProfileView && (
          <div className=" fixed inset-0 z-20  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  ">
            <UserInfo />
          </div>
        )}

        {pdf.visible && <PDF_DASHBOARD locale={locale} />}

        <SearchBar/>

        <div className="relative flex  ">
          {" "}
          <AiOutlineLeft
            className="absolute top-1/2 lg:left-2  text-primary-500 bg-primary-400 rounded-full p-1 bg-opacity-20 hover:bg-opacity-70 z-10"
            size={36}
            onClick={scrollLeft}
          />
          <div
            ref={containerRef}
            // transition is not working properly
            className=" transition-transform duration-300 ease-in-out flex  space-x-4 max-w-screen-lg 2xl:max-w-screen-xl   ml-auto  overflow-x-auto py-2 shadow-lg scrollbar-hide "
          >
            {documents.length && <Card {...documents[0]} />}
          </div>
          <AiOutlineRight
            className="absolute lg:right-3 top-1/2 text-primary-500 bg-primary-400 rounded-full p-1 bg-opacity-20 hover:bg-opacity-70 z-10"
            size={36}
            onClick={scrollRight}
          />
        </div>
      </div>
    )
  );
}

export default Dashboard;
