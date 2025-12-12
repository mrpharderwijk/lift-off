import { cva } from 'class-variance-authority';
import { displayVariants } from '../../../utils/variants/display/display';
import { paddingVariants } from '../../../utils/variants/padding/padding';

export const containerClassNames = cva('', {
  variants: {
    ...displayVariants,
  },
});
