import { Meta, StoryFn } from '@storybook/react';
import React, { useEffect } from 'react';
import {
  DropDownMenu,
  DropDownMenuProps,
} from '@/components/ui/drop-down-menu/drop-down-menu';
import {
  DropDownMenuItem
} from '@/components/ui/drop-down-menu/drop-down-menu-item/drop-down-menu-item'
import { DropDownContextProvider, useDropDownContext } from '@/components/ui/drop-down-menu/providers/drop-down-context-provider';
import { Button } from '@/components/ui/buttons/button';
import { DropDownMenuItemDivider } from '@/components/ui/drop-down-menu/drop-down-menu-item-divider/drop-down-menu-item-divider';
import { cn } from '@/utils/class-names';

export default {
  title: 'Components/Ui/DropDownMenu',
  component: DropDownMenu,
  decorators: [
    (Story) => {
      useEffect(() => {
        // Set the Storybook root container to full viewport dimensions
        const style = document.createElement('style');
        style.textContent = `
          .sb-story,
          [data-story],
          .os-host,
          .os-host > .os-padding {
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .sb-main-padded {
            padding: 0 !important;
          }
        `;
        document.head.appendChild(style);

        return () => {
          document.head.removeChild(style);
        };
      }, []);

      return (
        <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
          <Story />
        </div>
      );
    },
  ],
} as Meta;

type TemplateProps = DropDownMenuProps & {
  justify?: 'start' | 'center' | 'end';
  items?: 'start' | 'center' | 'end';
};

const Template: StoryFn<TemplateProps> = ({ justify = 'start', items = 'end', ...args }) => {
  return (
    <div className="w-full h-full">
      <div className={cn('flex flex-row w-full h-full', {
        'justify-start': justify === 'start',
        'justify-center': justify === 'center',
        'justify-end': justify === 'end',
        'items-start': items === 'start',
        'items-center': items === 'center',
        'items-end': items === 'end',
      })}>
        <DropDownContextProvider>
          <DropDownMenuWrapper {...args} />
        </DropDownContextProvider>
      </div>
    </div>
  );
};

const DropDownMenuWrapper = (args: DropDownMenuProps) => {
  const { currentOpenDropDown, toggleDropDown} = useDropDownContext()

  return (
    <DropDownMenu {...args} isOpen={currentOpenDropDown === args.id} trigger={<Button onClick={() => toggleDropDown(args.id)}>Open Dropdown</Button>} />
  );
};

const defaultArgs = {
  isOpen: false,
  children: (
    <>
      <DropDownMenuItem label="MenuItem1" onClick={() => {}}/>
      <DropDownMenuItemDivider />
      <DropDownMenuItem label="MenuItem2" onClick={() => {}}/>
    </>
  ),
};

export const DefaultLeft = Template.bind({});
DefaultLeft.args = {
  ...defaultArgs,
  id: 'default-drop-down-menu-left',
  justify: 'start',
  items: 'start',
};

export const DefaultCenter = Template.bind({});
DefaultCenter.args = {
  ...defaultArgs,
  id: 'default-drop-down-menu-center',
  justify: 'center',
  items: 'start',
};

export const DefaultRight = Template.bind({});
DefaultRight.args = {
  ...defaultArgs,
  id: 'default-drop-down-menu-right',
  justify: 'end',
  items: 'start',
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  ...defaultArgs,
  id: 'top-left-drop-down-menu',
  justify: 'start',
  items: 'start',
};

export const TopCenter = Template.bind({});
TopCenter.args = {
  ...defaultArgs,
  id: 'top-center-drop-down-menu',
  justify: 'center',
  items: 'start',
};

export const TopRight = Template.bind({});
TopRight.args = {
  ...defaultArgs,
  id: 'top-right-drop-down-menu',
  justify: 'end',
  items: 'start',
};
