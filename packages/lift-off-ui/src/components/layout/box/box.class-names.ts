import { cva } from 'class-variance-authority';

import {
  backgroundColorVariants,
  borderColorVariants,
  borderStyleVariants,
  borderVariants,
  borderRadiusVariants,
  displayVariants,
  alignContentVariants,
  alignItemsVariants,
  alignSelfVariants,
  flexBasisVariants,
  flexDirectionVariants,
  flexVariants,
  flexWrapVariants,
  gapVariants,
  justifyContentVariants,
  orderVariants,
  placeItemsVariants,
  marginVariants,
  opacityVariants,
  overflowVariants,
  paddingVariants,
  bottomVariants,
  floatVariants,
  leftVariants,
  positionVariants,
  rightVariants,
  topVariants,
  zIndexVariants,
  snapVariants,
  snapAlignVariants,
  snapTypeVariants,
  shadowVariants,
  fullHeightVariants,
  fullWidthVariants,
  heightVariants,
  maxWidthVariants,
  widthVariants,
  minWidthVariants,
  minHeightVariants,
  maxHeightVariants,
} from '@/utils/variants';

export const boxClassnames = cva('', {
  variants: {
    ...displayVariants,

    /**
     * Flexbox
     */
    ...flexDirectionVariants,
    ...flexWrapVariants,
    ...justifyContentVariants,
    ...alignItemsVariants,
    ...alignContentVariants,
    ...alignSelfVariants,
    ...flexVariants,
    ...orderVariants,
    ...gapVariants,
    ...flexBasisVariants,
    ...placeItemsVariants,

    /**
     * Spacing
     */
    ...marginVariants,
    ...paddingVariants,

    /**
     * Positioning
     */
    ...positionVariants,
    ...topVariants,
    ...rightVariants,
    ...leftVariants,
    ...bottomVariants,
    ...zIndexVariants,
    ...overflowVariants,
    ...floatVariants,
    ...snapVariants,
    ...snapTypeVariants,
    ...snapAlignVariants,

    /**
     * Sizing
     */
    ...heightVariants,
    ...minHeightVariants,
    ...maxHeightVariants,

    ...widthVariants,
    ...maxWidthVariants,
    ...minWidthVariants,

    ...borderVariants,
    ...borderStyleVariants,
    ...borderColorVariants,
    ...borderRadiusVariants,

    ...opacityVariants,

    ...backgroundColorVariants,
    ...fullHeightVariants,
    ...fullWidthVariants,
    ...shadowVariants,

    spread: {
      true: 'left-0 right-0 top-0 bottom-0',
      false: null,
    },

    container: {
      true: 'container',
      false: null,
    },
  },
  defaultVariants: {
    position: 'relative',
  },
});
