import { PropsWithChildren, ReactElement } from 'react';
import { Box } from '../../atoms/box/box';
import { flexBoxClassNames } from './flex-box.classNames';
import { VariantProps } from 'class-variance-authority';
import { FlexBoxItem } from './flex-box-item';

export type FlexBoxProps = PropsWithChildren<
  VariantProps<typeof flexBoxClassNames>
>;

function FlexBox({ children, ...props }: FlexBoxProps): ReactElement {
  return (
    <Box {...props} display="flex">
      {children}
    </Box>
  );
}

FlexBox.Item = FlexBoxItem;

export { FlexBox };
