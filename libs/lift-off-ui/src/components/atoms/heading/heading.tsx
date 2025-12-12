import { PropsWithChildren, ReactElement } from 'react';
import { PropsWithTestId } from '../../../types';

type HeadingElementTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingProps = PropsWithChildren<
  PropsWithTestId<{ as?: HeadingElementTag }>
>;

export function Heading({
  as = 'h1',
  children,
  ...headingProps
}: HeadingProps): ReactElement {
  const Tag = as;

  return <Tag {...headingProps}>{children}</Tag>;
}
