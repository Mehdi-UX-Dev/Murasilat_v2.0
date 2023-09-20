"use client";
import React, { useState } from "react";
import { Button } from "@/components/UI_Molecules/Button";
import { InputField } from "@/components/UI_Molecules/Input";
import { AiFillEye } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { credentialsProps_LOGIN, errorProps_LOGIN } from "@/universalTypes";

const Card = ({ ...lang }) => {
  const [credentials, setCredentials] = useState<credentialsProps_LOGIN>({});
  const [errorState, setErrorState] = useState<errorProps_LOGIN>({
    inputState: "Default",
    status: false,
    msg: "",
  });
  const [passwordState, setShowPasswordState] = useState(false);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/login`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true.toString(),
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: credentials.username,
            password: credentials.password,
          }),
        }
      );

      const nextRes = await res.json();

      if (nextRes.success) {
        window.localStorage.setItem("token", nextRes.token);
      } else {
        throw new Error(nextRes.message);
      }
    } catch (e: any) {
      setErrorState({ inputState: "ErrorState", status: true, msg: e });
      setTimeout(() => {
        setErrorState({ inputState: "Default", status: false, msg: "" });
      }, 5000);
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className=" drop-shadow-lg bg-white w-[560px] mx-auto  px-4 py-20 ">
      <section className="relative ">
        <h1 className="font-serif text-4xl text-center font-bold">
          {lang.header}
        </h1>
      </section>
      <form dir="rtl" onSubmit={handleSubmit}>
        <div className="space-y-4 max-w-[320px] mx-auto mt-12">
          <div className="relative">
            <InputField
              inputType="text"
              label={lang.username}
              fullWidth
              state={errorState.status ? "ErrorState" : "Default"}
              name="username"
              handleChange={handleChange}
            />
            <FaUserAlt size={16} className={"absolute right-2 bottom-3"} />
          </div>

          <div className="relative">
            <InputField
              inputType={passwordState ? "text" : "password"}
              label={lang.password}
              fullWidth
              state={errorState.status ? "ErrorState" : "Default"}
              name="password"
            />
            <AiFillEye
              onClick={() => setShowPasswordState(!passwordState)}
              size={16}
              className={"absolute right-2 bottom-3"}
            />
          </div>

          <div className="text-myAccent-error-300 " id="ErrorContainer">
            {errorState.msg.toString()}
          </div>

          <Button
            type="submit"
            label={lang.submit}
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
