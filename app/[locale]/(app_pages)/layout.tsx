"use client";
import ID from "@/components/UI_Organisms/create_pages/ID";
import SideBar from "@/components/UI_Organisms/create_pages/sidebar";
import { Credentials } from "@/hooks/credentialsContext";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/i18n-server";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

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
  Create_Maktoob: string;
  Create_Istilam: string;
  Create_Pishniahd: string;
};

export default function DashboardLayout({
  children, // will be a page or nested layout
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const [userModuleState, setModuleState] = useState(false);
  const path = usePathname();
  const [lang, setLang] = useState<langProps | undefined>(undefined);
  const [writePageDocType, setWritePageDocType] =
    useState<Write_Page_Doc_Type>();
  const writePageDocTypePathChecker = /^\/create/;

  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).dashboard;
      setLang(res);
      const writePageDocTypeResponse = (await getDictionary(locale)).Write_Page;
      setWritePageDocType(writePageDocTypeResponse);
    })();
  }, [locale]);
  return (
    <Credentials.Provider value={{ userModuleState, setModuleState }}>
      <div className="flex  flex-row-reverse min-h-screen  ">
        {/* Include shared UI here e.g. a header or sidebar */}
        <SideBar lang={lang} />

        <div className="grow px-8 pt-8">
          <div className="flex items-center">
            <ID setModuleState={setModuleState} />
            {writePageDocTypePathChecker.test(path) && (
              <p className="mr-8 font-IranSans text-3xl font-bold">
                {path === "/create/createMaktoob"
                  ? writePageDocType?.Create_Maktoob
                  : path == "/create/createIstilam"
                  ? writePageDocType?.Create_Istilam
                  : writePageDocType?.Create_Pishniahd}
              </p>
            )}
          </div>

          {children}
        </div>
      </div>
    </Credentials.Provider>
  );
}
