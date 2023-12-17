"use client";
import { Button } from "@/components/UI_Molecules/Button";
import { InputField } from "@/components/UI_Molecules/Input";
import AdminNavigationHeader from "@/components/UI_Organisms/user/navigation";
import {
  addAuthority,
  addUser,
  getAuthorities,
} from "@/context/features/adminSlice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";

import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

type dataType = {
  email?: string;
  password?: string;
  role?: string;
  title?: string;
  level?: string;
  authority?: string;
  contact_number?: number;
  profile_pic?: File;
};

function Administrator() {
  const [data, setData] = useState<dataType | undefined>(undefined);
  const [authority, setAuthority] = useState<{ title: string }>({ title: "" });
  const { push } = useRouter();

  const { authorities } = useAppSelector((store) => store.adminSlice);
  const dispatch = useAppDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (data)
      Object.entries(data).map(([key, value]: [key: any, value: any]) => {
        formData.append(key, value);
      });

    dispatch(
      addUser({
        data,
        callback: () => {
          toast.success("کاربر اضافه شد");
          push("/admin/users");
        },
      })
    );
  };

  const handleInputChange = (value: string, name: string) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(getAuthorities());
  }, []);

  const sumbitAuthority: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(
      addAuthority({
        title: authority,
        callback: () => {
          toast.success("اداره اضافه شد");
        },
      })
    );
  };

  const [showAddAuthorityModel, toggleAuthorityModel] = useState(false);

  const showAddAuthority = () => toggleAuthorityModel(!showAddAuthorityModel);
  return (
    <div>
      <ToastContainer />
      <AdminNavigationHeader />

      <div className="flex space-x-10 justify-center  ">
        {/* //* add user section */}
        <div className="my-10">
          <div className="drop-shadow-lg bg-white w-[560px]  mx-auto  px-4 py-20">
            <h1 className="text-xl font-bold mb-4 text-right font-IranSans">
              ثبت کاربر
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="نام  "
                name="first_name"
                fullWidth
                inputType="text"
                state={"Default"}
                direction={"rtl"}
                handleChange={handleInputChange}
              />
              <InputField
                label="تخلص  "
                name="last_name"
                fullWidth
                inputType="text"
                state={"Default"}
                direction={"rtl"}
                handleChange={handleInputChange}
              />{" "}
              <InputField
                label="نام کاربر  "
                name="title"
                fullWidth
                inputType="text"
                state={"Default"}
                direction={"rtl"}
                handleChange={handleInputChange}
              />
              <InputField
                label="ایمیل"
                name="email"
                fullWidth
                inputType="text"
                state={"Default"}
                direction={"ltr"}
                handleChange={handleInputChange}
              />{" "}
              <InputField
                label="رمز عبور"
                name="password"
                fullWidth
                inputType="password"
                state={"Default"}
                handleChange={handleInputChange}
              />
              <div className="text-right space-x-2">
                <select
                  className="border p-2 rounded "
                  dir="rtl"
                  name="role"
                  id="role"
                  onChange={(event) =>
                    setData((prev) => ({
                      ...prev,
                      role: event.target.value,
                    }))
                  }
                >
                  <option selected value=""></option>
                  <option value="head">Head</option>
                  <option value="deputy">Deputy</option>
                  <option value="department">Department</option>
                  {/* <option value="professor">Professor</option> */}
                  {/* <option value="member">member</option> */}
                </select>
                <label htmlFor="level" className="font-bold text-lg">
                  رول
                </label>
              </div>
              <div className="text-right space-x-2">
                <select
                  className="border p-2 rounded "
                  dir="rtl"
                  name="level"
                  id="level"
                  onChange={(event) =>
                    setData((prev) => ({
                      ...prev,
                      level: event.target.value,
                    }))
                  }
                >
                  <option selected value=""></option>

                  <option value="1">1/آمریت</option>
                  <option value="2">2/مدیریت</option>
                  <option value="3">3 معاونیت/پوهنخی</option>
                  <option value="4">4 ریاست </option>
                  {/* <option value="4">4</option> */}
                  {/* <option value="5">5</option> */}
                  {/* <option value="6">6</option> */}
                </select>
                <label htmlFor="level" className="font-bold text-lg">
                  حد صلاحیت
                </label>
              </div>
              <div className="text-right space-x-2">
                <select
                  className="border p-2 rounded "
                  dir="rtl"
                  name="authority"
                  id="authority"
                  onChange={(event) =>
                    setData((prev) => ({
                      ...prev,
                      authority: event.target.value,
                    }))
                  }
                >
                  <option selected value=""></option>

                  {authorities?.map((item, idx) => (
                    <option key={idx} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
                <label htmlFor="level" className="font-bold text-lg">
                  اداره
                </label>
              </div>
              <InputField
                label="شماره تماس"
                name="contact_number"
                fullWidth
                inputType="number"
                state={"Default"}
                handleChange={handleInputChange}
              />
              {/* //?how to make this a circle which would on click open this  */}
              <div dir="rtl" className="space-y-4">
                <input
                  name="profile_pic"
                  type="file"
                  onChange={(data) => {
                    const file = data.target.files?.[0];
                    if (file) {
                      setData((prev) => ({
                        ...prev,
                        profile_pic: file,
                      }));
                    }
                  }}
                />
              </div>
              <div className="max-w-[70%] mx-auto">
                <Button
                  label="ثبت کن"
                  intent="primary"
                  type="submit"
                  width={"full"}
                />
              </div>
            </form>
          </div>
        </div>

        <div>
          {/* //* add authority section */}
          <div className="flex justify-center mt-10">
            <Button
              handleClick={showAddAuthority}
              label="اضافه اداره"
              intent={"secondary"}
              size={"large"}
              width={"full"}
            />
          </div>
          <div
            hidden={!showAddAuthorityModel}
            className="bg-white p-10 rounded shadow-lg  h-fit mt-20"
          >
            <form onSubmit={sumbitAuthority} className="space-y-5">
              <h1 className="font-bold text-lg font-IranSans text-right">
                اداره اضافه کن
              </h1>
              <InputField
                label="اداره"
                name="authority"
                fullWidth
                inputType="text"
                state={"Default"}
                direction={"rtl"}
                handleChange={(value) => setAuthority({ title: value })}
              />
              <Button label="ثبت اداره" width={"full"} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Administrator;
