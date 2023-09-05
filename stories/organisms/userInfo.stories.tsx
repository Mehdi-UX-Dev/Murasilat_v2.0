
import UserInfo from '../../components/UI_Organisms/user/userInfo'
import type { Meta, StoryObj } from "@storybook/react";


const meta: Meta<typeof UserInfo> = {
  title: "Organisms/UserInfo",
  component: UserInfo,
};

export default meta;

type Story = StoryObj<typeof UserInfo>;

export const DefaultState: Story = {

};
