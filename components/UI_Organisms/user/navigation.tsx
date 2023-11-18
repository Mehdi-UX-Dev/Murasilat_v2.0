"use client"

import { cx } from 'class-variance-authority'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function AdminNavigationHeader() {
    const path = usePathname();

  return (
    <div className="flex justify-center font-bold font-rounded space-x-16 bg-primary-200 pt-4  ">
    <Link
      href={"/admin"}
      className={cx({
        "border-b-[3px] border-black ": path == "/admin",
      })}
    >
      راجستر
    </Link>
    <Link
      href={"/admin/users"}
      className={cx({
        "border-b-[3px] border-black ": path == "/admin/users",
      })}
    >
      لیست کاربر ها
    </Link>
  </div>
  )
}

export default AdminNavigationHeader