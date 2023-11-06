import { GetQamariDate, GetShamsiDate } from "@/date-converter";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";

import KabulUni from "../../public/images/KabulUni.png";
import MOH from "../../public/images/moh.jpg";
import { useAppSelector } from "@/context/hooks";
import ReactQuill from "react-quill";

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

function IstilamFormat() {
  const { user } = useAppSelector((store) => store.user);
  // useEffect(() => {
  //  const container = document.getElementById("container")
  //   html2pdf(container)
  // },[])

  const quillRef = useRef<ReactQuill>(null);
  const [content, setContent] = useState("");
  useEffect(() => {
    if (!quillRef.current) return;
    quillRef.current.editor?.format("align", "right");
    quillRef.current.editor?.format("direction", "rtl");
    quillRef.current.editor?.format("size", "large");
  }, []);

  return (
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
            <span className="opacity-50 text-base ">
              {" "}
              {/* {data.serial} */}
            </span>{" "}
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
        </div>
        {/* body */}
        <div className="border border-black w-[600px]">
          <div className="border-b border-black h-10 text-center">پیشنهاد</div>
          <div className="py-2 px-4">
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
        </div>
        {/*  */}
        <div className="border border-black w-3">
          <div className="border-b border-black h-10"></div>
        </div>
      </div>
    </div>
  );
}

export default IstilamFormat;
