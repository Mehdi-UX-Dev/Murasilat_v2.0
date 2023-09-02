import DashboardButton from "@/components/UI_Molecules/dashboradCreateButton";
import Card from "@/components/UI_Organisms/Card";
import React from "react";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/i18n-server";

type PageProps = {
  params: { locale: Locale };
};

async function Dashboard({ params: { locale } }: PageProps) {
  const lang = (await getDictionary(locale)).dashboard;


  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <DashboardButton lang={lang}  type="maktoob" path="/maktoob" />
        <DashboardButton lang={lang} type="istilam" path="/istilam" />
        <DashboardButton lang={lang} type="iishnihad" path="/pishnihad" />
      </div>

      <Card />
    </div>
  );
}

export default Dashboard;
