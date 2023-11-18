import UserInfo from "@/components/UI_Organisms/user/userInfo";

function UserProfile({ params: { id } }: { params: { id: number } }) {
  return <UserInfo />;
}

export default UserProfile;
