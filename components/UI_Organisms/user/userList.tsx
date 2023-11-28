"use client";

import { getAllUsers, deleteUser } from "@/context/features/adminSlice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

function List() {
  const dispatch = useAppDispatch();
  const { allUsers } = useAppSelector((store) => store.adminSlice);
  const { refresh } = useRouter();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const removeUser = (id: number) => {
    dispatch(
      deleteUser({
        id,
        callback: () => {
          refresh();

          toast.success("کاربر موفقانه حذف شد");
        },
      })
    );
  };
  return (
    <table className="table-auto w-full max-w-4xl mx-auto mt-10 border ">
      <thead className="bg-primary-300">
        <tr>
          <th></th>
          <th>اداره</th>
          <th>ایمیل</th>
          <th>اسم</th>
          <th>شماره</th>
        </tr>
      </thead>
      <tbody className="text-center ">
        {allUsers?.map((item) => (
          <tr key={item.id}>
            <td>
              <MdDelete
                size={32}
                onClick={() => removeUser(item.id)}
                className="hover:scale-110 hover:cursor-pointer"
              />
            </td>
            <td>{item.authority.title}</td>
            <td>{item.email}</td>
            <td>{item.fullname}</td>
            <td>{item.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default List;
