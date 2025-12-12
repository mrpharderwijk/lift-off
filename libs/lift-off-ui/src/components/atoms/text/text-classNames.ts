import { cva } from 'class-variance-authority';
import { fontSizeVariants } from '../../../utils/variants/typography/font-size';
import { lineHeightVariants } from '../../../utils/variants/typography/line-height';
import { letterSpacingVariants } from '../../../utils/variants/typography/letter-spacing';
import { fontWeightVariants } from '../../../utils/variants/typography/font-weight';
import { textAlignVariants } from '../../../utils/variants/typography/text-align';

export const textClassNames = cva('', {
  variants: {
    ...fontSizeVariants,
    ...fontWeightVariants,
    ...letterSpacingVariants,
    ...lineHeightVariants,
    ...textAlignVariants,
  },
});
