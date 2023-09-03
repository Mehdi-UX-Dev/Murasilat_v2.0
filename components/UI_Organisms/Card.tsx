import React from "react";
import photo from "../../public/images/photo.jpg";
import { MdBookmarkBorder } from "react-icons/md";
import Image from "next/image";
import { Button } from "../UI_Molecules/Button";

function Card() {
  return (
    <div  className="border border-light shadow-md rounded-md w-[442px] p-8 ">
      <div className="flex justify-between items-center">
        <div className="text-center">
          <p className="font-bold text-lg ">01</p>
          <p className="">25/4/1402</p>
        </div>

        <div className="flex  space-x-[16px] ">
          <div className="text-right">
            <p className="font-semibold">باهر حکیمی</p>
            <p>رییس پوهنخی</p>
          </div>
          <Image
            src={photo}
            alt="ID"
            className="w-12 h-12 object-cover rounded-full"
          />
        </div>
      </div>

      <div className=" py-6 space-y-[8px] text-right ">
        <h2 className="font-bold text-[24px] ">عنوان: تصویب کمیسیون</h2>
        <p className="text-medium ">خلاصه: کمیسیون اعطا شد</p>
      </div>

      <div className="flex items-center ml-auto space-x-4  max-w-[240px]  ">
        <MdBookmarkBorder size={48} className="" />
        <Button intent="secondary" label="خواندن" size="medium" fullWidth />
      </div>
    </div>
  );
}

export default Card;
