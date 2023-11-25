import Image from "next/image";
import React from "react";
import Morasilat from "../../../public/images/Morasilat.png";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import UserInfo from "../user/userInfo";
import { usePathname, useRouter } from "next/navigation";
import SideBarProfile from "@/components/UI_Molecules/sideBarProfile";
import { Button } from "@/components/UI_Molecules/Button";
import { BiLogOut } from "react-icons/bi";
import { logout } from "@/context/features/loginSlice";
import { langProps_SideBar } from "@/universalTypes";

function HeadSideBar({
  locale,
  ...lang
}: langProps_SideBar & { locale: string }) {
  const path = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { userProfileView } = useAppSelector((store) => store.documents);
  const dashboardPath = path === "/per/dashboard" || path === "/ps/dashboard";
  const handleLogOut = () => {
    dispatch(logout());
    router.push(`/${locale}`);

    
  };

  return (
    <aside className="w-[240px] border-l grid  h-screen max-h-screen content-between ">
      <Image
        src={Morasilat}
        alt="Morasilat"
        height={64}
        width={64}
        className="mx-auto"
      />

      {/* log out function */}
      {dashboardPath ? (
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
      ) : (
        <SideBarProfile
          locale={locale}
          buttonLabel={lang?.log_out}
          showProfile={lang.show_profile}
        />
      )}
    </aside>
  );
}

export default HeadSideBar;
