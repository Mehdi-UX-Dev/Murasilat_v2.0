"use client";

import { Button } from "@/components/UI_Molecules/Button";
import CustomizedSelectComponent from "@/components/pages/documents/customizedSelectComponent";
import TypeGroup from "@/components/pages/documents/documentTypeRadioButtons";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: ["1", "2", "3", "4", "5", "6"] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
    [{ direction: "rtl" }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: true,
  },
};

function Page() {
  const [value, setValue] = useState("");
  return (
    <div className="w-[1136px] mt-6 ">
      {/* <div>
        <h1>ایجاد مکتوب</h1>
      </div> */}

      <div className="border border-primary-400 mb-4">
        <div className="flex justify-between border border-b-0 border-primary-400 py-3 px-4 bg-primary-300 ">
          <p>25/04/1402</p>
          <p>01</p>
        </div>

        <div className="flex items-center border border-b-0 border-primary-300  pl-2 ">
          <TypeGroup />
          <CustomizedSelectComponent />
        </div>

        <input
          type="text"
          className="w-full border border-b-0 border-primary-400 pr-4 py-2"
          placeholder="ایجاد مکتوب"
          dir="rtl"
        />

        {/* the quill editor is still not good in design, needs work */}
        <ReactQuill
          value={value}
          onChange={setValue}
          className="h-[23rem] overflow-hidden"
          theme="snow"
          modules={modules}
          placeholder="ایجاد مکتوب"
          
        />

        <input
          type="text"
          className="w-full border-t  border-primary-400 pr-4 py-2"
          placeholder="ایجاد مکتوب"
          dir="rtl"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <Button intent="secondary" label="ایجاد مکتوب" />
        <Button label="ایجاد مکتوب" size="large" />
      </div>

      {/* <div>
       
      </div> */}
    </div>
  );
}

export default Page;
