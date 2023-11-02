import { GetQamariDate, GetShamsiDate } from "@/date-converter";
import Image from "next/image";
import React, { useEffect } from "react";
import html2pdf from "html2pdf.js";

import KabulUni from "../../public/images/KabulUni.png";
import MOH from "../../public/images/moh.jpg";
import { useAppSelector } from "@/context/hooks";

function IstilamFormat() {
  const { user } = useAppSelector((store) => store.user);
  // useEffect(() => {
  //  const container = document.getElementById("container")
  //   html2pdf(container)
  // },[])

  return (
    <div
      id="container"
      className="bg-slate-5 w-full min-h-screen h-auto bg-slate-50 p-8 mx-4  "
    >
      {/* Header */}
      <div className="flex flex-col ">
        <div className="flex justify-between items-start">
          <Image
            src={KabulUni}
            width={100}
            height={100}
            alt="university logo"
            className="bg-slate-400 rounded-[50%]"
          />
          <div className="flex flex-col text-lg items-center ">
            <span>د کابل پوهنتون ریاست</span>
            <span>Kabul University</span>
            <span>{user?.authority}</span>
            <span>{user?.title}</span>
          </div>
          <Image
            src={MOH}
            width={100}
            height={100}
            alt="ministry logo"
            className="bg-slate-400 rounded-[50%]"
          />
        </div>
        <div className="flex text-lg flex-col items-end">
          <p>
            شماره:
            <span className="opacity-50 text-base ">
              {" "}
              {/* {data.serial} */}
            </span>{" "}
          </p>
          <p>
            تاریخ: {GetShamsiDate()} ه.ش مطابق به {GetQamariDate()}
            ه.ق
          </p>
        </div>
      </div>
      {/* body */}
      <div className="border border-black h-screen flex mt-8">
        {/* header */}
        <div className="border border-black  w-[600px] ">
          <div className="border-b border-black h-10 text-center">احکام</div>
          <div className="px-4 py-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            sed, consequuntur quos eum nam sit totam quae at ducimus! Autem
            laboriosam nam ullam ex temporibus quas suscipit velit similique
            inventore!
          </div>
        </div>
        {/* body */}
        <div className="border border-black w-[600px]">
          <div className="border-b border-black h-10 text-center">پیشنهاد</div>
          <div className="py-2 px-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum
            voluptas, atque ex dolores voluptate repellendus possimus numquam
            quis nobis dolore itaque sit excepturi doloremque officiis fugit
            ipsa quod odio debitis. Nam excepturi dolorem dicta! Quia
            perspiciatis quidem itaque eum facilis temporibus nam voluptatum
            eius id accusamus iste, vel, eveniet eaque esse, distinctio
            possimus! Perferendis eaque, illo numquam at voluptatibus optio.
            Laborum, consequatur fugiat? Quam aspernatur expedita reprehenderit
            qui, maiores quos soluta laboriosam consectetur placeat, unde
            necessitatibus ducimus alias tempore ullam repellat molestias
            mollitia consequatur ab cumque. Eos aspernatur odio modi? Voluptatum
            sunt nostrum maxime laudantium, dolores a corporis sit inventore
            harum laborum facilis deleniti eos illum asperiores! Magni doloribus
            similique eum quo impedit, nesciunt quisquam, consequuntur officia
            at explicabo laborum. Exercitationem eligendi, perferendis quos quae
            unde magnam, sit rerum nam dolorem quaerat porro facilis sapiente
            autem quas! Temporibus, ut minus! Dolorum ad ullam nobis quod
            repellendus! Aperiam sequi ex nostrum.
          </div>
        </div>
        {/*  */}
        <div className="border border-black w-3">
          <div className="border-b border-black h-10"></div>
        </div>
      </div>
    </div>
  );
}

export default IstilamFormat;

