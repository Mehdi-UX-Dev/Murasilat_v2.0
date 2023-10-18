"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/UI_Molecules/Button";
import { InputField } from "@/components/UI_Molecules/Input";
import { AiFillEye } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { credentialsProps_LOGIN, errorProps_LOGIN } from "@/universalTypes";
import { clearError, login } from "@/context/features/loginSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/context/store";
import { useAppDispatch, useAppSelector } from "@/context/hooks";

const Card = ({ ...lang }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [credentials, setCredentials] = useState<credentialsProps_LOGIN>({});
  const { error, loading } = useAppSelector(
    (store: RootState) => store.user
  );

  useEffect(() => {
    error &&
      setTimeout(() => {
        dispatch(clearError());
      }, 4000);
  });

  const [passwordState, setShowPasswordState] = useState(false);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

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
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 max-w-[320px] mx-auto mt-12">
          <div className="relative">
            <FaUserAlt size={16} className={"absolute left-2 bottom-3"} />
            <InputField
              inputType="text"
              label={lang.username}
              fullWidth
              direction="ltr"
              state={error ? "ErrorState" : "Default"}
              name="username"
              handleChange={(value, name) => handleChange(value, name)}
            />
          </div>

          <div className="relative">
            <AiFillEye
              onClick={() => setShowPasswordState(!passwordState)}
              size={16}
              className={"absolute left-2 bottom-3"}
            />
            <InputField
              inputType={passwordState ? "text" : "password"}
              label={lang.password}
              fullWidth
              state={error ? "ErrorState" : "Default"}
              handleChange={(value, name) => handleChange(value, name)}
              name="password"
              direction="ltr"
            />
          </div>

          <div className="text-myAccent-error-300 " id="ErrorContainer">
            {error?.message}
          </div>

          <Button
            type="submit"
            label={lang.submit}
            intent={"primary"}
            size={"medium"}
            loading={loading}
            width={'full'}
/>
        </div>
      </form>
    </div>
  );
};

export default Card;
