import { PropsWithChildren, ReactElement } from 'react';
import { Box } from '../../src/components/atoms/box/box';
import { cva, VariantProps } from 'class-variance-authority';
import { positionVariants } from '../../src/utils/variants/position/position';
import { zIndexVariants } from '../../src/utils/variants/position/z-index';

const rectangleClassNames = cva('', {
  variants: {
    ...positionVariants,
    ...zIndexVariants,
    spread: {
      true: 'left-0 right-0 top-0 bottom-0',
      false: null,
    },
  },
});

type RectangleProps = PropsWithChildren<
  VariantProps<typeof rectangleClassNames>
>;

export function Rectangle({
  children,
  position = 'relative',
  spread,
  zIndex,
}: RectangleProps): ReactElement {
  return (
    <Box
      data-testid="rectangle"
      position={position}
      spread={spread}
      zIndex={zIndex}
    >
      <Box position="absolute" spread zIndex={20}>
        <svg
          className="absolute inset-0 h-full w-full bg-white stroke-gray-900/10"
          fill="none"
        >
          <defs>
            <pattern
              id="pattern-2e2e2dfb-58b7-4019-82fc-58ca045f95ff"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
            </pattern>
          </defs>
          <rect
            stroke="none"
            fill="url(#pattern-2e2e2dfb-58b7-4019-82fc-58ca045f95ff)"
            width="100%"
            height="100%"
          ></rect>
        </svg>
      </Box>
      {!!children && (
        <Box position="relative" zIndex={30}>
          {children}
        </Box>
      )}
    </Box>
  );
}
