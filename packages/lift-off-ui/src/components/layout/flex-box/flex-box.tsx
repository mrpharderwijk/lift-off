import { VariantProps } from 'class-variance-authority';
import { PropsWithChildren, ReactElement } from 'react';

import { Box } from '@/components/layout/box';
import { flexBoxClassNames } from './flex-box.class-names';
import { FlexBoxItem } from './flex-box-item/flex-box-item';
import { ElementTag, PropsWithTestId } from '@/types';

export type FlexBoxProps = PropsWithChildren<
  VariantProps<typeof flexBoxClassNames> &
    ElementTag &
    PropsWithTestId<{
      tabIndex?: number;
    }>
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
