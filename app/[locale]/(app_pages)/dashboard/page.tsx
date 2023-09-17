"use client";
// const DashboardButton = React.lazy(() => import( "@/components/UI_Molecules/dashboradCreateButton"))

import Card from "@/components/UI_Organisms/write_page/Card";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/i18n-server";
import { useMyContext } from "@/hooks/credentialsContext";
import UserInfo from "@/components/UI_Organisms/user/userInfo";
import DashboardButton from "@/components/UI_Molecules/dashboradCreateButton";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

type PageProps = {
  params: { locale: Locale };
};

type langProps = {
  dashboard: string;
  write: string;
  maktoob: string;
  istilam: string;
  pishnihad: string;
  archive: string;
  recents: string;
  all_sadira: string;
  all_warida: string;
  broadcast: string;
  create_document: string;
  preview_document: string;
  document_des: string;
  log_out: string;
};

function Dashboard({ params: { locale } }: PageProps) {
  // ? how to destructure the value directly
  const myContext = useMyContext();
  const containerRef = useRef<HTMLDivElement>(null!);

  const scrollLeft = () => {
    containerRef.current.scrollLeft -= 100;
  };

  const scrollRight = () => {
    containerRef.current.scrollLeft += 100;
  }
  const [lang, setDashLang] = useState<langProps | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).dashboard;
      setDashLang(res);
    })();
  }, [locale]);

  return (
    lang && (
      <div className=" space-y-8 mr-[256px]">
        {myContext?.userModuleState && (
          <div className=" fixed inset-0  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  ">
            <UserInfo />
          </div>
        )}

        <div className="flex justify-end space-x-4 text-right mt-8">
          <DashboardButton lang={lang} type="maktoob" path="/maktoob" />
          <DashboardButton lang={lang} type="istilam" path="/istilam" />
          <DashboardButton
            lang={lang}
            type="iishnihad"
            path="/pishnihad"
          />{" "}
        </div>

        <div
          ref={containerRef}
          // transition is not working properly 
          className="relative transition-transform duration-300 ease-in-out flex space-x-4 max-w-7xl overflow-x-auto py-2 shadow-lg scrollbar-hide "
        >
          <AiOutlineLeft
            className="fixed top-1/2 left-8 text-primary-500 bg-primary-400 rounded-full p-1 bg-opacity-70 z-10"
            size={36}
            onClick={scrollLeft}
          />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <AiOutlineRight
            className="fixed top-1/2 right-[260px] text-primary-500 bg-primary-400 rounded-full p-1 bg-opacity-70 z-10"
            size={36}
            onClick={scrollRight}
          />
        </div>
      </div>
    )
  );
}

export default Dashboard;
