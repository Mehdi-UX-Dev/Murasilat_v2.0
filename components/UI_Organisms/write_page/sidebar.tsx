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
import { logout } from "@/context/features/loginSlice";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/context/hooks";
import SideBarProfile from "@/components/UI_Molecules/sideBarProfile";

function SideBar({ ...lang }: langProps_SideBar) {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(logout());
    router.push("/");
  };



  const dashboardPath = path === "/dashboard";
  const archivePath = /^\/archive\//.test(path);

  return (
    <aside className="w-[240px] border-l grid  h-screen max-h-screen content-between  ">
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
          customClassName="pl-4"
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
            url={"/write/writeMaktoob"}
            text={lang?.maktoob}
            Icon={AiOutlinePlus}
          />
          <SideSubOption
            url={"/write/writeIstilam"}
            text={lang?.istilam}
            Icon={AiOutlinePlus}
          />

          <SideSubOption
            url={"/write/writePishnihad"}
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
            url={"/archive/recents"}
            text={lang?.recents}
            Icon={FaHistory}
            customClassName="pl-6"
          />
          <SideSubOption
            url={"/archive/sadira"}
            text={lang?.all_sadira}
            Icon={MdOutgoingMail}
            hasType="sadira"
          />

          <SideSubOption
            url={"/archive/warida"}
            text={lang?.all_warida}
            Icon={RiMailDownloadFill}
            hasType="warida"
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
      {dashboardPath && (
        <div className="flex justify-center items-center text-primary-400">
          <BiLogOut size={24} />
          <Button
            label={lang?.log_out}
            intent="tertiary"
            size="large"
            type="button"
            handleClick={handleLogOut}
          />
        </div>
      )}

      {archivePath && <SideBarProfile buttonLabel={lang?.log_out} showProfile={lang.show_profile} />}
    </aside>
  );
}

export default SideBar;
