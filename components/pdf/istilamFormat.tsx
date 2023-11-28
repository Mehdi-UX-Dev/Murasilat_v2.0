import { GetQamariDate, GetShamsiDate } from "@/date-converter";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";

import KabulUni from "../../public/images/KabulUni.png";
import MOH from "../../public/images/moh.jpg";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  archiveDocument,
  fetchDocumentsBySerial,
  replyDocument,
} from "@/context/features/documentSlice";
import { Button } from "../UI_Molecules/Button";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import { GrDocumentDownload } from "react-icons/gr";
import { toast } from "react-toastify";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],

    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
    [{ direction: "rtl" }, { direction: "ltr" }],
  ],
};

function IstilamFormat({
  type,
  serial,
  locale,
}: {
  type: "broadcast" | "istilam" | "maktoob" | "pishnihad";
  serial: number;
  locale: string;
}) {
  const { user } = useAppSelector((store) => store.user);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDocumentsBySerial({ type, serial }));
  }, []);
  const { replace, back } = useRouter();

  const { pdf, loading } = useAppSelector((store) => store.documents);

  const quillRef = useRef<ReactQuill>(null);
  const [content, setContent] = useState("");
  useEffect(() => {
    if (!quillRef.current) return;
    quillRef.current.editor?.format("align", "right");
    quillRef.current.editor?.format("direction", "rtl");
    quillRef.current.editor?.format("size", "large");
  }, []);

  const handleRespondClick = () => {
    dispatch(
      replyDocument({
        id: serial,
        reply: content,
        callback: () => {
          replace(`/${locale}/archive/warida`);
          toast.success("احکام صادر شد");
        },
      })
    );
  };

  const handleArchiveClick = () => {
    dispatch(
      archiveDocument({
        id: serial,
        callback: () => {
          replace(`/${locale}/archive/sadira`);
          toast.success("موفقانه آرشیف شد");
        },
      })
    );
  };

  const download = () => {
    const PDF_Container = document.getElementById("container");
    html2pdf(PDF_Container);
  };

  return Object.keys(pdf).length ? (
    <div className="relative">
      <div className="flex items-center space-x-2 ">
        <FaArrowLeft
          size={32}
          onClick={() => back()}
          className="hover:cursor-pointer"
        />
        <p className="font-bold text-lg ">برگشت</p>
      </div>
      <div
        id="container"
        className="bg-slate-5 w-full min-h-screen h-auto bg-slate-50 p-8 mx-4  "
      >
        {/* Header */}
        <div className="flex flex-col ">
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
              <span className="opacity-50 text-base "> {pdf?.serial}</span>{" "}
            </p>
            <p>
              تاریخ: {GetShamsiDate()} ه.ش مطابق به {GetQamariDate()}
              ه.ق
            </p>
          </div>
        </div>
        {/* body */}
        <div className="border border-black h-screen flex mt-8">
          {/* header */}
          <div className="border border-black  w-[600px] ">
            <div className="border-b border-black h-10 text-center">احکام</div>
            {pdf?.state === "to_respond" &&
            pdf?.receiver.id === user?.user_id ? (
              <div className="px-4 py-2">
                <ReactQuill
                  ref={quillRef}
                  onChange={(newValue) => {
                    setContent(newValue);
                  }}
                  className="h-[80vh] mb-8"
                  modules={modules}
                  theme="snow"
                  value={content}
                />
              </div>
            ) : (
              <div
                className="py-2 px-4"
                dangerouslySetInnerHTML={{
                  __html: pdf?.reply ? pdf?.reply : "",
                }}
              ></div>
            )}
          </div>
          {/* body */}
          <div className="border border-black w-[600px]">
            <div className="border-b border-black h-10 text-center">
              پیشنهاد
            </div>
            <div
              className="py-2 px-4"
              dangerouslySetInnerHTML={{
                __html: pdf?.request || "",
              }}
            ></div>
          </div>
          {/*  */}
          <div className="border border-black w-3">
            <div className="border-b border-black h-10"></div>
          </div>
        </div>

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
            <p>ایمیل: {pdf?.sender?.email}</p>
          </div>
        </div>
      </div>
      <div className="w-40 ml-96 mt-4">
        {loading ? (
          <div className="bg-primary-700 text-white rounded text-[18px] px-4 py-[12px]">
            <FaSpinner size={22} className="animate-spin m-auto text-white" />
          </div>
        ) : (
          <>
            {pdf.state === "to_respond" &&
              pdf.receiver?.id === user?.user_id && (
                <Button
                  size={"large"}
                  label="جواب"
                  type="button"
                  width={"full"}
                  handleClick={handleRespondClick}
                />
              )}
            {pdf.state === "responded" && pdf.sender?.id === user?.user_id && (
              <Button
                size={"large"}
                label="آرشیف"
                type="button"
                width={"full"}
                handleClick={handleArchiveClick}
              />
            )}
          </>
        )}
      </div>
      <div className="absolute top-44 left-14 ">
        <GrDocumentDownload size={36} onClick={() => download()} />
      </div>
    </div>
  ) : (
    <div className="font-bold text-xl text-center font-IranSans ">
      فایل خالی
    </div>
  );
}

export default IstilamFormat;
