import { PropsWithChildren, ReactElement } from 'react';
import { PropsWithTestId } from '../../../types';
import { VariantProps } from 'class-variance-authority';
import { textClassNames } from './text-classNames';
import { twMerge } from 'tailwind-merge';

type TextElementTag =
  | 'span'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label';

export type TextProps = PropsWithChildren<
  VariantProps<typeof textClassNames> &
    PropsWithTestId<{
      as?: TextElementTag;
    }>
>;

export function Text({
  as = 'span',
  children,
  ...textProps
}: TextProps): ReactElement | null {
  const Tag = as;

  return children ? (
    <Tag className={twMerge(textClassNames({ ...textProps }))}>{children}</Tag>
  ) : null;
}
