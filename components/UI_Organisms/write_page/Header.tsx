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
    case "/archive":
      title = "لیست تمام صادره";
  }
  return (
    <div className="flex justify-between items-center">
      <ID />
      <p className="mr-8 font-IranSans text-3xl font-bold">{title}</p>
    </div>
  );
}

export default Header;
