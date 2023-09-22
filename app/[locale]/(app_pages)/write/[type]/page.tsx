"use client";

import { Button } from "@/components/UI_Molecules/Button";
import TypeGroup from "@/components/UI_Molecules/documentTypeRadioButtons";
import CustomizedSelectComponent from "@/components/UI_Organisms/write_page/customizedSelectComponent";
import modules from "../../../../../Quill.module.";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import "../../../../../app/quill.rtl.css";
import { getDictionary } from "@/i18n-server";
import UserInfo from "@/components/UI_Organisms/user/userInfo";
import { useMyContext } from "../../../../../hooks/credentialsContext";
import { GetShamsiDate } from "@/date-converter";
import PDFTemplate from "@/components/pdf/pdfTemplate";
import {
  langProps_PDF,
  langProps_WRITE,
  localeProps,
  writtenDocumentValues_PROPS,
} from "@/universalTypes";

function Page({ params: { locale } }: localeProps) {
  const myContext = useMyContext();
  // Create a new Date object representing the current date
  const shamsiDate = GetShamsiDate();

  const [docValue, setDocValue] = useState<writtenDocumentValues_PROPS>({
    date: shamsiDate,
    docNumber: 1,
    docType: "normal",
    quillValue: "",
    recieverList: [],
    title: "",
    summary: "",
  });

  const handleDocSumbit = () => {
    fetch("", {});
  };

  const [lang, setLang] = useState<langProps_WRITE>();
  const [pdfLang, setPdfLang] = useState<langProps_PDF>();
  const [showPdfModal, setShowPdfModal] = useState(false);

  useEffect(() => {
    (async () => {
      const writePageDocTypeResponse = (await getDictionary(locale)).Write_Page;
      setLang(writePageDocTypeResponse);
    })();
  }, [locale]);

  useEffect(() => {
    (async () => {
      const res = (await getDictionary(locale)).pdf;
      setPdfLang(res);
    })();
  }, [locale]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;
    setDocValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDocumentPreviewModal: React.MouseEventHandler<
    HTMLButtonElement
  > = (event) => {
    event.preventDefault();
    setShowPdfModal(true);
  };

  const handleNot: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    console.log("in the not");
  };

  return showPdfModal ? (
    <div
      onClick={() => {
        setShowPdfModal(false);
      }}
    >
      <div className="  fixed inset-0 overflow-auto bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
        <PDFTemplate {...pdfLang} body={docValue.quillValue} />
      </div>
    </div>
  ) : (
    <div>
      {myContext?.userModuleState && (
        <div className=" fixed inset-0  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  ">
          <UserInfo />
        </div>
      )}
      {/*  */}
      <form onSubmit={handleDocSumbit} className="w-[1136px] mt-12 ml-24 mr-[256px]  ">
        <div className="border border-primary-400 mb-4">
          <div className="flex justify-between border border-b-0 border-primary-400 py-3 px-4 bg-primary-300 font-bold">
            <p>{shamsiDate}</p>
            <p>01</p>
          </div>

          <div className="flex items-center border border-b-0 border-primary-300  pl-2 ">
            <TypeGroup setDocValue={setDocValue} />
            <CustomizedSelectComponent
              recieverList={docValue.recieverList}
              setDocValue={setDocValue}
            />
          </div>

          <input
            type="text"
            className="w-full border border-b-0 border-primary-400 pr-4 py-2"
            placeholder={lang?.title}
            dir="rtl"
            onChange={handleInputChange}
            name="title"
          />

          {/* the quill editor is still not good in design, needs work */}
          <ReactQuill
            onChange={(value) => {
              setDocValue((item: writtenDocumentValues_PROPS) => ({
                ...item,
                quillValue: value,
              }));
            }}
            className="h-[23rem] overflow-hidden  "
            theme="snow"
            modules={modules}
          />

          <input
            type="text"
            className="w-full border-t  border-primary-400 pr-4 py-2"
            placeholder={lang?.summary}
            dir="rtl"
            name="summary"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <Button
            intent="secondary"
            label={lang?.preview_draft}
            handleClick={handleDocumentPreviewModal}
          />
          <Button
            label={lang?.send_document}
            size="large"
            handleClick={handleNot}
          />
        </div>
        {/*  */}
      </form>
    </div>
  );
}

export default Page;
