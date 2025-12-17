import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { Avatar } from './avatar'

describe('Avatar', () => {
  const cases = [
    { size: 'xs', width: 24, height: 24 },
    { size: 'sm', width: 34, height: 34 },
    { size: 'md', width: 40, height: 40 },
    { size: 'lg', width: 48, height: 48 },
    { size: 'xl', width: 56, height: 56 },
    { size: null },
    { size: undefined },
  ] as const

  it.each(cases)('renders avatar with size $size', ({ size, width, height }) => {
    // Arrange & Act
    const { container } = render(<Avatar size={size} />)

    // Assert
    if (size === null || size === undefined) {
      expect(container.firstChild).toBeNull()
      return
    }

    const img = screen.getByAltText('Avatar')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('width', String(width))
    expect(img).toHaveAttribute('height', String(height))
    expect(img).toHaveAttribute('src', '/placeholder.png')
  })

  it('renders avatar with custom src and alt', () => {
    // Arrange & Act
    render(<Avatar size="md" src="/custom-avatar.png" alt="Custom Avatar" />)

    // Assert
    const img = screen.getByAltText('Custom Avatar')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/custom-avatar.png')
  })
})
