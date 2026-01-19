/**
 * Calculates the vertical alignment classes for a dropdown menu based on viewport boundaries.
 *
 * The dropdown is positioned absolutely relative to its parent container, which is a sibling
 * to the trigger element. Both are contained within a wrapper element.
 *
 * @param triggerElement - The trigger element (or wrapper if trigger not found)
 * @param dropdownElement - The dropdown menu element
 * @returns Object with containerClasses and dropdownClasses for vertical alignment
 */
export const DEFAULT_VERTICAL_ALIGNMENT = {
  containerClasses: 'mt-1',
  dropdownClasses: 'top-0',
  isBottomAligned: false,
  transform: '',
}

export type VerticalAlignment = {
  containerClasses: string
  dropdownClasses: string
  isBottomAligned: boolean
  transform: string
}

export function calculateVerticalAlignment(
  triggerElement: HTMLElement | null,
  dropdownElement: HTMLElement | null,
): VerticalAlignment {
  if (!triggerElement || !dropdownElement) {
    // Default to top-aligned (below trigger) if elements are not available
    return DEFAULT_VERTICAL_ALIGNMENT
  }

  const viewportHeight = window.innerHeight

  // Get the dropdown container (parent of dropdown element)
  const dropdownContainer = dropdownElement.parentElement
  if (!dropdownContainer) {
    return DEFAULT_VERTICAL_ALIGNMENT
  }

  const triggerRect = triggerElement.getBoundingClientRect()
  const containerRect = dropdownContainer.getBoundingClientRect()
  const dropdownHeight = dropdownElement.offsetHeight || dropdownElement.getBoundingClientRect().height

  // When using top-0 mt-1, the dropdown appears below the trigger
  // The container has mt-1 (4px margin), and dropdown starts at top-0 of container
  // So dropdown top edge is at containerRect.top, and bottom edge is at containerRect.top + dropdownHeight
  const topAlignedTopEdge = containerRect.top
  const topAlignedBottomEdge = containerRect.top + dropdownHeight

  // When using bottom-0, the dropdown appears above the trigger
  // The container is absolutely positioned with bottom-full, then translated up by trigger height + gap
  // Dropdown bottom should be at triggerRect.top - 4px (mb-1 gap)
  const triggerHeight = triggerRect.height
  const translateY = -(triggerHeight + 4) // Move up by trigger height + 4px gap
  const bottomAlignedBottomEdge = triggerRect.top - 4 // mb-1 = 4px gap
  const bottomAlignedTopEdge = bottomAlignedBottomEdge - dropdownHeight

  // Check if top-aligned dropdown would overflow the viewport
  const topWouldOverflowBottom = topAlignedBottomEdge > viewportHeight
  const topWouldOverflowTop = topAlignedTopEdge < 0
  const topWouldOverflow = topWouldOverflowBottom || topWouldOverflowTop

  // Check if bottom-aligned dropdown would overflow the viewport
  const bottomWouldOverflowBottom = bottomAlignedBottomEdge > viewportHeight
  const bottomWouldOverflowTop = bottomAlignedTopEdge < 0
  const bottomWouldOverflow = bottomWouldOverflowBottom || bottomWouldOverflowTop

  // If top-aligned would overflow but bottom-aligned wouldn't, use bottom-aligned
  if (topWouldOverflow && !bottomWouldOverflow) {
    // Position container above trigger using bottom-full with transform
    // bottom-full positions container's bottom at wrapper's bottom (trigger's bottom)
    // Transform translates it up by trigger height + gap to position above trigger
    return {
      containerClasses: 'absolute bottom-full',
      dropdownClasses: 'bottom-0',
      isBottomAligned: true,
      transform: `translateY(${translateY}px)`,
    }
  }

  // If bottom-aligned would overflow but top-aligned wouldn't, use top-aligned
  if (bottomWouldOverflow && !topWouldOverflow) {
    return DEFAULT_VERTICAL_ALIGNMENT
  }

  // If both would overflow or both fit, prefer top-aligned (default behavior)
  // This handles edge cases where both might overflow slightly
  return DEFAULT_VERTICAL_ALIGNMENT
}
