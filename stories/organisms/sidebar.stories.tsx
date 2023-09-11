import type { Meta, StoryObj } from "@storybook/react";

import SideBar from "../../components/UI_Organisms/create_pages/sidebar";

const meta: Meta<typeof SideBar> = {
  title: "Organisms/SideBar",
  component: SideBar,
};

export default meta;

type Story = StoryObj<typeof SideBar>;

export const DefaultState: Story = {
  args: {
    lang: {
      dashboard: "dashboard",
      write: "",
      maktoob: "",
      istilam: "",
      pishnihad: "",
      archive: "",
      recents: "",
      all_sadira: "",
      all_warida: "",
      broadcast: "",
      log_out: "",
    },
  },
};
