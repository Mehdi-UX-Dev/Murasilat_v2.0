"use client";

import React from "react";
import Morasilat from "../../public/images/Morasilat.png";
import Image from "next/image";
import SideOption from "../UI_Molecules/sidebarOption";
import { MdDashboard, MdFolder, MdOutgoingMail } from "react-icons/md";
import SideSubOption from "../UI_Molecules/sideBarSubOption";
import { AiOutlinePlus } from "react-icons/ai";
import { BsBroadcast, BsEnvelopePlusFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { RiMailDownloadFill } from "react-icons/ri";
import { Button } from "../UI_Molecules/Button";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";

function SideBar() {
  // const router = useRouter();

  const handleLogOut = () => {
    window.localStorage.removeItem("token");
    // router.push("/login");
  };

  return (
    <aside className="w-[240px] shadow-lg grid content-between h-screen pt-4   ">
      {/* Logo */}
      <Image
        src={Morasilat}
        alt="Morasilat"
        height={64}
        width={64}
        className="mx-auto"
      />

      <div className="space-y-10">
        <SideOption
          url={"/dashboard"}
          text="Dashboard"
          Icon={MdDashboard}
          hasDropDown={false}
        />

        {/* Write Group */}
        <div className="space-y-3">
          <SideOption
            url={""}
            text="Write"
            Icon={BsEnvelopePlusFill}
            hasDropDown={true}
          />

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

        {/* Archive Group */}
        <div className="space-y-3">
          <SideOption
            url={""}
            text="Archive"
            Icon={MdFolder}
            hasDropDown={true}
          />

          <SideSubOption
            url={"/createMaktoob"}
            text="Recent"
            Icon={FaHistory}
          />
          <SideSubOption
            url={"/createIstil"}
            text="All Sadira"
            Icon={MdOutgoingMail}
          />

          <SideSubOption
            url={"/createPishnihad"}
            text="All Warida"
            Icon={RiMailDownloadFill}
          />
        </div>

        {/* Broadcast  */}

        <SideOption
          url={"/broadcast"}
          text="Broadcast"
          Icon={BsBroadcast}
          hasDropDown={false}
        />
      </div>

      {/* log out function */}
      <div className="flex pl-10 items-center text-primary-400">
        <BiLogOut size={24} />
        <Button
          label="Log Out"
          intent="tertiary"
          size="large"
          type="button"
          handleClick={handleLogOut}
        />
      </div>
    </aside>
  );
}

export default SideBar;
