import List from "@/components/UI_Organisms/user/userList";
import React from "react";

import AdminNavigationHeader from "@/components/UI_Organisms/user/navigation";
import { ToastContainer } from "react-toastify";

function UsersList() {
  return (
    <div>
      <ToastContainer />
      <AdminNavigationHeader />
      <List />
    </div>
  );
}

export default UsersList;
