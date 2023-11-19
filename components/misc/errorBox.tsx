import React from "react";
import { Button } from "../UI_Molecules/Button";
import { useRouter } from "next/navigation";

function ErrorBox({ message }: { message: string }) {
  const { refresh } = useRouter();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" ">
        <h1 className="text-lg font-bold font-IranSans ">{message}</h1>
        <Button label={"refresh"} handleClick={() => refresh()} />
      </div>
    </div>
  );
}

export default ErrorBox;
