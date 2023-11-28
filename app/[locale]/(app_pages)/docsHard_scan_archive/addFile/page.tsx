"use client";

import { Button } from "@/components/UI_Molecules/Button";
import { InputField } from "@/components/UI_Molecules/Input";
import { addFile } from "@/context/features/docsHard_scan_archive_Slice";
import { useAppDispatch } from "@/context/hooks";
import { localeProps } from "@/universalTypes";
import { cx } from "class-variance-authority";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

type contentType = {
  title?: string;
  serial?: number;
  shlef_number?: number;
  year?: number;
  archived_document?: File;
};

function page({ params: { locale } }: localeProps) {
  const { replace, back } = useRouter();
  const dispatch = useAppDispatch();
  const [content, setContent] = useState<contentType | undefined>(undefined);
  const submit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(
      addFile({
        content,
        callback: () => {
          replace(`/${locale}/docsHard_scan_archive`);
          toast.success("سند اضافه شد");
        },
      })
    );
  };

  const handleInputChange = (value: string, name: string) => {
    setContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="flex items-center space-x-2 ml-4 ">
        <FaArrowLeft
          size={32}
          onClick={() => back()}
          className="hover:cursor-pointer"
        />
        <p className="font-bold text-lg ">برگشت</p>
      </div>
      <div
        className={cx(" mx-auto shadow-md flex justify-center", {
          "w-[600px]": !content?.archived_document,
          "space-x-6": content?.archived_document,
        })}
      >
        {content?.archived_document && (
          <div className="order-1">
            <iframe
              src={URL.createObjectURL(content?.archived_document)}
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
              handleChange={handleInputChange}
              direction={"rtl"}
            />
            <InputField
              label="شماره سند"
              name="serial"
              fullWidth
              inputType="text"
              state={"Default"}
              handleChange={handleInputChange}
              direction={"rtl"}
            />
            <InputField
              label="شماره دوسیه"
              name="shelf"
              fullWidth
              inputType="text"
              state={"Default"}
              handleChange={handleInputChange}
              direction={"rtl"}
            />

            <InputField
              label="سال"
              name="year"
              fullWidth
              inputType="text"
              state={"Default"}
              handleChange={handleInputChange}
              direction={"rtl"}
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
                  name="archive_document"
                  className="hidden"
                  onChange={(data) => {
                    const file = data.target.files?.[0];
                    if (file) {
                      setContent((prev) => ({
                        ...prev,
                        archived_document: file,
                      }));
                    }
                  }}
                />
              </div>
              <p className="order-1 pr-4">{content?.archived_document?.name}</p>
            </div>

            <Button label="ثبت" type="submit" width={"full"} />
          </form>
        </div>
      </div>
    </>
  );
}

export default page;
