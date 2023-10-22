"use client";

import { fetchDocumentsBySerial } from "@/context/features/documentSlice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import React, { useEffect } from "react";
import { GetQamariDate, GetShamsiDate } from "../../../../../../date-converter";
import Image from "next/image";
import { logos } from "../../../pdf/imageData";
import { Button } from "@/components/UI_Molecules/Button";
import html2pdf from "html2pdf.js";

function DocumentByID({ params: { type, serial } }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDocumentsBySerial({ type, serial }));
  }, []);

  const { pdf } = useAppSelector((store) => store.documents);

  const download = () => {
    const PDF_Container = document.getElementById("toBePDFContainer");
    html2pdf(PDF_Container);
  };

  let prop = {};
  if (type === "documents") prop = pdf;
  else prop = pdf?.document;

  return (
    <div className="w-full min-h-screen h-auto bg-white p-8">
      <div
        id="toBePDFContainer"
        className="bg-slate-50 rounded shadow flex flex-col p-8"
      >
        {/* Header */}
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-start">
            <Image
              src={logos.university}
              width={100}
              height={100}
              alt="university logo"
              className="bg-slate-400 rounded-[50%]"
            />
            <div className="flex flex-col text-lg items-center ">
              <span>د کابل پوهنتون ریاست</span>
              <span>Kabul University</span>
              <span>{prop?.authority?.title}</span>
              <span>{prop?.sender?.title}</span>
            </div>
            <Image
              src={logos.ministry}
              width={100}
              height={100}
              alt="ministry logo"
              className="bg-slate-400 rounded-[50%]"
            />
          </div>
          <div className="flex text-lg flex-col items-end">
            <p>
              شماره:
              <span className="opacity-50 text-base "> {prop?.serial}</span>
            </p>
            <div className="flex justify-between w-full">
              <p>متحدالمال</p>
              <p>
                تاریخ: {GetShamsiDate()} ه.ش مطابق به {GetQamariDate()}
                ه.ق
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[2px] bg-slate-900" />
        {/* Body */}
        <div className="flex flex-col w-full py-8 h-screen">
          <h1 className="font-bold font-IranSans text-lgl text-right mb-4">
            {prop?.title}
          </h1>
          <div
            className="text-right"
            dangerouslySetInnerHTML={{
              __html: prop?.content || "",
            }}
          ></div>
        </div>
        <div className="w-full h-[2px] bg-slate-900" />
        {/* Footer */}
        <div className="flex justify-between w-full p-4 text-sm font-semibold">
          <div className="flex items-end">
            <div className="h-16 w-16 bg-slate-600 flex items-center justify-center text-center text-slate-50">
              خودکار اظافه میشود
            </div>
            <p className="ml-4">
              لطفا این کود را اسکن نمایید تا فایل مربوطه باز گردد
            </p>
          </div>
          <div className="flex flex-col" dir="rtl">
            <p>آدرس: کارته چهار, کابل - افغانستان</p>
            <p>شماره تماس: 0202222222</p>
            <p>ایمیل: {prop?.sender?.email}</p>
          </div>
        </div>
      </div>
      <div className="p-8 w-full space-x-4 flex justify-end"></div>

      <div>
        <Button label="print" />
        <Button label="Download" handleClick={() => download()} />
      </div>
    </div>
  );
}

export default DocumentByID;
