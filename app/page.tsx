"use client";

import { Button } from "@/components/Button";
import { InputField } from "@/components/Input";
import Image from "next/image";
import KabulUni from "img/KabulUni.png";
import DSIC from "img/DSIC.png";
import Morasilat from "img/Morasilat.png";
import { FiSettings } from "react-icons/fi";
import { BiSolidDashboard } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import {FaUserAlt} from 'react-icons/fa'

export default function Home() {
  console.log(FiSettings);

  return (
    <div className="">
      {/* Header */}
      <header className="flex justify-between items-center mx-8 mt-4">
        <div>
          <Image src={Morasilat} alt="Morasilat" height={96} width={96} />
        </div>
        <div className="flex items-center  space-x-12">
          <Image src={KabulUni} alt="Kabul University" height={48} width={48} />
          <Image
            src={DSIC}
            alt="DSIC"
            height={800}
            width={200}
            className="mb-3"
          />
        </div>
      </header>

      {/* Card and Form */}
      <div className=" mt-12 drop-shadow-lg bg-white w-[560px] mx-auto  px-4">
        <section>
          <FiSettings size={24} className="text-primary-700" />
          <h1 className="font-serif text-4xl text-center font-bold">Log In</h1>
        </section>

        <div className="space-y-4 max-w-[320px] mx-auto">
          <div className="relative">
            <InputField inputType="text" label="Username" fullWidth />
            <FaUserAlt
              size={16}
              className={"absolute right-2 bottom-3"}
            />
          </div>

          <div className="relative">
            <InputField inputType="password" label="password" fullWidth />
            <AiFillEye
              size={16}
              className={"absolute right-2 bottom-3"}
            />
          </div>

          <Button label="submit" intent={"primary"} size={"medium"} fullWidth />
        </div>
      </div>
    </div>
  );
}
