import { ReactElement } from 'react'

export function DropDownMenuItemDivider(): ReactElement {
  return (
    <div className="px-8 py-2">
      <hr className="h-px border-t border-border-primary-disabled" />
    </div>
  )
}
