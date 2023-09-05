"use client";
import List from "@/components/UI_Organisms/user/userList";
import React from "react";
import { usePathname } from "next/navigation";
import { cx } from "class-variance-authority";
import Link from "next/link";

function UsersList() {
  const path = usePathname();

  return (
    <div>
      <div className="flex justify-center font-bold font-rounded space-x-16 bg-primary-200 pt-4  ">
        <Link
          href={"/admin"}
          className={cx({
            "border-b-2 border-black ": path == "/admin",
          })}
        >
          Add User
        </Link>
        <Link
          href={"/admin/users"}
          className={cx({
            "border-b-2 border-black ": path == "/admin/users",
          })}
        >
          Users List
        </Link>
      </div>
      <List />
    </div>
  );
}

export default UsersList;
