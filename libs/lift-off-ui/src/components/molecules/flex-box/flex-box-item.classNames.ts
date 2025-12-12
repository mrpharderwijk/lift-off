import { cva } from 'class-variance-authority';
import { flexVariants } from '../../../utils/variants/flex-box/flex';
import { alignSelfVariants } from '../../../utils/variants/flex-box/align-self';
import { orderVariants } from '../../../utils/variants/flex-box/order';
import { positionVariants } from '../../../utils/variants/position/position';
import { paddingVariants } from '../../../utils/variants/padding/padding';
import { flexBasisVariants } from '../../../utils/variants/flex-box/flex-basis';
import { flexWrapVariants } from '../../../utils/variants/flex-box/flex-wrap';
import { flexDirectionVariants } from '../../../utils/variants/flex-box/flex-direction';
import { gapVariants } from '../../../utils/variants/flex-box/gap';
import { alignContentVariants } from '../../../utils/variants/flex-box/align-content';
import { alignItemsVariants } from '../../../utils/variants/flex-box/align-items';
import { justifyContentVariants } from '../../../utils/variants/flex-box/justify-content';
import { marginVariants } from '../../../utils/variants/margin/margin';

export const flexBoxItemClassNames = cva('', {
  variants: {
    ...flexWrapVariants,
    ...flexDirectionVariants,
    ...gapVariants,
    ...alignContentVariants,
    ...alignItemsVariants,
    ...justifyContentVariants,
    ...marginVariants,

    // flex.item specific
    ...flexVariants,
    ...alignSelfVariants,
    ...orderVariants,
    ...positionVariants,
    ...paddingVariants,
    ...flexBasisVariants,
  },
});
