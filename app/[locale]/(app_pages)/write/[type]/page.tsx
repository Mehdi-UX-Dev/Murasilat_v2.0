"use client";

import { Button } from "@/components/UI_Molecules/Button";
import TypeGroup from "@/components/UI_Molecules/documentTypeRadioButtons";
import CustomizedSelectComponent from "@/components/UI_Organisms/write_page/customizedSelectComponent";
import modules from "../../../../../Quill.module.";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../../../app/quill.rtl.css";
import { getDictionary } from "@/i18n-server";
import { Locale } from "@/i18n-config";
import UserInfo from "@/components/UI_Organisms/user/userInfo";
import { useMyContext } from "../../../../../hooks/credentialsContext";
import {GetQamariDate, GetShamsiDate} from "@/date-converter";



export type personProps = {
  id: number;
  name: string;
  position: string;
  image: string;
};

export type DocValueTypes = {
  date: string;
  docNumber: number;
  docType: "normal" | "emergency" | "announcment" | "confidential";
  quillValue: string;
  recieverList: Array<personProps>;
  title: string;
  summary: string;
  file?: File;
};

type Write_Page_Lang_Props = {
  send_document: string;
  preview_draft: string;
  title: string;
  send_to: string;
  summary: string;
  quill_placeholder: string;
};

function Page({ params: { locale } }: { params: { locale: Locale } }) {
  const myContext = useMyContext();
  // Create a new Date object representing the current date
  const shamsiDate = GetShamsiDate()

  const [docValue, setDocValue] = useState<DocValueTypes>({
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

  const [lang, setLang] = useState<Write_Page_Lang_Props>();

  useEffect(() => {
    (async () => {
      const writePageDocTypeResponse = (await getDictionary(locale)).Write_Page;
      setLang(writePageDocTypeResponse);
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
    console.log("in the preview");
  };

  const handleNot: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    console.log("in the not");
  };
  return (
    <div>
      {myContext?.userModuleState && (
        <div className=" fixed inset-0  bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center  ">
          <UserInfo />
        </div>
      )}
      <form onSubmit={handleDocSumbit} className="w-[1136px] mt-6 mx-auto ">
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
            value={docValue.quillValue}
            onChange={(value) =>
              setDocValue((item: DocValueTypes) => ({
                ...item,
                quillValue: value,
              }))
            }
            className="h-[23rem] overflow-hidden  "
            theme="snow"
            modules={modules}
            placeholder={lang?.quill_placeholder}
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
