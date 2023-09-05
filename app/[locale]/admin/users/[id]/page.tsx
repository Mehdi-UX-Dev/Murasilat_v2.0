import React from "react";

function UserProfile({ params: { id } }: { params: { id: number } }) {
  return <div>{id}</div>;
}

export default UserProfile;
