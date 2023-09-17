import { InputField } from "../../../components/UI_Molecules/Input";
import { Button } from "../../../components/UI_Molecules/Button";
import React from "react";
import { useMyContext } from "../../../hooks/credentialsContext";
import { AiFillEye } from "react-icons/ai";
import Image from "next/image";
import photo from "../../../public/images/photo.jpg";
import { PiUserSwitchBold } from "react-icons/pi";

function CardV3() {
  const consumeContext = useMyContext();
  return (
    <div className=" drop-shadow-lg bg-white w-[560px] mx-auto px-4 py-20 ">
      <div className="flex justify-end mr-2">
        <PiUserSwitchBold size={28} className="text-primary-600" />
      </div>
      <div className="max-w-[320px] mx-auto">
        <div className="mx-auto text-center mb-4">
          <Image
            src={photo}
            alt="photo"
            className="rounded-full w-40 h-40 object-cover mx-auto mb-4"
          />
          <h3 className=" font-bold text-xl ">Mohammad Mehdi Wahid</h3>
          <h3 className=" font-semibold text-primary-600">
            Assistant Professor
          </h3>
        </div>
        <div className="relative mb-6">
          <InputField
            inputType={consumeContext?.passwordState ? "text" : "password"}
            label={"password"}
            fullWidth
            state={
              consumeContext?.errorState?.status ? "ErrorState" : "Default"
            }
            name="password"
          />
          <AiFillEye
            onClick={consumeContext?.setShowPasswordState}
            size={16}
            className={"absolute right-2 bottom-3"}
          />
        </div>

        <Button
          type="submit"
          label={"Submit"}
          intent={"primary"}
          size={"medium"}
          fullWidth
        />
      </div>
    </div>
  );
}

export default CardV3;
