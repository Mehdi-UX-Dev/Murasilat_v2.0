"use client";
import { Button } from "@/components/UI_Molecules/Button";
import { InputField } from "@/components/UI_Molecules/Input";
import { cx } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

//? admin cannot be accessed from outside the locale directory find the reason

function Administrator() {
  const path = usePathname();

  return (
    <>
      <div className="flex justify-center font-bold font-rounded space-x-16 bg-primary-200 pt-4  ">
        <Link
          href={"/admin"}
          className={cx({
            "border-b-4 border-black ": path == "/admin",
          })}
        >
          Add User
        </Link>
        <Link
          href={"/admin/users"}
          className={cx({
            "border-b-4 border-black ": path == "/admin/users",
          })}
        >
          Users List
        </Link>
      </div>
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
