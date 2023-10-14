"use client";
import { Button } from "@/components/UI_Molecules/Button";
import { InputField } from "@/components/UI_Molecules/Input";
import AdminNavigationHeader from "@/components/UI_Organisms/user/navigation";



import { usePathname } from "next/navigation";
import React from "react";

//? admin cannot be accessed from outside the locale directory find the reason

function Administrator() {

  return (
    <>
      <AdminNavigationHeader />
      <div className="my-10">
        <div className="drop-shadow-lg bg-white w-[560px]  mx-auto  px-4 py-20">
          <h1 className="text-xl font-bold mb-4">Register User</h1>
          <form className="space-y-4">
            <InputField
              label="Full Name"
              name="name"
              fullWidth
              inputType="text"
            />
            <InputField
              label="Father Name"
              name="fname"
              fullWidth
              inputType="text"
            />
            <InputField
              label="Faculty"
              name="faculty"
              fullWidth
              inputType="text"
            />
            <InputField
              label="Position"
              name="position"
              fullWidth
              inputType="text"
            />
            <InputField
              label="Degree"
              name="degree"
              fullWidth
              inputType="text"
            />
            <InputField
              label="Phone Number"
              name="phone"
              fullWidth
              inputType="number"
            />
            <InputField
              label="Tazkira"
              name="tazkira"
              fullWidth
              inputType="file"
            />
            {/* //?how to make this a circle which would on click open this  */}
            <InputField label="Photo" name="photo" fullWidth inputType="file" />
            <Button label="Submit" intent="primary" fullWidth />
          </form>
        </div>
      </div>
    </>
  );
}

export default Administrator;
