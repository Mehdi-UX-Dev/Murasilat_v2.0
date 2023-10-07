"use client";
import React, { useState } from "react";
import { baseAxios } from "@/utils/client";
import { Button } from "@/components/UI_Molecules/Button";
import { InputField } from "@/components/UI_Molecules/Input";
import { AiFillEye } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { credentialsProps_LOGIN, errorProps_LOGIN } from "@/universalTypes";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/context/features/loginSlice";
import { useRouter } from "next/navigation";

const Card = ({ ...lang }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [credentials, setCredentials] = useState<credentialsProps_LOGIN>({});
  const { user, error, loading } = useSelector((store) => store.user);
  // const [errorState, setErrorState] = useState<errorProps_LOGIN>({
  //   inputState: "Default",
  //   status: false,
  //   msg: "",
  // });
  const [passwordState, setShowPasswordState] = useState(false);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    // try {
    //   const res = await baseAxios.post(
    //     `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/login/`,
    //     {
    //       email: credentials.username,
    //       password: credentials.password,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   window.localStorage.setItem("TOKENS", JSON.stringify(res.data));
    // } catch (e: any) {
    //   setErrorState({ inputState: "ErrorState", status: true, msg: e });
    //   setTimeout(() => {
    //     setErrorState({ inputState: "Default", status: false, msg: "" });
    //   }, 5000);
    // }

    dispatch(
      login({
        email: credentials.username,
        password: credentials.password,
        callback: () => {
          router.push("/dashboard");
        },
      })
    );
  };

  const handleChange = (value: string, name: string) => {
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
              state={error ? "ErrorState" : "Default"}
              name="username"
              handleChange={(value, name) => handleChange(value, name)}
            />
            <FaUserAlt size={16} className={"absolute right-2 bottom-3"} />
          </div>

          <div className="relative">
            <InputField
              inputType={passwordState ? "text" : "password"}
              label={lang.password}
              fullWidth
              state={error ? "ErrorState" : "Default"}
              handleChange={(value, name) => handleChange(value, name)}
              name="password"
            />
            <AiFillEye
              onClick={() => setShowPasswordState(!passwordState)}
              size={16}
              className={"absolute right-2 bottom-3"}
            />
          </div>

          <div className="text-myAccent-error-300 " id="ErrorContainer">
            {error}
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
