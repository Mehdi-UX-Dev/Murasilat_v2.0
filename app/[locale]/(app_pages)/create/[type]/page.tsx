"use client"

import { Button } from "@/components/UI_Molecules/Button";
import TypeGroup from "@/components/UI_Molecules/documentTypeRadioButtons";
import CustomizedSelectComponent from "@/components/UI_Organisms/create_pages/customizedSelectComponent";
import modules from "../../../../../Quill.module.";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../../../app/quill.rtl.css";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  calendar: "persian",
};

type DocumentTypeProps = {
  params: { type: string };
};

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

function Page() {
  // Create a new Date object representing the current date
  const shamsiDate = new Date().toLocaleDateString("fa-IR", options);

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

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;
    setDocValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
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
          placeholder="ایجاد مکتوب"
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
          placeholder="ایجاد مکتوب"
        />

        <input
          type="text"
          className="w-full border-t  border-primary-400 pr-4 py-2"
          placeholder="ایجاد مکتوب"
          dir="rtl"
          name="summary"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <Button intent="secondary" label="ایجاد مکتوب" />
        <Button label="ایجاد مکتوب" size="large" />
      </div>
      {/*  */}
    </form>
  );
}

export default Page;
