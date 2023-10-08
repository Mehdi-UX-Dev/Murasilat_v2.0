import { selectReceiver } from "@/context/features/documentSlice";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

function Person({ info }: { info: any }) {
  const dispatch = useDispatch();
  const handlePersonClick = () => {
    dispatch(selectReceiver(info));
  };

  return (
    <div
      onClick={handlePersonClick}
      className="flex items-center justify-between py-1 hover:cursor-pointer hover:bg-primary-300 hover:border-r hover:border-black border-b border-black"
    >
      <div className="font-nazanin pr-4">
        <p className="font-bold">{info.fullname}</p>
        <p className="text-right"> {info.authority.title}</p>
      </div>
      <Image
        alt="person photo"
        src={info.profile_pic}
        className=" ml-4 rounded-full object-cover"
        width={48}
        height={48}
      />
    </div>
  );
}

export default Person;
