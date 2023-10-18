import type { Meta, StoryObj } from '@storybook/react';

import AltLogin from '../../components/UI_Organisms/login_page/altLogin';

const meta: Meta<typeof AltLogin> = {
  title: 'Organisms/Card Version 3',
  component: AltLogin,
};

export default meta;

type Story = StoryObj<typeof AltLogin>;

export const DefaultState: Story = {};
