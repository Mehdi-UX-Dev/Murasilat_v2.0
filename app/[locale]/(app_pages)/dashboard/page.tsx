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
import { BsDot } from "react-icons/bs";
import StackCards from "@/components/UI_Organisms/Card/stackCards";

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

        {/* type is not specified properly in here // may be type is not needed in the first place */}
        <div className="mt-8 mb-16">
          <SearchBar type="" locale={locale} />
        </div>

        <div className="pb-10 space-y-8">
          <StackCards type={"unread"} {...lang} />
          <StackCards type={"sent"} {...lang} />
          <StackCards type={"received"} {...lang} />
        </div>
      </div>
    )
  );
}

export default Dashboard;
