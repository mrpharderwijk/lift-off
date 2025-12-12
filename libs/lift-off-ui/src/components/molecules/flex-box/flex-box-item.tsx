import { PropsWithChildren, ReactElement } from 'react';
import { Box } from '../../atoms/box/box';
import { VariantProps } from 'class-variance-authority';
import { flexBoxItemClassNames } from './flex-box-item.classNames';

export type FlexBoxItemProps = PropsWithChildren<
  VariantProps<typeof flexBoxItemClassNames>
>;

export function FlexBoxItem({
  children,
  ...props
}: FlexBoxItemProps): ReactElement {
  return <Box {...props}>{children}</Box>;
}
