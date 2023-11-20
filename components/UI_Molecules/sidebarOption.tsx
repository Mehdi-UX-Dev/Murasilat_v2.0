import { sideBarOptionProps_SIDEBAR } from "@/universalTypes";
import { cx } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiChevronDown } from "react-icons/bi";

function SideOption({
  url,
  text,
  Icon,
  hasDropDown,
  customClassName,
}: sideBarOptionProps_SIDEBAR) {
  const path = usePathname();

  return (
    <Link
      href={url}
      className={cx(
        `flex  items-center ${customClassName}   py-1.5 space-x-4 justify-center   cursor-text`,
        {
          "bg-primary-200 border-l-2 border-primary-900 text-primary-900":
            path == url,
          "hover:bg-primary-200 !cursor-pointer":
            url === "/per/dashboard" ||
            url === "/ps/dashboard" ||
            url === "/per/docsHard_scan_archive" ||
            url === "/per/docsHard_scan_archive",
        }
      )}
    >
      {hasDropDown && <BiChevronDown />}
      <p className="font-bold">{text}</p>
      <Icon size={24} />
    </Link>
  );
}

export default SideOption;
