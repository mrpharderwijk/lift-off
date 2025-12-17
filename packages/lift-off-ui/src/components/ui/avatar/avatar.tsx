import { ReactElement } from 'react'

import { avatarClassNames } from './avatar.class-names'

export type AvatarProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null
  src?: string
  alt?: string
}
const avatarSizeMap = {
  xs: 24,
  sm: 34,
  md: 40,
  lg: 48,
  xl: 56,
}

export function Avatar({
  size,
  src = '/placeholder.png',
  alt = 'Avatar',
}: AvatarProps): ReactElement | null {
  if (!size) {
    return null
  }

  const avatarClassName = avatarClassNames({ size })
  const dimensions = avatarSizeMap[size]

  return (
    <img
      className={avatarClassName}
      width={dimensions}
      height={dimensions}
      alt={alt}
      src={src}
    />
  )
}
