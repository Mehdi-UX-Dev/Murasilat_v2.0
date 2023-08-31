import Image from "next/image";
import React from "react";
import photo from "../../public/images/photo.jpg";

function ID() {
  return (
    <section className="flex space-x-4 justify-end grow">
      <Image
        src={photo}
        alt="image person"
        className="rounded-full object-cover h-20 w-20"
      />
      <div className="space-y-1">
        <p className="font-bold font-rounded text-2xl ">Mohammd Mehdi Wahid</p>
        <p className="font-bold text-lg font-rounded text-primary-600">
          Computer Science Faculty
        </p>
        <p className="font-bold text-lg font-rounded text-primary-600">
          Assistant Professor
        </p>
      </div>
    </section>
  );
}

export default ID;
