"use client";
import Image from "next/image";
import React from "react";
import photo from "../../../public/images/photo.jpg";
import { BsTranslate } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { useMyContext } from "../../../hooks/credentialsContext";

// !there is a problem in between the flex and grid of this PAGE at the div 2 and 3rd
//? may be due to the small size of the page i will make it a module which could be shown on instant on list page

function UserInfo() {
  const myContext = useMyContext();
  const handleChange = () => {};
  const handleModuleState = () => myContext?.setModuleState?.(false);
  return (
    <div className=" grid grid-cols-3   drop-shadow-lg bg-white max-w-5xl py-20 rounded ">
      <GiCancel
        className="absolute left-2 top-3 text-primary-400 cursor-pointer"
        size={32}
        onClick={handleModuleState}
      />
      <div className="p-4 font-nazanin  space-y-4 border-r border-primary-400">
        <div className="space-y-1 text-right">
          {" "}
          {/* //* The degree is also of a predefined option  */}
          <label className="text-primary-500 " htmlFor="">
            درجه تحصیل
          </label>
          <input
            type="text"
            value={""}
            className=" adminPageInputStyle"
            readOnly
            dir="rtl"
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1 text-right">
          {" "}
          {/* //* The degree is also of a predefined option  */}
          <label className="text-primary-500 block" htmlFor="">
            دیپارتمنت
          </label>
          <input
            type="text"
            value={""}
            className=" adminPageInputStyle"
            readOnly
            dir="rtl"
            onChange={handleChange}
          />
        </div>
        <div className="text-right">
          {" "}
          <label htmlFor="" className="text-primary-500">
            ایمیل
          </label>
          <input
            type="email"
            value={""}
            className=" adminPageInputStyle"
            readOnly
            dir="rtl"
            onChange={handleChange}
          />
        </div>
        {/* language  */}
        <div className="text-right text-primary-700 font-semibold">
          <div className="flex items-center justify-between mb-1">
            <BsTranslate size={20} />
            <label htmlFor="" className="text-xl font-rounded">
              زبان
            </label>
          </div>
          <select
            dir="rtl"
            className="w-full border-b ring-0 outline-none  "
            name="language"
            id="language"
          >
            <option value="" hidden>
              {/* the preferred lang will come here from the server */}
            </option>
            <option value="persian">دری</option>
            <option value="pashto">پشتو</option>
          </select>
        </div>
      </div>

      <div className="border-r font-nazanin border-primary-400 p-4 space-y-2 grid col-span-1">
        <>
          {" "}
          <label className="text-primary-500 text-right " htmlFor="">
            نام پدر
          </label>
          <input
            type="text"
            value={""}
            className=" adminPageInputStyle"
            readOnly
            dir="rtl"
            onChange={handleChange}
          />
        </>
        <>
          {" "}
          <label className="text-primary-500 text-right" htmlFor="">
            شماره تماس
          </label>
          <input
            type="text"
            value={""}
            className=" adminPageInputStyle"
            readOnly
            dir="rtl"
            onChange={handleChange}
          />
        </>

        <>
          {" "}
          {/* //* The degree is also of a predefined option  */}
          <label className="text-primary-500 text-right" htmlFor="">
            سن
          </label>
          <input
            type="text"
            value={""}
            className="adminPageInputStyle "
            readOnly
            dir="rtl"
            onChange={handleChange}
          />
        </>
        <>
          {" "}
          <label className="text-primary-500 text-right" htmlFor="">
            تذكره
          </label>
          <input
            type="text"
            value={""}
            className=" adminPageInputStyle"
            readOnly
            dir="rtl"
            onChange={handleChange}
          />
        </>
      </div>

      <div className=" py-2 col-span-1 space-y-2  ">
        <Image
          src={photo}
          alt="person photo"
          className="w-40 h-40 rounded-full object-cover mx-auto"
        />
        <div className="text-center space-y-1">
          <input
            className="font-bold font-IranSans text-2xl text-center "
            value={"باهر حکیمی"}
            type="text"
            readOnly
            onChange={handleChange}
          />
          {/* //* the faculty and roles are all predefined so the input will be of a select type   */}
          <input
            type="text"
            className=" text-center"
            value={"کمپیوټر ساینس پوهنځی"}
            onChange={handleChange}
          />
          <input
            type="text"
            className=" text-center"
            value={"امریت دیپارتمنت"}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
