import { PropsWithChildren, ReactElement } from 'react';
import { Box, BoxProps } from '../../src/components/atoms/box/box';

type BorderBoxProps = PropsWithChildren<
  Pick<
    BoxProps,
    | 'position'
    | 'width'
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'zIndex'
    | 'border'
    | 'bgColor'
    | 'borderStyle'
    | 'borderColor'
    | 'opacity'
    | 'overflow'
    | 'gap'
    | 'spread'
  >
>;

export function BorderBox({
  children,
  ...props
}: BorderBoxProps): ReactElement {
  const {
    position = 'absolute',
    width = 'full',
    top = 0,
    left = 0,
    right = 0,
    bottom = 0,
    zIndex = 20,
    border = 'px',
    borderStyle = 'dashed',
    borderColor = 'gray-400',
    opacity = 75,
    overflow = 'hidden',
    bgColor = 'transparent',
    spread,
  } = props;
  return (
    <Box
      data-testid="border-box"
      position={position}
      width={width}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      zIndex={zIndex}
      border={border}
      borderStyle={borderStyle}
      borderColor={borderColor}
      bgColor={bgColor}
      opacity={opacity}
      overflow={overflow}
    >
      {children}
    </Box>
  );
}
