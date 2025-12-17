import { VariantProps } from 'class-variance-authority';
import { PropsWithChildren, ReactElement } from 'react';

import { Box } from '../../box/box';
import { flexBoxItemClassNames } from './flex-box-item.class-names';
import { ElementTag } from '@/types';

export type FlexBoxItemProps = PropsWithChildren<
  VariantProps<typeof flexBoxItemClassNames> & ElementTag
>;

export function FlexBoxItem({
  children,
  display = 'flex',
  ...props
}: FlexBoxItemProps): ReactElement {
  return (
    <Box {...props} display={display}>
      {children}
    </Box>
  );
}
