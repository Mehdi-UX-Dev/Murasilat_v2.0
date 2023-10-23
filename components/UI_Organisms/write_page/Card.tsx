import React from "react";
import { MdBookmarkBorder } from "react-icons/md";
import Image from "next/image";
import { Button } from "../../UI_Molecules/Button";
import { GetShamsiDate } from "@/date-converter";
import { BsArrowDownCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import {
  saveToBookMark,
  showBookmarkModal,
} from "@/context/features/documentSlice";
function Card(props: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <div className="border  relative flex-shrink-0 border-light shadow-md rounded-md w-[442px] p-8">
      <BsArrowDownCircle
        size={20}
        className="absolute left-1 top-1 rounded-full text-white  bg-green-600  "
      />

      <div className="flex justify-between items-center">
        <div className="text-center">
          <p className="font-bold text-lg">{props?.serial}</p>
          <p className="">{GetShamsiDate(props?.date)}</p>
        </div>

        <div className="flex space-x-[16px]">
          <div className="text-right">
            <p className="font-semibold text-xl">{props?.sender?.fullname}</p>
            <p>{props?.sender?.authority?.title}</p>
          </div>
          <Image
            src={props?.sender?.profile_pic}
            alt="ID"
            className=" object-cover rounded-full"
            width={48}
            height={48}
          />
        </div>
      </div>

      <div className="py-6 space-y-[8px] text-right">
        <h2 className="font-bold text-[24px]">{props?.title}</h2>
        {/* //? should there be a summary */}
        <p className="text-medium">خلاصه: کمیسیون اعطا شد</p>
      </div>

      <div className="flex items-center ml-auto space-x-4">
        <MdBookmarkBorder
          className="hover:scale-110"
          size={48}
          onClick={() => {
            dispatch(showBookmarkModal()),
              dispatch(
                saveToBookMark({
                  documentType: props.document_type,
                  documentId: props.serial,
                })
              );
          }}
        />
        <Button
          intent="secondary"
          label="بخوان"
          size="medium"
          handleClick={() => {
            router.push(`archive/documents/${props.serial}`);
          }}
          width={"full"}
        />
      </div>
    </div>
  );
}

export default Card;
