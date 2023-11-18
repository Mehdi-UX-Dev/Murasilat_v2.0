"use client";

import { Button } from "@/components/UI_Molecules/Button";
import { InputField } from "@/components/UI_Molecules/Input";
import { addFile } from "@/context/features/docsHard_scan_archive";
import { useAppDispatch } from "@/context/hooks";
import { cx } from "class-variance-authority";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

type contentType = {
  title?: string;
  serial?: number;
  case_no?: number;
  year?: number;
  file?: File;
};

function page() {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState<contentType | undefined>(undefined);
  const submit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(addFile({ content, callback: () => {} }));
  };

  const handleInputChange = (value: string, name: string) => {
    setContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className={cx(" mx-auto shadow-md flex justify-center", {
        "w-[600px]": !content?.file,
        "space-x-6": content?.file,
      })}
    >
      {content?.file && (
        <div className="order-1">
          <iframe
            src={URL.createObjectURL(content?.file)}
            title="File Viewer"
            width="500"
            height="500"
          ></iframe>
        </div>
      )}
      <div className="order-2 ">
        <h1 className="font-IranSans font-bold text-xl text-center pr-6 pt-4">
          اضافه سند جدید
        </h1>
        <form className="w-[340px] mx-auto space-y-5 p-5 " onSubmit={submit}>
          <InputField
            label="عنوان سند"
            name="title"
            fullWidth
            inputType="text"
            state={"Default"}
            handleChange={(value, name) => handleInputChange(value, name)}
            direction={"rtl"}
          />
          <InputField
            label="شماره سند"
            name="serial"
            fullWidth
            inputType="text"
            state={"Default"}
            handleChange={handleInputChange}
          />
          <InputField
            label="شماره دوسیه"
            name="case_no"
            fullWidth
            inputType="text"
            state={"Default"}
            handleChange={handleInputChange}
          />

          <InputField
            label="سال"
            name="year"
            fullWidth
            inputType="text"
            state={"Default"}
            handleChange={handleInputChange}
          />

          <div className="flex items-center  justify-end ">
            <div className="relative order-2 ">
              <label
                htmlFor="selector"
                className="flex w-fit items-center space-x-2 cursor-pointer border border-black  hover:bg-primary-700  hover:text-white font-bold py-3 px-6  rounded-lg"
              >
                <p>انتخاب سند</p>
                <AiOutlinePlus size={16} />
              </label>
              <input
                id="selector"
                type="file"
                name="file"
                className="hidden"
                onChange={(data) => {
                  const file = data.target.files?.[0];
                  if (file) {
                    setContent((prev) => ({
                      ...prev,
                      file: file,
                    }));
                  }
                }}
              />
            </div>
            <p className="order-1 pr-4">{content?.file?.name}</p>
          </div>

          <Button label="ثبت" type="submit" width={"full"} />
        </form>
      </div>
    </div>
  );
}

export default page;
