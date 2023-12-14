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
import ForwardSelectComponent from "../UI_Organisms/write_page/ForwardSelectComponent";
import { GiCancel } from "react-icons/gi";
import { saveBroadCast } from "@/context/features/broadcastSlice";
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
  const [showModal, setShowModal] = useState(false);

  let state = "";
  switch (pdf.state) {
    case "approved":
      state = "تایید شد";
      break;
    case "unread":
      state = "جدید";
      break;
    case "draft":
      state = "برای تایید";
      break;
    case "normal":
      state = "ثبت وارده و پروسس";
      break;
    case "to_process":
      state = "راجع به اداره مربوطه";
      break;
    case "to_order":
      state = "راجع برای احکام";
      break;
    case "archived":
      state = "آرشیف";
      break;
  }

  return Object.keys(pdf).length ? (
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
        {pdf?.forwarded && (
          <div className="px-4 py-2 -rotate-45 absolute top-64 left-6">
            <p className="w-full bg-myAccent-error-300 text-white px-8">
              راجع شده
            </p>
          </div>
        )}
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

      {pdf.document_type !== "broadcast" && !pdf.forwarded && (
        <div className="absolute bg-myAccent-error-300 text-white top-80 left-14 ">
          <h1 className="font-bold py-2 px-3 rounded font-nazanin">{state}</h1>
        </div>
      )}

      {pdf.document_type === "broadcast" && !pdf.read && (
        <div className="absolute  top-80 left-14">
          <Button
            label="ثبت متحدالمال "
            handleClick={() =>
              dispatch(
                saveBroadCast({
                  serial: pdf.serial,
                  callback: () => {
                    toast.success("متحدالمال موفقانه ثبت شد");
                  },
                })
              )
            }
          />
        </div>
      )}

      {pdf?.attachments?.length && (
        <div className="flex justify-end ">
          <Button label="نمایش ضمیمه ها" handleClick={togglePortal} />
        </div>
      )}

      {pdf?.attachments?.length &&
        showAttachments &&
        pdf.attachments.map((item: any) => (
          <div>
            <PDFViewer pdfUrl={item.attachment} />
          </div>
        ))}

      {showModal ? (
        <div className="fixed inset-0 overflow-auto bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center h-screen ">
          {pdf.state === "approved" && (
            <form
              className=" bg-white px-14 py-8 max-w-md space-y-4 "
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
              <GiCancel
                className="hover:cursor-pointer"
                size={24}
                onClick={() => setShowModal(false)}
              />

              <h1 className="text-lg font-bold font-IranSans text-right">
                ثبت صادره و ارسال
              </h1>

              <InputField
                label="خلاصه"
                name="summary"
                fullWidth
                inputType="text"
                state={"Default"}
                direction={"rtl"}
              />
              <InputField
                label="ملاحظات"
                name="remarks"
                fullWidth={false}
                inputType="text"
                state={"Default"}
                direction={"rtl"}
              />
              <Button
                intent={"primary"}
                label="ارسال"
                type="submit"
                width={"full"}
              />
            </form>
          )}

          {pdf.state === "unread" && (
            <form
              className=" bg-white px-14 py-8 max-w-md space-y-4 "
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
              <GiCancel
                className="hover:cursor-pointer"
                size={24}
                onClick={() => setShowModal(false)}
              />
              <h1 className="font-bold text-lg font-IranSans">
                {user?.role === "deputy"
                  ? "ثبت وارده و ارسال به احکام"
                  : "ثبت وارده"}
              </h1>
              <InputField
                label="خلاصه"
                name="summary"
                fullWidth={false}
                inputType="text"
                state={"Default"}
                direction={"rtl"}
              />
              <InputField
                label="ملاحظات"
                name="remarks"
                fullWidth={false}
                inputType="text"
                state={"Default"}
                direction={"rtl"}
              />
              <Button
                intent={"primary"}
                label={
                  user?.role === "deputy"
                    ? "ثبت وارده و ارسال به احکام"
                    : "ثبت وارده"
                }
                type="submit"
              />
            </form>
          )}

          {pdf.state === "to_order" && (
            <form
              className=" bg-white px-14 py-8 max-w-md space-y-4 "
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
              <GiCancel
                className="hover:cursor-pointer"
                size={24}
                onClick={() => setShowModal(false)}
              />

              <h1>ثبت احکام و پروسس</h1>

              <InputField
                label="احکام"
                name="orders"
                fullWidth={false}
                inputType="text"
                state={"Default"}
                direction={"rtl"}
              />
              <Button
                intent={"primary"}
                label="ثبت احکام و پروسس"
                type="submit"
              />
            </form>
          )}

          {pdf.state === "to_process" &&
            user?.role === "deputy" &&
            pdf?.receiver?.authority?.title === user?.authority && (
              <div className=" bg-white px-14 py-8 max-w-md space-y-4 ">
                <GiCancel
                  className="hover:cursor-pointer"
                  size={24}
                  onClick={() => setShowModal(false)}
                />

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
            <form
              className=" bg-white px-14 py-8 max-w-md space-y-4 "
              onSubmit={(event: any) => {
                event.preventDefault();
                const fd = new FormData(event.target);
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
              <GiCancel
                className="hover:cursor-pointer"
                size={24}
                onClick={() => setShowModal(false)}
              />
              <h1 className="font-bold font-IranSans text-lg">
                تایید مکتوب برای صادر شدن
              </h1>
              <InputField
                name="remarks"
                fullWidth
                direction={"rtl"}
                inputType="text"
                state={"Default"}
                placeholder="نظر خود را بنویسید"
              />
              <Button
                intent={"primary"}
                label="تایید"
                type="submit"
                width={"full"}
              />
            </form>
          )}
        </div>
      ) : (
        pdf.state !== "archived" &&
        pdf.document_type === "maktoob" && (
          <div className="absolute top-[370px] left-14">
            <Button
              label="اجرا پروسه بعدی"
              handleClick={() => setShowModal(true)}
              size={"large"}
            />
          </div>
        )
      )}
    </div>
  ) : (
    <div className="font-bold text-xl text-center font-IranSans ">
      فایل خالی
    </div>
  );
}

export default MaktoobFormat;
