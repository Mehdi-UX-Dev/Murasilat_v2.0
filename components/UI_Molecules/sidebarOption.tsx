import { cx } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import { BiChevronDown } from "react-icons/bi";

type props = {
  url: string;
  text: string;
  Icon: IconType;
  hasDropDown: boolean;
};

function SideOption({ url, text, Icon, hasDropDown }: props) {
  const path = usePathname();

  return (
    <Link
      href={url}
      className={cx("flex items-center space-x-4 py-1 px-4", {
        "bg-primary-200 border-l-2 border-primary-900 text-primary-900":
          path == url,
      })}
    >
      <Icon size={24} />
      <p className="font-bold">{text}</p>
      {hasDropDown && <BiChevronDown />}
    </Link>
  );
}

export default SideOption;
