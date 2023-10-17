import Image from "next/image";
import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import photo from "../../public/images/photo.jpg";
import { selectReceiver } from "@/context/features/documentSlice";
import { useAppDispatch } from "@/context/hooks";

function SelectedPerson({ ...info }: any) {
  const dispatch = useAppDispatch();

  const handlePersonRemoval = () => {
    dispatch(selectReceiver(null));
  };

  return (
    <div className="flex items-center bg-primary-300 p-2 rounded-full">
      <Image
        alt="person photo"
        src={info.profile_pic}
        className=" object-cover rounded-full ml-2"
        height={24}
        width={24}
      />
      <p className="font-bold">{info.fullname}</p>
      {/* maximum 6 person  or may be flex wrap  */}
      <MdOutlineCancel onClick={handlePersonRemoval} />
    </div>
  );
}

export default SelectedPerson;
