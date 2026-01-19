'use client'

import { PropsWithChildren, ReactElement, RefObject } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import { FlexBox } from '@/components/layout/flex-box/flex-box'
import { useDropDownContext } from '@/components/ui/drop-down-menu/providers/drop-down-context-provider'
import { useCalculateAlignment } from '@/components/ui/drop-down-menu/hooks/use-calculate-alignment'
import { cn } from '@/utils/class-names'

export type DropDownMenuProps = PropsWithChildren & {
  trigger: ReactElement
  isOpen: boolean
  id: string
  size?: 'sm' | 'md'
}

export function DropDownMenu({
  children,
  isOpen,
  trigger,
  id,
  size = 'md',
}: DropDownMenuProps): ReactElement {
  const { closeDropDown, currentOpenDropDown } = useDropDownContext()
  const { wrapperRef, dropdownRef, horizontalAlignment } = useCalculateAlignment({ isOpen })
  const dropDownClassName = cn(
    'absolute rounded-xl shadow-md w-[40vw] bg-white text-sm py-2 border border-border-tertiary z-10',
    horizontalAlignment,
    {
      'w-[40vw] md:w-64': size === 'md',
      'w-[20vw] md:w-32': size === 'sm',
    },
  )

  useOnClickOutside(wrapperRef as RefObject<HTMLElement>, () => {
    if (currentOpenDropDown !== id) {
      return
    }
    closeDropDown(id)
  })

  return (
    <div ref={wrapperRef} className="relative">
      {trigger}
      {isOpen && (
        <div className="relative mt-1">
          <div ref={dropdownRef} className={dropDownClassName}>
            <FlexBox flex-direction="col">{children}</FlexBox>
          </div>
        </div>
      )}
    </div>
  )
}
