"use client";
import Image from "next/image";
import React from "react";
import photo from "../../../public/images/photo.jpg";
import { BsTranslate } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { hideUserInfo } from "@/context/features/documentSlice";

function UserInfo() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const handleChange = () => {};
  const changeLanguage = () => {
    router.push("http://ps.localhost:3000/dashboard");
    console.log(router, pathname);
  };
  const { userInfo } = useAppSelector((store) => store.documents);
  console.log(userInfo);

  return (
    <div className=" z-20   drop-shadow-lg bg-white max-w-5xl py-20 rounded ">
      <GiCancel
        className="absolute left-2 top-3 text-primary-400 cursor-pointer"
        size={32}
        onClick={() => dispatch(hideUserInfo())}
      />
      <div className="flex p-5 space-x-5">
        <div className="p-4 font-nazanin  space-y-4 border-r border-primary-400">
          <div className="space-y-1 text-right">
            <p>{userInfo.faculty}</p>
          </div>
          <div className="text-right">
            <p className="text-primary-500">ایمیل</p>
            <p className="border-b w-full  text-left">{userInfo?.email}</p>
          </div>
          {/* language  */}
          <div className="text-right text-primary-700 font-semibold">
            <div className="flex items-center justify-between mb-1">
              <BsTranslate size={20} />
              <label htmlFor="language" className="text-xl font-rounded">
                زبان
              </label>
            </div>
            <select
              dir="rtl"
              className="w-full border-b ring-0 outline-none  "
              name="language"
              id="language"
              onChange={changeLanguage}
            >
              <option value="" hidden>
                {/* the preferred lang will come here from the server */}
              </option>
              <option value="persian">دری</option>
              <option value="pashto">پشتو</option>
            </select>
          </div>

          <div className=" font-nazanin border-primary-400 p-4 space-y-2 ">
            <div className="text-right">
              {" "}
              <p className="text-primary-500">شماره تماس</p>
              <p className="border-b ">{userInfo?.contact_number}</p>
            </div>
          </div>
        </div>

        <div className=" py-2 space-y-2">
          <Image
            src={userInfo.profile_pic}
            width={160}
            height={160}
            alt="person photo"
            className="w-40 h-40 rounded-full object-cover mx-auto"
          />
          <div className="text-center space-y-1">
            <p className="font-bold font-IranSans text-2xl text-center">
              {userInfo?.fullname}
            </p>

            <p className="font-bold font-IranSans text-2xl text-center">
              {userInfo?.faculty}
            </p>

            <p className=" font-IranSans  text-center">
              {userInfo?.authority.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
