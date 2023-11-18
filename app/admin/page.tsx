"use client";
import { Button } from "@/components/UI_Molecules/Button";
import { InputField } from "@/components/UI_Molecules/Input";
import AdminNavigationHeader from "@/components/UI_Organisms/user/navigation";

import React from "react";

function Administrator() {
  return (
    <div>
      <AdminNavigationHeader />
      <div className="my-10">
        <div className="drop-shadow-lg bg-white w-[560px]  mx-auto  px-4 py-20">
          <h1 className="text-xl font-bold mb-4 text-right font-IranSans">
            ثبت کاربر
          </h1>
          <form className="space-y-4">
            <InputField
              label="نام"
              name="name"
              fullWidth
              inputType="text"
              state={"Default"}
            />
            <InputField
              label="ایمیل"
              name="fname"
              fullWidth
              inputType="text"
              state={"Default"}
            />
            <InputField
              label="پوهخی"
              name="faculty"
              fullWidth
              inputType="text"
              state={"Default"}
            />
            <InputField
              label="صلاحیت"
              name="position"
              fullWidth
              inputType="text"
              state={"Default"}
            />
            <InputField
              label="درجه تحصیل"
              name="degree"
              fullWidth
              inputType="text"
              state={"Default"}
            />
            <InputField
              label="شماره تماس"
              name="phone"
              fullWidth
              inputType="number"
              state={"Default"}
            />
            <div dir="rtl">
              <InputField
                label="تذکره"
                name="tazkira"
                fullWidth
                inputType="file"
              />
            </div>
            {/* //?how to make this a circle which would on click open this  */}
            <div dir="rtl" className="space-y-4">
              <InputField label="عکس" name="photo" fullWidth inputType="file" />
            </div>
            <div className="max-w-[70%] mx-auto">
              <Button label="ثبت کن" intent="primary" width={"full"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Administrator;
