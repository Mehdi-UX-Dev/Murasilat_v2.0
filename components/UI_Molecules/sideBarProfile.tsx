import { getUserProfile, showUserInfo } from "@/context/features/documentSlice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiLogOut, BiSolidUser } from "react-icons/bi";
import { Button } from "./Button";
import { logout } from "@/context/features/loginSlice";
import { useRouter } from "next/navigation";

function SideBarProfile({
  locale,
  buttonLabel,
  showProfile,
}: {
  buttonLabel: string;
  showProfile: string;
  locale: string
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { userInfo } = useAppSelector((store) => store.documents);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const [modal, setShowModal] = useState(false);

  const handleLogOut = () => {
    dispatch(logout());
    router.push(`/${locale}`);
  };

  const showModal = () => {
    setShowModal(!modal);
  };

  return (
    <div className="flex justify-center relative">
      {modal && (
        <div className="bg-white shadow-lg absolute rounded-md -top-28 left-4  ">
          <div
            onClick={() => dispatch(showUserInfo())}
            className="flex justify-end hover:bg-primary-200 hover:border-l-2 hover:border-black items-center text-primary-400 pr-2 border-b w-full "
          >
            <Button
              label={showProfile}
              intent="tertiary"
              size="large"
              type="button"
            />
            <BiSolidUser size={24} />
          </div>
          <div className="flex justify-end hover:bg-primary-200 hover:border-l-2 hover:border-black items-center text-primary-400 pr-2">
            <Button
              label={buttonLabel}
              intent="tertiary"
              size="large"
              type="button"
              handleClick={handleLogOut}
            />
            <BiLogOut size={24} />
          </div>
        </div>
      )}

      <Image
        src={userInfo?.profile_pic}
        alt="profile pic"
        height={48}
        width={48}
        className="object-cover rounded-full  "
        onClick={showModal}
      />
    </div>
  );
}

export default SideBarProfile;
