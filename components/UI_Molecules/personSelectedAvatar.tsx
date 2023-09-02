import Image from "next/image";
import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import photo from '../../public/images/photo.jpg'
type personProps = {id : number,  name: string; position: string; image: string };

function SelectedPerson({removeSelectedPerson} : {removeSelectedPerson : React.Dispatch<React.SetStateAction<personProps[]>>}) {
  return (
    <div className="flex items-center bg-primary-300 p-2 rounded-full">
      <Image
        alt="person photo"
        src={photo}
        className="w-6 h-6 object-cover rounded-full ml-2"
      />
      <p className="font-bold ml-3">محمد مهدی واحد</p>
      <MdOutlineCancel onClick={removeSelectedPerson}/>
    </div>
  );
}

export default SelectedPerson;
