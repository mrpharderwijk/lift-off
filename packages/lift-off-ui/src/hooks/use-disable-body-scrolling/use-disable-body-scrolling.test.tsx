import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

import { useDisableBodyScrolling } from './use-disable-body-scrolling'

// Store original style
let originalOverflow: string

describe('useDisableBodyScrolling', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Store original overflow value
    originalOverflow = document.body.style.overflow
    // Reset to empty string for each test
    document.body.style.overflow = ''
  })

  afterEach(() => {
    // Restore original overflow value
    document.body.style.overflow = originalOverflow
  })

  it('should disable body scrolling when disabled is true', () => {
    // Arrange & Act
    renderHook(() => useDisableBodyScrolling({ disabled: true }))

    // Assert
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('should enable body scrolling when disabled is false', () => {
    // Arrange
    const { rerender } = renderHook(
      ({ disabled }) => useDisableBodyScrolling({ disabled }),
      { initialProps: { disabled: true } }
    )

    // Act
    rerender({ disabled: false })

    // Assert
    expect(document.body.style.overflow).toBe('auto')
  })

  it('should handle multiple instances correctly', () => {
    // Arrange
    const { rerender: rerender1 } = renderHook(
      ({ disabled }) => useDisableBodyScrolling({ disabled }),
      { initialProps: { disabled: true } }
    )

    const { rerender: rerender2 } = renderHook(
      ({ disabled }) => useDisableBodyScrolling({ disabled }),
      { initialProps: { disabled: true } }
    )

    // Act - Disable first instance
    rerender1({ disabled: false })

    // Assert - Body should still be hidden because second instance is active
    expect(document.body.style.overflow).toBe('hidden')

    // Act - Disable second instance
    rerender2({ disabled: false })

    // Assert - Body should now be auto because no instances are active
    expect(document.body.style.overflow).toBe('auto')
  })

  it('should handle rapid state changes correctly', () => {
    // Arrange
    const { rerender } = renderHook(
      ({ disabled }) => useDisableBodyScrolling({ disabled }),
      { initialProps: { disabled: true } }
    )

    // Act - Rapidly change states
    act(() => {
      rerender({ disabled: false })
      rerender({ disabled: true })
      rerender({ disabled: false })
    })

    // Assert - Should end up with auto overflow
    expect(document.body.style.overflow).toBe('auto')
  })

  it('should not decrement counter when already inactive', () => {
    // Arrange
    const { rerender } = renderHook(
      ({ disabled }) => useDisableBodyScrolling({ disabled }),
      { initialProps: { disabled: false } }
    )

    // Act - Try to disable when already disabled
    rerender({ disabled: false })

    // Assert - Should remain auto
    expect(document.body.style.overflow).toBe('auto')
  })

  it('should handle cleanup on unmount correctly', () => {
    // Arrange
    const { unmount } = renderHook(() =>
      useDisableBodyScrolling({ disabled: true })
    )

    // Act
    unmount()

    // Assert
    expect(document.body.style.overflow).toBe('auto')
  })

  it('should handle multiple instances with cleanup', () => {
    // Arrange
    const { unmount: unmount1 } = renderHook(() =>
      useDisableBodyScrolling({ disabled: true })
    )

    const { unmount: unmount2 } = renderHook(() =>
      useDisableBodyScrolling({ disabled: true })
    )

    // Act - Unmount first instance
    unmount1()

    // Assert - Body should still be hidden because second instance is active
    expect(document.body.style.overflow).toBe('hidden')

    // Act - Unmount second instance
    unmount2()

    // Assert - Body should now be auto because no instances are active
    expect(document.body.style.overflow).toBe('auto')
  })
})
