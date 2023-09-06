"use client";
import DashboardButton from "@/components/UI_Molecules/dashboradCreateButton";
import Card from "@/components/UI_Organisms/create_pages/Card";
import React, { useEffect, useState } from "react";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/i18n-server";
import { useMyContext } from "@/hooks/credentialsContext";
import UserInfo from "@/components/UI_Organisms/user/userInfo";

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
  const value = useMyContext();

  const [lang, setDashLang] = useState<langProps | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).dashboard;
      setDashLang(res);
    })();
  });

  return (
    <div className="relative space-y-8 blur  ">

      <div className="fixed inset-0  w-full top-1/2  ">
          <UserInfo/>
      </div>
      <div className="flex justify-end space-x-4 text-right mt-8">
        <DashboardButton lang={lang} type="maktoob" path="/maktoob" />
        <DashboardButton lang={lang} type="istilam" path="/istilam" />
        <DashboardButton lang={lang} type="iishnihad" path="/pishnihad" />
      </div>

      <div className="flex justify-end">
        <Card />
      </div>
    </div>
  );
}

export default Dashboard;
