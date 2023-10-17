import React from "react";
import { MdBookmarkBorder } from "react-icons/md";
import Image from "next/image";
import { Button } from "../../UI_Molecules/Button";
import { GetShamsiDate } from "@/date-converter";
import { showPreview } from "@/context/features/documentSlice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
function Card(props: any) {
  const { pdf } = useAppSelector((store) => store.documents);
  const dispatch = useAppDispatch();
  return (
    <div className="border flex-shrink-0 border-light shadow-md rounded-md w-[442px] p-8">
      <div className="flex justify-between items-center">
        <div className="text-center">
          <p className="font-bold text-lg">{props.serial}</p>
          <p className="">{GetShamsiDate(props.date)}</p>
        </div>

        <div className="flex space-x-[16px]">
          <div className="text-right">
            <p className="font-semibold">{props.first_name}</p>
            <p>{props.sender.authority.title}</p>
          </div>
          <Image
            src={props.sender.profile_pic}
            alt="ID"
            className=" object-cover rounded-full"
            width={48}
            height={48}
          />
        </div>
      </div>

      <div className="py-6 space-y-[8px] text-right">
        <h2 className="font-bold text-[24px]">{props.title}</h2>
        {/* //? should there be a summary */}
        <p className="text-medium">خلاصه: کمیسیون اعطا شد</p>
      </div>

      <div className="flex items-center ml-auto space-x-4">
        <MdBookmarkBorder size={48} />
        <Button
          intent="secondary"
          label="خواندن"
          size="medium"
          fullWidth
          handleClick={() => dispatch(showPreview())}
        />
      </div>
    </div>
  );
}

export default Card;
