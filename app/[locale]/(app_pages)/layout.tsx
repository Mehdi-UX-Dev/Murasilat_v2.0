"use client";
const ID = React.lazy(() => import("@/components/UI_Organisms/write_page/ID"));
const SideBar = React.lazy(
  () => import("@/components/UI_Organisms/write_page/sidebar")
);
import UserInfo from "@/components/UI_Organisms/user/userInfo";
import SideBarSuspense from "@/components/suspenseOrganisms/sideBarSuspense";
import { Credentials } from "@/hooks/credentialsContext";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/i18n-server";
import { usePathname } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { useMyContext } from "../../../hooks/credentialsContext";

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

type Write_Page_Doc_Type = {
  create_maktoob: string;
  create_istilam: string;
  create_pishniahd: string;
};

export default function DashboardLayout({
  children, // will be a page or nested layout
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const myContext = useMyContext();
  const [userModuleState, setModuleState] = useState(false);
  const path = usePathname();
  const [lang, setLang] = useState<langProps | undefined>(undefined);
  const [writePageDocType, setWritePageDocType] = useState<
    Write_Page_Doc_Type | undefined
  >(undefined);
  const writePageDocTypePathChecker = /^\/write/;

  useEffect(() => {
    (async () => {
      // ?! shoudl i fetch these two reqs seperately
      const res = (await getDictionary(locale)).dashboard;
      setLang(res);
    })();
  }, [locale]);

  useEffect(() => {
    (async () => {
      const writePageDocTypeResponse = (await getDictionary(locale)).Write_Page;

      setWritePageDocType(writePageDocTypeResponse);
    })();
  }, [locale]);

  return (
    <Credentials.Provider value={{ userModuleState, setModuleState }}>
      <div className="flex  flex-row-reverse   ">
        {/* Include shared UI here e.g. a header or sidebar */}

        <Suspense fallback={<SideBarSuspense />}>
          {lang && <SideBar lang={lang} />}
        </Suspense>

        <div className="grow pt-8">
          <div className="flex justify-between mr-[256px] items-center">
            <ID setModuleState={setModuleState} />
            {writePageDocTypePathChecker.test(path) && (
              <p className="mr-8 font-IranSans text-3xl font-bold">
                {path === "/create/createMaktoob"
                  ? writePageDocType?.create_maktoob
                  : path == "/create/createIstilam"
                  ? writePageDocType?.create_istilam
                  : writePageDocType?.create_pishniahd}
              </p>
            )}
          </div>

          {children}
        </div>
      </div>
    </Credentials.Provider>
  );
}
