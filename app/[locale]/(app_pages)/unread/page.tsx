"use client";

import { fetchDocuments } from "@/context/features/documentSlice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { GetShamsiDate } from "@/date-converter";
import { getDictionary } from "@/i18n-server";
import { langProps_LIST, localeProps } from "@/universalTypes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page({ params: { locale } }: localeProps) {
  const {
    documents: { unreadDocuments },
  } = useAppSelector((store) => store.documents);
  const dispatch = useAppDispatch();

  const [lang, setLang] = useState<langProps_LIST>();

  useEffect(() => {
    (async () => {
      const lang = (await getDictionary(locale)).list_page;
      setLang(lang);
    })();
  }, []);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, []);

  const { push } = useRouter();

  return (
    lang &&
    (unreadDocuments.length ? (
      <div>
        <h1 className="font-bold text-xl font-IranSans text-right">
          تمام ناخوانده شده ها
        </h1>

        <table
          id="table"
          className="w-11/12 text-center table-auto mt-8 border mx-auto  "
        >
          <thead className="border-b border-primary-500  bg-primary-900 text-white ">
            <tr className=" bg-light font-IranSans hover:cursor-pointer ">
              <th>{lang.date}</th>
              <th>{lang.title}</th>
              <th>{lang.sender}</th>
              <th>گیرنده</th>
              <th>{lang.content}</th>
              <th>{lang.number}</th>
            </tr>
          </thead>
          <tbody className="font-rounded ">
            {unreadDocuments?.map(
              (item: any) => (
                console.log(item),
                (
                  <tr
                    key={item?.serial}
                    className="border-b border-primary-500 hover:bg-primary-400 hover:cursor-pointer py-2"
                    onClick={() =>
                      push(
                        `/per/archive/${item?.document_type}/${item?.serial}`
                      )
                    }
                  >
                    <td>{GetShamsiDate(item?.date)}</td>
                    <td>{item?.title}</td>
                    <td>{item?.sender?.fullname}</td>
                    <td> {item?.receiver?.fullname}</td>
                    <td>{item?.summary}</td>
                    <td>{item?.serial}</td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="font-bold text-xl font-IranSans flex justify-center items-center h-screen">
        سند خوانده نشده موجود نیست
      </div>
    ))
  );
}

export default page;
