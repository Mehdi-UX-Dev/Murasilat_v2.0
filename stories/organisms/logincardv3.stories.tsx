import type { Meta, StoryObj } from "@storybook/react";

import CardV3 from '../../components/UI_Organisms/login_page/loginCardV3'

const meta: Meta<typeof CardV3> = {
  title: "Organisms/Card Version 3",
  component: CardV3,
};

export default meta;

type Story = StoryObj<typeof CardV3>;

export const DefaultState: Story = {};
