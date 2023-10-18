"use client";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { useEffect } from "react";
import { getUserProfile, showUserInfo } from "@/context/features/documentSlice";

function ID() {
  const dispatch = useAppDispatch();

  const { userInfo }  = useAppSelector((store) => store.documents);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <section className="flex space-x-6 ml-4" onClick={() => dispatch(showUserInfo())}>
      <div className="space-y-1 text-right">
        <p className="font-bold font-rounded text-2xl  ">
          {userInfo?.fullname}
        </p>
        <p className="font-bold text-lg font-rounded text-primary-600">
          {userInfo?.faculty}
        </p>
        <p className="font-bold text-lg font-rounded text-primary-600">
          {userInfo?.authority?.title}
        </p>
      </div>
      <Image
        src={userInfo?.profile_pic}
        width={80}
        height={80}
        alt="image person"
        className="rounded-full object-cover h-20 w-20"
      />
    </section>
  );
}

export default ID;
