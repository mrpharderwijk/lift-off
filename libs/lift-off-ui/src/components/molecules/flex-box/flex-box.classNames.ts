import { cva } from 'class-variance-authority';
import { alignContentVariants } from '../../../utils/variants/flex-box/align-content';
import { flexDirectionVariants } from '../../../utils/variants/flex-box/flex-direction';
import { flexWrapVariants } from '../../../utils/variants/flex-box/flex-wrap';
import { gapVariants } from '../../../utils/variants/flex-box/gap';
import { alignItemsVariants } from '../../../utils/variants/flex-box/align-items';
import { justifyContentVariants } from '../../../utils/variants/flex-box/justify-content';
import { positionVariants } from '../../../utils/variants/position/position';
import { paddingVariants } from '../../../utils/variants/padding/padding';
import { marginVariants } from '../../../utils/variants/margin/margin';

export const flexBoxClassNames = cva('', {
  variants: {
    ...flexWrapVariants,
    ...flexDirectionVariants,
    ...gapVariants,
    ...alignContentVariants,
    ...alignItemsVariants,
    ...justifyContentVariants,
    ...positionVariants,
    ...paddingVariants,
    ...marginVariants,
  },
});
