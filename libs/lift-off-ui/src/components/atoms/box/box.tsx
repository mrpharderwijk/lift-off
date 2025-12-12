import { PropsWithChildren, ReactElement } from 'react';
import { ElementTag, PropsWithTestId } from '../../../types';
import { type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { boxClassnames } from './box-classNames';

type BoxStylesProps = VariantProps<typeof boxClassnames> &
  PropsWithChildren<PropsWithTestId<ElementTag>>;

export type BoxProps = BoxStylesProps;

export function Box({
  as = 'div',
  children,
  'data-testid': testId,
  ...boxProps
}: BoxProps): ReactElement {
  const Tag = as;

  return (
    <Tag
      data-testid={testId}
      className={twMerge(boxClassnames({ ...boxProps }))}
    >
      {children}
    </Tag>
  );
}
