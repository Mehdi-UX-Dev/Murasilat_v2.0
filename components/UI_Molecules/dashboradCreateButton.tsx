import Link from "next/link";
import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";

type props = {
  type: String;
  path: string;
  lang?: {
    document_des: string;
    maktoob?: string;
    istilam?: string;
    pishnihad?: string;
    create?: string;
  };
};

function DashboardButton({ type, path, lang }: props) {
  return (
    <Link href={path}>
      <div className="flex  items-center border border-black h-20 rounded-md py-3 px-4 hover:scale-105 cursor-pointer">
        <AiOutlinePlusCircle className="text-medium" size={36} />
        <div className="pl-4 pr-6">
          <p className="font-bold font-rounded text-[18px] ">
            {lang?.create}{" "}
            {type == "maktoob"
              ? lang?.maktoob
              : type == "istilam"
              ? lang?.istilam
              : lang?.pishnihad}
          </p>
          <p className="text-medium text-[14px]">{lang?.document_des}</p>
        </div>
        <HiOutlineDocumentText size={56} className="text-medium" />
      </div>
    </Link>
  );
}

export default DashboardButton;
