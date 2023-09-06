import List from "@/components/UI_Organisms/user/userList";
import React from "react";

import AdminNavigationHeader from "@/components/UI_Organisms/user/navigation";

function UsersList() {
  return (
    <div>
      <AdminNavigationHeader />
      <List />
    </div>
  );
}

export default UsersList;
