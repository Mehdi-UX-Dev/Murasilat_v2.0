"use client";
import Image from "next/image";
import photo from "../../../public/images/photo.jpg";

function ID() {

  return (
    <section className="flex space-x-6 ml-4" >
      <div className="space-y-1 text-right">
        <p className="font-bold font-rounded text-2xl  ">محمد مهدی واحد</p>
        <p className="font-bold text-lg font-rounded text-primary-600">
          کمپیوټر ساینس پوهنځی
        </p>
        <p className="font-bold text-lg font-rounded text-primary-600">
          استاد دستیار
        </p>
      </div>
      <Image
        src={photo}
        alt="image person"
        className="rounded-full object-cover h-20 w-20"
      />
    </section>
  );
}

export default ID;
