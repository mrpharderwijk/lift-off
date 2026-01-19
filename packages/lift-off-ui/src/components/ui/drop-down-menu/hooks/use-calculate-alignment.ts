import { calculateHorizontalAlignment, DEFAULT_ALIGNMENT } from "@/components/ui/drop-down-menu/utils/calculate-horizontal-alignment.util"
import { RefObject, useEffect, useRef, useState } from "react"

type UseCalculateAlignmentProps = {
  isOpen: boolean
}

type UseCalculateAlignmentReturnType = {
  wrapperRef: RefObject<HTMLDivElement> | null
  dropdownRef: RefObject<HTMLDivElement> | null
  horizontalAlignment: string
}

export function useCalculateAlignment({ isOpen }: UseCalculateAlignmentProps): UseCalculateAlignmentReturnType {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [horizontalAlignment, setHorizontalAlignment] = useState<string>(DEFAULT_ALIGNMENT)

  // Calculate horizontal alignment when dropdown opens or viewport resizes
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const calculateAlignment = (): void => {
      const wrapper = wrapperRef.current
      const dropdownElement = dropdownRef.current

      if (!dropdownElement || !wrapper) {
        return
      }

      const dropdownContainer = dropdownElement.parentElement

      // Find the trigger element - it's the first element child that's not the dropdown container
      let triggerElement: HTMLElement | null = null
      if (wrapper) {
        // The trigger is cloned, so we need to find the actual rendered element
        // It should be the first child that's not the dropdown container
        for (let i = 0; i < wrapper.children.length; i++) {
          const child = wrapper.children[i] as HTMLElement
          if (child !== dropdownContainer) {
            triggerElement = child
            break
          }
        }
      }

      const horizontalAlignment = calculateHorizontalAlignment(
        triggerElement || wrapper,
        dropdownElement,
      )
      setHorizontalAlignment(horizontalAlignment)
    }

    // Use requestAnimationFrame to ensure DOM is fully rendered
    // The dropdown element might not be in the DOM immediately when isOpen changes
    requestAnimationFrame(() => {
      // Double RAF to ensure the dropdown is fully rendered and measured
      requestAnimationFrame(calculateAlignment)
    })

    // Recalculate on window resize
    const handleResize = (): void => {
      if (isOpen) {
        calculateAlignment()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen])

  return {
    dropdownRef,
    horizontalAlignment,
    wrapperRef,
  }
}
