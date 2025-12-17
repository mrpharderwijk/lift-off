import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren, ReactElement, Ref } from 'react'
import { HtmlHTMLAttributes } from 'react'

import { textClassNames } from '../text/text.class-names'

type AnchorProps = PropsWithChildren<
  VariantProps<typeof textClassNames> &
    Omit<HtmlHTMLAttributes<HTMLAnchorElement>, 'className'> & {
      ref?: Ref<HTMLAnchorElement>
    }
>

export function Anchor({ children, ref, ...props }: AnchorProps): ReactElement {
  const anchorClassName = textClassNames({ ...props })

  return (
    <a ref={ref} {...props} className={anchorClassName}>
      {children}
    </a>
  )
}
