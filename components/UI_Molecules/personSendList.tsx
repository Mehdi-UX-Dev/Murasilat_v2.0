import Image from "next/image";
import React from "react";
import photo from "../../public/images/photo.jpg";
type personProps = {
  id: number;
  name: string;
  position: string;
  image: string;
};

function Person({
  setPersonInfo,
}: {
  setPersonInfo: React.Dispatch<React.SetStateAction<personProps[]>>;
}) {
  const handlePersonClick = () => {
    setPersonInfo((info: personProps[]) => [
      ...info,
      {
        id: 1,
        name: "محمد مهدی واحد",
        position: "استاد دستیار",
        image: "../../public/images/photo.jpg",
      },
    ]);
  };

  return (
    <div
      onClick={handlePersonClick}
      className="flex items-center justify-between py-1 hover:bg-primary-300 hover:border-r hover:border-black"
    >
      <div className="font-nazanin pr-4">
        <p className="font-bold">محمد مهدی واحد</p>
        <p className="text-right"> استاد دستیار</p>
      </div>
      <Image
        alt="person photo"
        src={photo}
        className="w-12 h-12 ml-4 rounded-full object-cover"
      />
    </div>
  );
}

export default Person;
