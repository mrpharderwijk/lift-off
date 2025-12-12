import { cva } from 'class-variance-authority';
import { flexDirectionVariants } from '../../../utils/variants/flex-box/flex-direction';
import { flexWrapVariants } from '../../../utils/variants/flex-box/flex-wrap';
import { justifyContentVariants } from '../../../utils/variants/flex-box/justify-content';
import { alignItemsVariants } from '../../../utils/variants/flex-box/align-items';
import { alignContentVariants } from '../../../utils/variants/flex-box/align-content';
import { alignSelfVariants } from '../../../utils/variants/flex-box/align-self';
import { flexVariants } from '../../../utils/variants/flex-box/flex';
import { orderVariants } from '../../../utils/variants/flex-box/order';
import { gapVariants } from '../../../utils/variants/flex-box/gap';
import { paddingVariants } from '../../../utils/variants/padding/padding';
import { marginVariants } from '../../../utils/variants/margin/margin';
import { positionVariants } from '../../../utils/variants/position/position';
import { heightVariants } from '../../../utils/variants/sizing/height';
import { widthVariants } from '../../../utils/variants/sizing/width';
import { rightVariants } from '../../../utils/variants/position/right';
import { topVariants } from '../../../utils/variants/position/top';
import { leftVariants } from '../../../utils/variants/position/left';
import { bottomVariants } from '../../../utils/variants/position/bottom';
import { zIndexVariants } from '../../../utils/variants/position/z-index';
import { borderVariants } from '../../../utils/variants/border/border';
import { borderStyleVariants } from '../../../utils/variants/border/border-style';
import { opacityVariants } from '../../../utils/variants/opacity/opacity';
import { overflowVariants } from '../../../utils/variants/overflow/overflow';
import { borderColorVariants } from '../../../utils/variants/border/border-color';
import { backgroundColorVariants } from '../../../utils/variants/background/background-color';
import { floatVariants } from '../../../utils/variants/position/float';
import { displayVariants } from '../../../utils/variants/display/display';
import { flexBasisVariants } from '../../../utils/variants/flex-box/flex-basis';
import { maxWidthVariants } from '../../../utils/variants/sizing/max-width';

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

    /**
     * Sizing
     */
    ...heightVariants,
    ...widthVariants,
    ...maxWidthVariants,

    ...borderVariants,
    ...borderStyleVariants,
    ...borderColorVariants,

    ...opacityVariants,

    ...backgroundColorVariants,

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
