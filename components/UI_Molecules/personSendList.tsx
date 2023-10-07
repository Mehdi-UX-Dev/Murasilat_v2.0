import Image from "next/image";
import React from "react";
import photo from "../../public/images/photo.jpg";

function Person({
  info,
}:  {
  info: any;
}) {

  const handlePersonClick = () => {
    ((info) => ({
      ...info,
      recieverList: [
        ...info.recieverList,
        {
          id: 1,
          name: "محمد مهدی واحد",
          position: "استاد دستیار",
          image: "../../public/images/photo.jpg",
        },
      ],
    }));
  };

  return (
    <div
      onClick={handlePersonClick}
      className="flex items-center justify-between py-1 hover:bg-primary-300 hover:border-r hover:border-black"
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
