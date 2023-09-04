import Image from "next/image";
import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import photo from "../../public/images/photo.jpg";
import { cx } from "class-variance-authority";
type personProps = {
  id: number;
  name: string;
  position: string;
  image: string;
};

type SelectedPersonProps = {
  removeSelectedPerson: React.Dispatch<React.SetStateAction<personProps[]>>;
  info: {
    id: number;
    name: string;
    position: string;
    image: string;
  };
  length: number;
};

function SelectedPerson({
  removeSelectedPerson,
  info,
  length,
}: SelectedPersonProps) {
  // const filteredData =  prev.filter(list => list.id)

  const handlePersonRemoval = () => {
    removeSelectedPerson((personInfo: personProps[]) =>
      personInfo.filter((list) => list.id != info.id)
    );
  };

  return (
    <div className="flex items-center bg-primary-300 p-2 rounded-full">
      <Image
        alt="person photo"
        src={photo}
        className="w-6 h-6 object-cover rounded-full ml-2"
      />
      <p
        className={cx({
          "font-bold ml-3": length <= 2,
          hidden: length >= 3,
        })}
      >
        محمد مهدی واحد
      </p>
      {/* maximum 6 person  or may be flex wrap  */}
      <MdOutlineCancel onClick={handlePersonRemoval} />
    </div>
  );
}

export default SelectedPerson;
