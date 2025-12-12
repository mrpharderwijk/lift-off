import { PropsWithChildren, ReactElement } from 'react';
import { Box, BoxProps } from '../../src/components/atoms/box/box';

type MarginBoxProps = PropsWithChildren<BoxProps>;

export function MarginBox({
  children,
  ...props
}: MarginBoxProps): ReactElement {
  const {
    position = 'absolute',
    top = 0,
    right = 0,
    bottom = 0,
    left = 0,
    opacity,
    float,
    bgColor = 'pink-100',
    zIndex,
    width = 'full',
  } = props;
  return (
    <Box
      position={position}
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      bgColor={bgColor}
      float={float}
      opacity={opacity}
      width={width}
      zIndex={zIndex}
    >
      {children}
    </Box>
  );
}
