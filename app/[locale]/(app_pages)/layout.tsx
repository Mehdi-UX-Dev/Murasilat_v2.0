"use client";
const ID = React.lazy(() => import("@/components/UI_Organisms/write_page/ID"));
const SideBar = React.lazy(
  () => import("@/components/UI_Organisms/write_page/sidebar")
);
import SideBarSuspense from "@/components/suspenseOrganisms/sideBarSuspense";
import { Context } from "@/hooks/credentialsContext";
import { getDictionary } from "@/i18n-server";
import { usePathname } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import {
  langProps_DASHBOARD,
  localeProps,
  writtenDocumentTypeProps_LAYOUT,
} from "@/universalTypes";

export default function DashboardLayout({
  children, // will be a page or nested layout
  params: { locale },
}: {
  children: React.ReactNode;
} & localeProps) {
  const [userModuleState, setModuleState] = useState(false);
  const path = usePathname();
  const [lang, setLang] = useState<langProps_DASHBOARD | undefined>(undefined);
  const [writePageDocType, setWritePageDocType] = useState<
    writtenDocumentTypeProps_LAYOUT | undefined
  >(undefined);
  const writePagePathChecker = /^\/write/;
  const archivePagePathChecker = /^\/archive/;

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
    <div className="flex  flex-row-reverse ">
      {/* Include shared UI here e.g. a header or sidebar */}

      <Suspense fallback={<SideBarSuspense />}>
        {lang && <SideBar {...lang} />}
      </Suspense>

      <Context.Provider value={{ userModuleState, setModuleState }}>
        {/* //? why does adding the class overflow work in here */}
        <div className="mt-8 mr-4 overflow-auto">
          <div className="flex justify-between items-center">
            <ID setModuleState={setModuleState} />
            {writePagePathChecker.test(path) && (
              <p className="mr-8 font-IranSans text-3xl font-bold">
                {path === "/create/createMaktoob"
                  ? writePageDocType?.create_maktoob
                  : path == "/create/createIstilam"
                  ? writePageDocType?.create_istilam
                  : writePageDocType?.create_pishniahd}
              </p>
            )}

            {archivePagePathChecker.test(path) && (
              <h1 className="font-IranSans text-4xl ">لیست تمام صادره</h1>
            )}
          </div>
          <div className="">{children}</div>
        </div>
      </Context.Provider>
    </div>
  );
}
