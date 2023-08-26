"use client";

import React from "react";
import Morasilat from "../../public/images/Morasilat.png";
import Image from "next/image";
import SideOption from "../UI_Molecules/sidebarOption";
import { MdDashboard, MdFolder } from "react-icons/md";
import SideSubOption from "../UI_Molecules/sideBarSubOption";
import { AiOutlinePlus } from "react-icons/ai";

function SideBar() {
  return (
    <aside className="w-[240px] grid content-betwee shadow-lg h-screen  ">
      {/* Logo */}
      <Image
        src={Morasilat}
        alt="Morasilat"
        height={64}
        width={64}
        className="mx-auto"
      />

      {/* Write Group */}
      <div className="space-y-12">
        <SideOption
          url={"/dashboard"}
          text="Dashboard"
          Icon={MdDashboard}
          hasDropDown={false}
        />

        <div className="space-y-2">
          <SideOption
            url={""}
            text="Write"
            Icon={MdFolder}
            hasDropDown={true}
          />

          <div className="space-y-3" >
            <SideSubOption
              url={"/createMaktoob"}
              text="Maktoob"
              Icon={AiOutlinePlus}
            />
            <SideSubOption
              url={"/createIstilam"}
              text="Pishnihad"
              Icon={AiOutlinePlus}
            />

            <SideSubOption
              url={"/createPishnihad"}
              text="Istilam"
              Icon={AiOutlinePlus}
            />
          </div>
        </div>
      </div>

      {/* History Group */}

      {/* log out function */}
    </aside>
  );
}

export default SideBar;
