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
  processDocument,
  replyDocument,
} from "@/context/features/documentSlice";
import { Button } from "../UI_Molecules/Button";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import { GrDocumentDownload } from "react-icons/gr";
import { toast } from "react-toastify";
import { InputField } from "../UI_Molecules/Input";

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
  const { replace, back, push } = useRouter();

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
      processDocument({
        id: serial,
        action_type: "reply",
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

    var opt = {
      margin: 0,
      filename: "document.pdf",
      image: { type: "jpeg", quality: 0.2 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "p" },
    };

    html2pdf().set(opt).from(PDF_Container).save();
  };

  console.log(pdf);

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
              <span>د لورو زده کرو وزارت</span>
              <span>د کابل پوهنتون ریاست</span>
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
            {pdf?.state === "to_reply" && pdf?.receiver.id === user?.user_id ? (
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

            <div className="py-2 px-4 space-y-6 ">
              <div className="font-bold text-xl font-IranSans flex space-x-2 justify-end">
                <p>{pdf.receiver.authority.title}</p>
                <p>به مقام محترم</p>
              </div>
              <div
                className=" font-nazanin text-lg text-right "
                dangerouslySetInnerHTML={{
                  __html: pdf?.request || "",
                }}
              ></div>
              {/* <div className="text-right font-bold">
                <p>با احترام</p>
                <p>{pdf.sender.fullname}</p>
                <p>{pdf.sender.title}</p>
              </div> */}
            </div>
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
            {pdf.state === "to_reply" && pdf.receiver?.id === user?.user_id && (
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

      {pdf?.state === "draft" && (
        <div className="flex justify-end ">
          <form
            className="space-y-3 mr-4"
            onSubmit={(event: any) => {
              event.preventDefault();
              const fd = new FormData(event.target);
              dispatch(
                processDocument({
                  id: pdf.serial,
                  action_type: "approve",
                  remarks: fd.get("remarks"),
                  callback: () => {
                    toast.success("تآیید شد");
                    push("/per/dashboard");
                  },
                })
              );
            }}
          >
            <h1 className="font-bold font-IranSans  text-right ">
              نظر خود را بنویسید
            </h1>
            <InputField
              name="remarks"
              fullWidth={false}
              inputType="text"
              state={"Default"}
              direction={"rtl"}
            />
            <Button
              intent={"primary"}
              label="تایید"
              type="submit"
              width={"full"}
            />
          </form>
        </div>
      )}

      {pdf.state === "approved" && (
        <div className="flex justify-end">
          <form
            className="space-y-3 mr-4 "
            onSubmit={(event: any) => {
              event.preventDefault();
              const fd = new FormData(event.target);
              dispatch(
                processDocument({
                  id: pdf.serial,
                  remarks: fd.get("remarks"),
                  summary: fd.get("summary"),
                  action_type: "send",
                  callback: () => {
                    toast.success("ارسال شد");
                    push("/per/dashboard");
                  },
                })
              );
            }}
          >
            <h1 className="font-bold font-IranSans text-right">
              ملاحظات را بنویسید
            </h1>
            <InputField
              name="summary"
              fullWidth={false}
              inputType="text"
              state={"Default"}
              direction={"rtl"}
              placeholder="خلاصه"
            />
            <InputField
              name="remarks"
              fullWidth={false}
              inputType="text"
              state={"Default"}
              placeholder="ملاحظات"
              direction={"rtl"}
            />
            <Button
              width={"full"}
              intent={"primary"}
              label="ارسال"
              type="submit"
            />
          </form>
        </div>
      )}

      {pdf.state === "unread" &&
        pdf?.receiver?.authority?.title === user?.authority && (
          <div className="flex justify-end ">
            <form
              className="space-y-3"
              onSubmit={(event: any) => {
                event.preventDefault();
                const fd = new FormData(event.target);
                dispatch(
                  processDocument({
                    id: pdf.serial,
                    remarks: fd.get("remarks"),
                    summary: fd.get("summary"),
                    action_type: "send_to_reply",
                    callback: () => {
                      toast.success("موفقانه ثبت وارده شد");
                      push("/per/dashboard");
                    },
                  })
                );
              }}
            >
              <h1 className="font-bold font-IranSans text-right ">
                ثبت وارده{" "}
              </h1>
              <InputField
                name="summary"
                inputType="text"
                state={"Default"}
                direction={"rtl"}
                fullWidth
                placeholder="خلاصه"
              />
              <InputField
                name="remarks"
                fullWidth
                inputType="text"
                state={"Default"}
                direction={"rtl"}
                placeholder="ملاحظات"
              />
              <Button
                intent={"primary"}
                label="ثبت وارده و ارسال به احکام"
                type="submit"
                width={"full"}
              />
            </form>
          </div>
        )}

      {pdf.state === "to_resend" &&
        pdf?.receiver?.authority.title === user?.authority && (
          <div className="flex justify-end mr-4">
            <form
              onSubmit={(event: any) => {
                event.preventDefault();
                dispatch(
                  processDocument({
                    id: pdf.serial,
                    action_type: "resend",
                    callback: () => {
                      toast.success("ارسال شد");
                      push("/per/dashboard");
                    },
                  })
                );
              }}
            >
              <Button
                intent={"primary"}
                width={"full"}
                label="ارسال دوباره"
                type="submit"
              />
            </form>
          </div>
        )}
      {pdf.state === "responded" &&
        pdf?.sender?.authority?.title === user?.authority && (
          <div className="flex justify-end ">
            <form
              onSubmit={(event: any) => {
                event.preventDefault();
                dispatch(
                  processDocument({
                    id: pdf.serial,
                    action_type: "archive",
                    callback: () => {
                      toast.success("موفقانه آرشیف شد");
                      push("/per/dashboard");
                    },
                  })
                );
              }}
            >
              <Button
                width={"full"}
                intent={"primary"}
                label="آرشیف"
                type="submit"
              />
            </form>
          </div>
        )}
    </div>
  ) : (
    <div className="font-bold text-xl text-center font-IranSans ">
      فایل خالی
    </div>
  );
}

export default IstilamFormat;
