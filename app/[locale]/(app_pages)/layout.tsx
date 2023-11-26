"use client";
const SideBar = React.lazy(
  () => import("@/components/UI_Organisms/write_page/sidebar")
);
import SideBarSuspense from "@/components/suspenseOrganisms/sideBarSuspense";
import { getDictionary } from "@/i18n-server";
import React, { Suspense, useEffect, useState } from "react";
import { langProps_DASHBOARD, localeProps } from "@/universalTypes";
import Header from "@/components/UI_Organisms/write_page/Header";
import UserInfo from "@/components/UI_Organisms/user/userInfo";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import UnAuthorizedRedirect from "@/components/misc/UnauthorizedRedirect";
import { RxCrossCircled } from "react-icons/rx";
import { hideSearchModalError } from "@/context/features/documentSlice";
import { useRouter } from "next/navigation";
import HeadSideBar from "@/components/UI_Organisms/write_page/headSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
} & localeProps) {
  const [lang, setLang] = useState<langProps_DASHBOARD | undefined>(undefined);
  const { replace } = useRouter();

  const { user } = useAppSelector((store) => store.user);
  const {
    error: { searchDocumentsDashboardPageError },
  } = useAppSelector((store) => store.documents);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).dashboard;
      setLang(res);
    })();
  }, [locale]);

  const { userProfileView } = useAppSelector((store) => store.documents);

  useEffect(() => {
    const expiryDate = new Date(user?.exp * 1000);
    const tokenExpired = new Date() > expiryDate;
    if (tokenExpired) replace(`/${locale}`);
  });

  return user ? (
    <div className=" relative flex  flex-row-reverse ">
      <Suspense fallback={<SideBarSuspense />}>
        {lang && user.role === "head" ? (
          <HeadSideBar locale={locale} {...lang} />
        ) : (
          lang && <SideBar locale={locale} {...lang} />
        )}
      </Suspense>

      {userProfileView && (
        <div className=" fixed inset-0 z-20  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  ">
          <UserInfo />
        </div>
      )}

      {searchDocumentsDashboardPageError && (
        <div className="flex space-x-2 absolute py-2.5 px-5 left-[45%] bg-myAccent-error-500 text-white font-nazanin  top-[10%] max-w-sm  mx-auto z-20 rounded-full">
          <h2>{searchDocumentsDashboardPageError}</h2>
          <RxCrossCircled
            size={24}
            onClick={() => dispatch(hideSearchModalError())}
          />
        </div>
      )}

      <ToastContainer />

      <div className="mt-8 overflow-y-auto mr-4 h-screen grow  ">
        <Header />
        {children}
      </div>
    </div>
  ) : (
    <UnAuthorizedRedirect locale={locale} />
  );
}
