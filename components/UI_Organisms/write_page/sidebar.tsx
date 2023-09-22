import React from "react";
import Morasilat from "../../../public/images/Morasilat.png";
import Image from "next/image";
import { MdDashboard, MdFolder, MdOutgoingMail } from "react-icons/md";
import SideSubOption from "../../UI_Molecules/sideBarSubOption";
import { AiOutlinePlus } from "react-icons/ai";
import { BsBroadcast, BsEnvelopePlusFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { RiMailDownloadFill } from "react-icons/ri";
import { Button } from "../../UI_Molecules/Button";
import { BiLogOut } from "react-icons/bi";
import SideOption from "../../UI_Molecules/sidebarOption";
import { langProps_SideBar } from "@/universalTypes";

function SideBar({ ...lang }: langProps_SideBar) {
  const handleLogOut = () => {
    window.localStorage.removeItem("token");
    // router.push("/login");
  };

  return (
      <aside className="w-[240px] border-l grid h-screen fixed content-between  ">
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
            text={lang?.dashboard}
            Icon={MdDashboard}
            hasDropDown={false}
          />

          {/* Write Group */}
          <div className="space-y-3">
            <SideOption
              url={""}
              text={lang?.write}
              Icon={BsEnvelopePlusFill}
              hasDropDown={true}
            />

            <SideSubOption
              url={"create/createMaktoob"}
              text={lang?.maktoob}
              Icon={AiOutlinePlus}
            />
            <SideSubOption
              url={"create/createIstilam"}
              text={lang?.istilam}
              Icon={AiOutlinePlus}
            />

            <SideSubOption
              url={"create/createPishnihad"}
              text={lang?.pishnihad}
              Icon={AiOutlinePlus}
            />
          </div>

          {/* Archive Group */}
          <div className="space-y-3">
            <SideOption
              url={""}
              text={lang?.archive}
              Icon={MdFolder}
              hasDropDown={true}
            />

            <SideSubOption
              url={"/docs/recents"}
              text={lang?.recents}
              Icon={FaHistory}
            />
            <SideSubOption
              url={"/docs/all_sadira"}
              text={lang?.all_sadira}
              Icon={MdOutgoingMail}
            />

            <SideSubOption
              url={"/docs/all_warida"}
              text={lang?.all_warida}
              Icon={RiMailDownloadFill}
            />
          </div>

          {/* Broadcast  */}

          <SideOption
            url={"/broadcast"}
            text={lang?.broadcast}
            Icon={BsBroadcast}
            hasDropDown={false}
          />
        </div>

        {/* log out function */}
        <div className="flex pl-10 items-center text-primary-400">
          <BiLogOut size={24} />
          <Button
            label={lang?.log_out}
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
