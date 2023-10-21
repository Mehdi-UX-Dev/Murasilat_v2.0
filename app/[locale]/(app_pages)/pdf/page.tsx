"use client";

import { Button } from "@/components/UI_Molecules/Button";
import React from "react";
import KabulUni from "../../../../public/images/KabulUni.png";
import Image from "next/image";
import MOH from "../../../../public/images/moh.jpg";

import { GetQamariDate, GetShamsiDate } from "../../../../date-converter";
import { useAppSelector } from "@/context/hooks";

function PDF() {
  const { loading, user } = useAppSelector((store) => store.user);
  // const {pdf} = useAppSelector(store => store.documents)
  // console.log(pdf.pdfContent);

  return (
    <div className="w-full min-h-screen h-auto bg-white p-8">
      <div className="bg-slate-50 rounded shadow flex flex-col p-8">
        {/* Header */}
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-start">
            <Image
              src={KabulUni}
              width={100}
              height={100}
              alt="university logo"
              className="bg-slate-400 rounded-[50%]"
            />
            <div className="flex flex-col text-lg items-center ">
              <span>د کابل پوهنتون ریاست</span>
              <span>Kabul University</span>
              <span>{user?.authority}</span>
              <span>{user?.title}</span>
            </div>
            <Image
              src={MOH}
              width={100}
              height={100}
              alt="ministry logo"
              className="bg-slate-400 rounded-[50%]"
            />
          </div>
          <div className="flex text-lg flex-col items-end">
            <p>
              شماره:
              <span className="opacity-50 text-base ">
                {" "}
                به صورت خودکار اظافه میشود
              </span>
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
          {/* Meta */}

          {/*Editor */}
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
            <p>ایمیل: {user?.email}</p>
          </div>
        </div>
      </div>
      <div className="p-8 w-full space-x-4 flex justify-end">
        <Button
          intent={"secondary"}
          size={"medium"}
          width={"half"}
          label="لغو"
        />
        <Button
          intent={"primary"}
          size={"medium"}
          width={"half"}
          label="ارسال"
        />
      </div>
    </div>
  );
}

export default PDF;
