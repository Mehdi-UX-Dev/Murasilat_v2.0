"use client";

import Card from "@/components/UI_Organisms/write_page/Card";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { getDictionary } from "@/i18n-server";
import { useMyContext } from "@/hooks/credentialsContext";
import UserInfo from "@/components/UI_Organisms/user/userInfo";
import DashboardButton from "@/components/UI_Molecules/dashboradCreateButton";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { langProps_DASHBOARD, localeProps } from "@/universalTypes";
import axios from "axios";

function Dashboard({ params: { locale } }: localeProps) {
  const myContext = useMyContext();
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

  const [documents, setDocuments] = useState<object[]>([]);
  console.log(documents);
  

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/documents/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("TOKENS"))?.access,
          accept: "application/json",
        },
      })
      .then(
        (res) => {
          console.log(res.data);
          setDocuments(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
  }, []);

  return (
    lang && (
      <div className=" space-y-8">
        {/* //? can not the user info be used in the layout ?? */}
        {myContext?.userModuleState && (
          <div className=" fixed inset-0 z-20  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  ">
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
