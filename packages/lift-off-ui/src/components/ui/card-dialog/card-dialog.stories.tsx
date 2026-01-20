import { Meta, StoryObj } from '@storybook/react';

import { CardDialog } from './card-dialog';

import { Rectangle } from '../../../../.storybook/components/rectangle';

export default {
  title: 'Components/UI/CardDialog',
  component: CardDialog,
} as Meta<typeof CardDialog>;

type Story = StoryObj<typeof CardDialog>;

export const Default: Story = {
  render: () => (
    <CardDialog heading="Card Dialog">
      <Rectangle>
        <span className="relative">Card Dialog Content</span>
      </Rectangle>
    </CardDialog>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<CardDialog heading="Card Dialog">
  Card Dialog Content
</CardDialog>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const WithTitle: Story = {
  render: () => (
    <CardDialog heading="Card Dialog" title="Dialog Title">
      <Rectangle>
        <span className="relative">Card Dialog Content</span>
      </Rectangle>
    </CardDialog>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<CardDialog heading="Card Dialog" title="Dialog Title">
  Card Dialog Content
</CardDialog>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const WithDescription: Story = {
  render: () => (
    <CardDialog heading="Card Dialog" description="This is a description of the card dialog content.">
      <Rectangle>
        <span className="relative">Card Dialog Content</span>
      </Rectangle>
    </CardDialog>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<CardDialog heading="Card Dialog" description="This is a description of the card dialog content.">
  Card Dialog Content
</CardDialog>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const WithTitleAndDescription: Story = {
  render: () => (
    <CardDialog
      heading="Card Dialog"
      title="Dialog Title"
      description="This is a description of the card dialog content."
    >
      <Rectangle>
        <span className="relative">Card Dialog Content</span>
      </Rectangle>
    </CardDialog>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<CardDialog
  heading="Card Dialog"
  title="Dialog Title"
  description="This is a description of the card dialog content."
>
  Card Dialog Content
</CardDialog>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const WithChildren: Story = {
  render: () => (
    <CardDialog
      heading="Card Dialog"
      title="Dialog Title"
      description="This card dialog contains multiple children elements."
    >
      <Rectangle>
        <span className="relative">First Child Element</span>
      </Rectangle>
      <Rectangle>
        <span className="relative">Second Child Element</span>
      </Rectangle>
      <Rectangle>
        <span className="relative">Third Child Element</span>
      </Rectangle>
    </CardDialog>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<CardDialog
  heading="Card Dialog"
  title="Dialog Title"
  description="This card dialog contains multiple children elements."
>
  <div>First Child Element</div>
  <div>Second Child Element</div>
  <div>Third Child Element</div>
</CardDialog>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};
