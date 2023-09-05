import Image from "next/image";
import React from "react";
import photo from "../../../public/images/photo.jpg";

function UserInfo() {
  return (
    <div className=" space-x-8 max-w-3xl mx-auto bg-white drop-shadow-lg py-8 px-16">
      <div className="border-r border-black ">
        <Image src={photo} alt="person " className="w-32 h-32 rounded-full object-cover" />
      </div>

      <div className="flex flex-col border-r borderlack pr-4">
        
        <input type="text" className="border" value={'ahmad'} />
        <input type="text" className="border" value={'ajamal'} />
        <input type="text" className="border" value={'ahmdai'} />
      </div>

      <div className="flex flex-col">
        <input type="text" className="border" value={'adhmad'} />
        <input type="text" className="border"  value={'hidh'}/>
        <input type="text" className="border" value={'dhidi'} />
      </div>
    </div>
  );
}

export default UserInfo;
