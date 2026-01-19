/**
 * Calculates the horizontal alignment classes for a dropdown menu based on viewport boundaries.
 *
 * The dropdown is positioned absolutely relative to its parent container, which is a sibling
 * to the trigger element. Both are contained within a wrapper element.
 *
 * @param triggerElement - The trigger element (or wrapper if trigger not found)
 * @param dropdownElement - The dropdown menu element
 * @returns Tailwind CSS classes for horizontal alignment: either "right-0 left-auto" (right-aligned) or "left-0 right-auto" (left-aligned)
 */
export const DEFAULT_ALIGNMENT = 'right-0 left-auto';

export function calculateHorizontalAlignment(
  triggerElement: HTMLElement | null,
  dropdownElement: HTMLElement | null,
): string {
  if (!triggerElement || !dropdownElement) {
    // Default to right-aligned if elements are not available
    return DEFAULT_ALIGNMENT
  }

  const viewportWidth = window.innerWidth

  // Get the dropdown container (parent of dropdown element)
  const dropdownContainer = dropdownElement.parentElement
  if (!dropdownContainer) {
    return DEFAULT_ALIGNMENT
  }

  const containerRect = dropdownContainer.getBoundingClientRect()
  const dropdownWidth = dropdownElement.offsetWidth || dropdownElement.getBoundingClientRect().width

  // When using right-0 left-auto, the dropdown's right edge aligns with the dropdown container's right edge.
  // Calculate where the left edge would be when right-aligned
  const rightAlignedLeftEdge = containerRect.right - dropdownWidth
  const rightAlignedRightEdge = containerRect.right

  // When using left-0 right-auto, the dropdown's left edge aligns with the dropdown container's left edge.
  // Calculate where the right edge would be when left-aligned
  const leftAlignedLeftEdge = containerRect.left
  const leftAlignedRightEdge = containerRect.left + dropdownWidth

  // Check if right-aligned dropdown would overflow the viewport
  const rightWouldOverflowRight = rightAlignedRightEdge > viewportWidth
  const rightWouldOverflowLeft = rightAlignedLeftEdge < 0
  const rightWouldOverflow = rightWouldOverflowRight || rightWouldOverflowLeft

  // Check if left-aligned dropdown would overflow the viewport
  const leftWouldOverflowRight = leftAlignedRightEdge > viewportWidth
  const leftWouldOverflowLeft = leftAlignedLeftEdge < 0
  const leftWouldOverflow = leftWouldOverflowRight || leftWouldOverflowLeft

  // If right-aligned would overflow but left-aligned wouldn't, use left-aligned
  if (rightWouldOverflow && !leftWouldOverflow) {
    return 'left-0 right-auto'
  }

  // If left-aligned would overflow but right-aligned wouldn't, use right-aligned
  if (leftWouldOverflow && !rightWouldOverflow) {
    return DEFAULT_ALIGNMENT
  }

  // If both would overflow or both fit, prefer right-aligned (default behavior)
  // This handles edge cases where both might overflow slightly
  return DEFAULT_ALIGNMENT
}
