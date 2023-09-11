import type { Meta, StoryObj } from "@storybook/react";

import SideOption from "../../components/UI_Molecules/sidebarOption";

const meta: Meta<typeof SideOption> = {
  title: "Molecules/SideBarOption",
  component: SideOption,
};

export default meta;

type Story = StoryObj<typeof SideOption>;

export const DefaultSideState: Story = {
  args: {
    url: "",
  },
};
