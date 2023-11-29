import Image from "next/image";
import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";

import { GetQamariDate, GetShamsiDate } from "../../date-converter";
import SabtWarida from "../UI_Organisms/docs_pages/sabtWarida";
import { GrDocumentDownload } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import {
  approveDocumentDraft,
  fetchDocumentsBySerial,
  sendDocumentDraft,
  sendForOrder,
  giveDirections,
  forwardTo,
} from "@/context/features/documentSlice";
import KabulUni from "../../public/images/KabulUni.png";
import MOH from "../../public/images/moh.jpg";
import { Locale } from "@/i18n-config";
import PDFViewer from "./pdfViewer";
import { Button } from "../UI_Molecules/Button";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { InputField } from "../UI_Molecules/Input";
import { toast } from "react-toastify";
import CustomizedSelectComponent from "../UI_Organisms/write_page/customizedSelectComponent";
import ForwardSelectComponent from "../UI_Organisms/write_page/ForwardSelectComponent";
function MaktoobFormat({
  type,
  serial,
  locale,
}: {
  type: "broadcast" | "istilam" | "maktoob" | "pishnihad";
  serial: number;
  locale: Locale;
}) {
  const download = () => {
    const PDF_Container = document.getElementById("toBePDFContainer");
    html2pdf(PDF_Container);
  };

  const { back, push } = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDocumentsBySerial({ type, serial }));
  }, []);

  const { user } = useAppSelector((store) => store.user);
  const { pdf } = useAppSelector((store) => store.documents);
  const [showAttachments, setShowAttachments] = useState(false);
  const togglePortal = () => setShowAttachments(!showAttachments);
  const [forwardReceiver, setForwardReceiver] = useState<any>();

  return (
    <div className="w-full min-h-screen h-auto bg-white p-8 relative">
      <div className="flex items-center space-x-2 ">
        <FaArrowLeft
          size={32}
          onClick={() => back()}
          className="hover:cursor-pointer"
        />
        <p className="font-bold text-lg ">برگشت</p>
      </div>

      <div
        id="toBePDFContainer"
        className="bg-slate-50 rounded shadow flex flex-col p-8 relative"
      >
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
              <span>{pdf?.sender?.authority?.title}</span>
              {/* <span>{pdf?.sender?.title}</span> */}
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
              <span className="opacity-50 text-base "> {pdf?.serial}</span>
            </p>
            <div className="flex justify-end">
              <p>
                تاریخ: {GetShamsiDate()} ه.ش مطابق به {GetQamariDate()}
                ه.ق
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[2px] bg-slate-900 my-4" />
        <div className="px-4 py-2 -rotate-45 absolute top-64 left-6">
          <p className="w-full bg-myAccent-error-300 text-white px-8">
            راجع شده
          </p>
        </div>
        {/* Body */}
        <div className="flex flex-col w-full py-8 h-screen">
          <h1 className="font-bold font-IranSans text-lgl text-right mb-4">
            {pdf?.title}
          </h1>
          <div
            className="text-right"
            dangerouslySetInnerHTML={{
              __html: pdf?.content || "",
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
            <p>ایمیل: {pdf?.sender?.email}</p>
          </div>
        </div>
      </div>
      <div className="p-8 w-full space-x-4 flex justify-end"></div>

      <div className="absolute top-56 left-14 ">
        <GrDocumentDownload size={36} onClick={() => download()} />
      </div>

      {pdf?.attachments?.length && (
        <Button label="نمایش ضمیمه ها" handleClick={togglePortal} />
      )}

      {pdf?.attachments?.length &&
        showAttachments &&
        pdf.attachments.map((item: any) => (
          <div>
            <PDFViewer pdfUrl={item.attachment} />
          </div>
        ))}

      {pdf.state === "approved" && (
        <div>
          <form
            onSubmit={(event: any) => {
              event.preventDefault();
              const fd = new FormData(event.target);
              dispatch(
                sendDocumentDraft({
                  id: pdf.serial,
                  remarks: fd.get("remarks"),
                  summary: fd.get("summary"),
                  callback: () => {
                    toast.success("ارسال شد");
                    push("/per/dashboard");
                  },
                })
              );
            }}
          >
            <InputField
              label="summary"
              name="summary"
              fullWidth={false}
              inputType="text"
              state={"Default"}
            />
            <InputField
              label="remarks"
              name="remarks"
              fullWidth={false}
              inputType="text"
              state={"Default"}
            />
            <Button intent={"primary"} label="ارسال" type="submit" />
          </form>
        </div>
      )}

      {pdf.state === "unread" && (
        <div>
          <form
            onSubmit={(event: any) => {
              event.preventDefault();
              const fd = new FormData(event.target);
              dispatch(
                sendForOrder({
                  id: pdf.serial,
                  remarks: fd.get("remarks"),
                  summary: fd.get("summary"),
                  callback: () => {
                    toast.success("موفقانه ثبت وارده شد");
                    push("/per/dashboard");
                  },
                })
              );
            }}
          >
            <InputField
              label="summary"
              name="summary"
              fullWidth={false}
              inputType="text"
              state={"Default"}
            />
            <InputField
              label="remarks"
              name="remarks"
              fullWidth={false}
              inputType="text"
              state={"Default"}
            />
            <Button
              intent={"primary"}
              label="ثبت وارده و ارسال به احکام"
              type="submit"
            />
          </form>
        </div>
      )}

      {pdf.state === "to_order" && (
        <div>
          <form
            onSubmit={(event: any) => {
              event.preventDefault();
              const fd = new FormData(event.target);
              dispatch(
                giveDirections({
                  id: pdf.serial,
                  orders: fd.get("orders"),
                  callback: () => {
                    toast.success("ثبت احکام و پروسس");
                    push("/per/dashboard");
                  },
                })
              );
            }}
          >
            <InputField
              label="orders"
              name="orders"
              fullWidth={false}
              inputType="text"
              state={"Default"}
            />
            <Button
              intent={"primary"}
              label="ثبت وارده و ارسال به احکام"
              type="submit"
            />
          </form>
        </div>
      )}

      {pdf.state === "to_process" &&
        user?.role === "deputy" &&
        pdf?.receiver?.authority?.title === user?.authority && (
          <div>
            <ForwardSelectComponent
              receiver={forwardReceiver}
              onSelectReceiver={setForwardReceiver}
              documentType="maktoob"
            />
            <Button
              handleClick={() => {
                dispatch(
                  forwardTo({
                    id: pdf.serial,
                    user_ids: [forwardReceiver.id],
                    callback: () => {
                      toast.success("موفقانه راجع شد");
                      push("/per/dashboard");
                    },
                  })
                );
              }}
              intent={"primary"}
              label="راجع"
              type="submit"
            />
          </div>
        )}

      {pdf?.sender?.id !== user?.user_id &&
        !pdf?.read &&
        pdf?.state === "normal" && <SabtWarida locale={locale} />}

      {pdf?.state === "draft" && (
        <div>
          <form
            onSubmit={(event: any) => {
              event.preventDefault();
              const fd = new FormData(event.target);
              console.log(fd.get("remarks"));
              dispatch(
                approveDocumentDraft({
                  id: pdf.serial,
                  remarks: fd.get("remarks"),
                  callback: () => {
                    toast.success("تآیید شد");
                    push("/per/dashboard");
                  },
                })
              );
            }}
          >
            <InputField
              label="remarks"
              name="remarks"
              fullWidth={false}
              inputType="text"
              state={"Default"}
            />
            <Button intent={"primary"} label="تایید" type="submit" />
          </form>
        </div>
      )}
    </div>
  );
}

export default MaktoobFormat;
