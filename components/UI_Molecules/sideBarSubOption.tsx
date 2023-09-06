import { cx } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";

type props = {
  url: string;
  text?: string;
  Icon: IconType;
};

function SideSubOption({ url, Icon, text }: props) {
  const path = usePathname();

  return (
    <Link
      dir="rtl"
      href={url}
      className={cx(
        "flex items-center   py-1 pr-20 hover:bg-primary-200 ",
        {
          "bg-primary-200 border-l-2 border-primary-900 text-primary-900":
            path == url,
        }
      )}
    >
      <Icon size={20} className="text-primary-400 " />
      <p className="text-primary-700 mr-2">{text}</p>  
    </Link>
  );
}

export default SideSubOption;
