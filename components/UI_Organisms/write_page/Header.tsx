import { usePathname } from "next/navigation";
import React from "react";
import ID from "./ID";

function Header() {
  const path = usePathname();

  let title = "";
  switch (path) {
    case "/write/writeMaktoob":
      title = "ایجاد مکتوب";
      break;
    case "/write/writeIstilam":
      title = "ایجاد استعلام";
      break;
    case "/write/writePishnihad":
      title = "ایجاد پيشنهاد";
      break;
    case "/archive/sadira":
      title = "لیست تمام صادره";
      break;
    case "/archive/warida":
      title = "لیست تمام وارده";
      break;
  }
  return (
    <div className="flex justify-end items-center mb-8">
      {/* <ID /> */}
      <p className="mr-8 font-IranSans text-3xl font-bold">{title}</p>
    </div>
  );
}

export default Header;
