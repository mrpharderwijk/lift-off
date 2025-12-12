import { PropsWithChildren } from 'react';
import { PropsWithTestId } from '../../../types';
import { twMerge } from 'tailwind-merge';
import { containerClassNames } from './container-classNames';
import { VariantProps } from 'class-variance-authority';
import { Box } from '../box/box';

type ContainerElementTag = {
  as?: 'div' | 'section' | 'aside' | 'header' | 'footer' | 'main' | 'article';
};

type ContainerTemplate = {
  template?: 'default' | 'narrow' | 'wide' | 'fullWidthMobile' | 'breakpointWidth';
};

type ContainerStylesProps = VariantProps<typeof containerClassNames> &
  PropsWithChildren<PropsWithTestId<ContainerElementTag & {
    mobileFullWidth?: boolean;
    constrainBreakpoint?: boolean;
  }>>;

export type ContainerProps = ContainerStylesProps;

export function Container({
  as = 'div',
  children,
  'data-testid': testId,
  mobileFullWidth = false,
  constrainBreakpoint = false,
}: ContainerProps) {

  const paddingX = mobileFullWidth ? undefined : 4;

  return (
    <Box
      as={as}
      container={constrainBreakpoint}
      marginX="auto"
      paddingX={paddingX}
      paddingX:sm={6}
      paddingX:lg={8}
      data-testid={testId}
    >
      {children}
    </Box>
  );
}
