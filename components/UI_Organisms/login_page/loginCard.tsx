"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/UI_Molecules/Button";
import { InputField } from "@/components/UI_Molecules/Input";
import { AiFillEye } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { useMyContext } from "@/hooks/credentialsContext";
import { langProps } from "@/app/[locale]/page";

type CardProps = {
  lang: langProps | undefined;
};

const Card = ({ lang }: CardProps) => {
  const consumeContext = useMyContext();

  // The state for the eye icon to show password
  const [showPasswordState, setShowPasswordState] = useState(false);

  const showPassword = () => {
    setShowPasswordState(!showPasswordState);
  };

  return (
    <div className=" drop-shadow-lg bg-white w-[560px] mx-auto  px-4 py-20 ">
      <section className="relative ">
        <h1 className="font-serif text-4xl text-center font-bold">
          {lang?.header}
        </h1>
      </section>
      <form onSubmit={consumeContext?.handleSubmit}>
        <div className="space-y-4 max-w-[320px] mx-auto mt-12">
          <div className="relative">
            <InputField
              inputType="text"
              label={lang?.username}
              fullWidth
              state={
                consumeContext?.errorState?.status ? "ErrorState" : "Default"
              }
              name="username"
              // lang={locale == "en" ? "LTR" : "RTL"}
            />
            <FaUserAlt size={16} className={"absolute right-2 bottom-3"} />
          </div>

          <div className="relative">
            <InputField
              inputType={showPasswordState ? "text" : "password"}
              label={lang?.password}
              fullWidth
              state={
                consumeContext?.errorState?.status ? "ErrorState" : "Default"
              }
              name="password"
              // lang={locale == "en" ? "LTR" : "RTL"}
            />
            <AiFillEye
              onClick={showPassword}
              size={16}
              className={"absolute right-2 bottom-3"}
            />
          </div>

          {consumeContext?.errorState?.status && (
            <div className="text-myAccent-error-300 " id="ErrorContainer">
              {consumeContext?.errorState.msg.toString()}
            </div>
          )}

          <Button
            type="submit"
            label={lang?.submit}
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
