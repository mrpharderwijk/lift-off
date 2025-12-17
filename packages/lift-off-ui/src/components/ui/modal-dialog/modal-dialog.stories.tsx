import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import {
  ModalDialog,
  ModalDialogProps,
} from '@/components/ui/modal-dialog/modal-dialog';
import { DialogContextProvider } from '@/components/ui/modal-dialog/providers/dialog-context-provider';
import { Button } from '@/components/ui/buttons/button';

export default {
  title: 'Components/Ui/ModalDialog',
  component: ModalDialog,
  decorators: [
    (Story) => (
      <DialogContextProvider>
        <Story />
      </DialogContextProvider>
    ),
  ],
} as Meta;

const Template: StoryFn<ModalDialogProps> = (args) => {
  const [isVisible, setIsVisible] = useState(args.isVisible ?? false);

  return (
    <div>
      <Button onClick={() => setIsVisible(true)}>Open Modal</Button>
      <ModalDialog
        {...args}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  isVisible: false,
  children: (
    <div>
      <p>This is the default modal dialog content.</p>
      <p>You can add any content here.</p>
    </div>
  ),
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  isVisible: false,
  header: 'Modal Title',
  children: (
    <div>
      <p>This modal has a header with a title.</p>
      <p>The header includes a close button by default.</p>
    </div>
  ),
};

export const WithFooter = Template.bind({});
WithFooter.args = {
  isVisible: false,
  header: 'Modal with Footer',
  footer: (
    <div className="flex justify-end gap-2">
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </div>
  ),
  children: (
    <div>
      <p>This modal has a footer with action buttons.</p>
      <p>You can add any content in the footer.</p>
    </div>
  ),
};

export const WithImage = Template.bind({});
WithImage.args = {
  isVisible: false,
  header: 'Modal with Image',
  image: (
    <img
      src="https://via.placeholder.com/800x300"
      alt="Placeholder"
      className="w-full h-auto"
    />
  ),
  children: (
    <div>
      <p>This modal includes an image at the top.</p>
      <p>The image is displayed above the header.</p>
    </div>
  ),
};

export const Complete = Template.bind({});
Complete.args = {
  isVisible: false,
  header: 'Complete Modal Example',
  image: (
    <img
      src="https://via.placeholder.com/800x300"
      alt="Placeholder"
      className="w-full h-auto"
    />
  ),
  footer: (
    <div className="flex justify-end gap-2">
      <Button variant="outline">Cancel</Button>
      <Button>Save Changes</Button>
    </div>
  ),
  children: (
    <div>
      <h3 className="text-lg font-semibold mb-2">Modal Content</h3>
      <p className="mb-4">
        This is a complete modal example with header, image, content, and
        footer.
      </p>
      <p>
        All features are enabled: close on escape, close on outside click, and
        header close button.
      </p>
    </div>
  ),
};

export const WithoutCloseButton = Template.bind({});
WithoutCloseButton.args = {
  isVisible: false,
  header: 'Modal without Close Button',
  showHeaderCloseButton: false,
  children: (
    <div>
      <p>This modal does not show the close button in the header.</p>
      <p>You can still close it by pressing Escape or clicking outside.</p>
    </div>
  ),
};

export const WithoutEscapeKey = Template.bind({});
WithoutEscapeKey.args = {
  isVisible: false,
  header: 'Modal without Escape Key',
  closeOnEscape: false,
  children: (
    <div>
      <p>This modal cannot be closed by pressing the Escape key.</p>
      <p>
        You can still close it by clicking the close button or clicking outside.
      </p>
    </div>
  ),
};

export const WithoutOutsideClick = Template.bind({});
WithoutOutsideClick.args = {
  isVisible: false,
  header: 'Modal without Outside Click',
  closeOnOutsideClick: false,
  children: (
    <div>
      <p>This modal cannot be closed by clicking outside.</p>
      <p>
        You can still close it by pressing Escape or clicking the close button.
      </p>
    </div>
  ),
};

export const LongContent = Template.bind({});
LongContent.args = {
  isVisible: false,
  header: 'Modal with Long Content',
  children: (
    <div>
      <h3 className="text-lg font-semibold mb-4">Scrollable Content</h3>
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i} className="mb-4">
          This is paragraph {i + 1}. The modal content area is scrollable when
          the content exceeds the available space. This allows you to display
          large amounts of content without making the modal too tall.
        </p>
      ))}
    </div>
  ),
};
