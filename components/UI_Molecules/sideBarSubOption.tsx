import { sideBarSubOptionProps_SIDEBAR } from "@/universalTypes";
import { cx } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function SideSubOption({
  url,
  Icon,
  text,
  hasType,
  customClassName,
}: sideBarSubOptionProps_SIDEBAR) {
  const path = usePathname();

  return (
    <Link
      dir="rtl"
      href={url}
      className={cx(
        `flex items-center justify-center hover:bg-primary-200  ${customClassName}`,
        {
          "bg-primary-200 border-l-2 py-1.5 border-primary-900 text-primary-900":
            path == url,
        }
      )}
    >
      <Icon size={20} className="text-primary-400 " />
      <p className="text-primary-700 mr-2">{text}</p>
      {hasType && (
        <div
          className={cx("h-2 w-2  rounded-full mr-2", {
            "bg-cyan-400": hasType === "sadira",
            "bg-green-400": hasType === "warida",
            "bg-yellow-400": hasType === "bookmark",
            "bg-myAccent-error-300": hasType === "unread",
          })}
        ></div>
      )}
    </Link>
  );
}

export default SideSubOption;
