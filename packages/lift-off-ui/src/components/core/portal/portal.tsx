'use client'

import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: ReactNode
  id?: string
}

export function Portal({
  children,
  id = 'portal',
}: PortalProps): ReactNode | null {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return (): void => setMounted(false)
  }, [])

  return mounted
    ? (createPortal(children, document.querySelector(`#${id}`) || document.body) as ReactNode)
    : null
}
