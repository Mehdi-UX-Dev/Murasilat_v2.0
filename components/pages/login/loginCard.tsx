import React, { useState } from "react";
import { Button } from "@/components/UI_Molecules/Button";
import { InputField } from "@/components/UI_Molecules/Input";
import { AiFillEye } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { BsTranslate } from "react-icons/bs";
import { useCredentialsContext } from "@/hooks/credentialsContext";

type MyComponentProps = {
  // langChange: (param: string) => void;
  // langSetting: boolean;
  // chooseLang: (lang: string) => void;
};

const Card = ({}: MyComponentProps) => {
  const consumeContext = useCredentialsContext();

  // The state for the eye icon to show password
  const [showPasswordState, setShowPasswordState] = useState(false);

  const showPassword = () => {
    setShowPasswordState(!showPasswordState);
  };

  return (
    <div className=" drop-shadow-lg bg-white w-[560px] mx-auto  px-4 py-20 ">
      <section className="relative ">
        <h1 className="font-serif text-4xl text-center font-bold">Log In</h1>
      </section>
      <form onSubmit={consumeContext?.handleSubmit}>
        <div className="space-y-4 max-w-[320px] mx-auto mt-12">
          <div className="relative">
            <InputField
              inputType="text"
              label="Username"
              fullWidth
              state={
                consumeContext?.errorState.status ? "ErrorState" : "Default"
              }
            />
            <FaUserAlt size={16} className={"absolute right-2 bottom-3"} />
          </div>

          <div className="relative">
            <InputField
              inputType={showPasswordState ? "text" : "password"}
              label="password"
              fullWidth
              state={
                consumeContext?.errorState.status ? "ErrorState" : "Default"
              }
            />
            <AiFillEye
              onClick={showPassword}
              size={16}
              className={"absolute right-2 bottom-3"}
            />
          </div>

          {consumeContext?.errorState.status && (
            <div className="text-myAccent-error-300 " id="ErrorContainer">
              {consumeContext?.errorState.msg.toString()}
            </div>
          )}

          <Button
            type="submit"
            label="submit"
            intent={"primary"}
            size={"medium"}
            fullWidth
          />
        </div>
      </form>
    </div>
  );
};

export default Card;
