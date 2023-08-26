import React, { useState } from "react";
import { Button } from "@/components/Button";
import { InputField } from "@/components/Input";
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
        {/**
         * //* In doubt that I will have a change property in the login page
         */}

        {/* <BsTranslate
          size={24}
          className="text-primary-700 ml-4"
          onClick={langChange}
          
        /> */}

        {/* {langSetting && (
          <div className="absolute mt-1 bg-primary-100  shadow-md  space-y-2 w-28 z-10  ">
            <p
              onClick={() => chooseLang("dari")}
              className="text-right  hover:bg-primary-200  hover:border-l-2 hover:border-primary-900 py-1 pr-2 hover:font-semibold cursor-pointer"
            >
              دری
            </p>
            <p
              onClick={() => chooseLang("pashto")}
              className="text-right hover:bg-primary-200  hover:border-l-2 hover:border-primary-900 py-1 pr-2 hover:font-semibold cursor-pointer"
            >
              پشتو
            </p>
            <p
              onClick={() => chooseLang("english")}
              className="hover:bg-primary-200  hover:border-l-2 hover:border-primary-900 w-full pl-2 hover:font-semibold cursor-pointer"
            >
              English
            </p>
          </div>
        )} */}

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
