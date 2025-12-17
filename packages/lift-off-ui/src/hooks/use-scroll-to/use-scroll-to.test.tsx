import { renderHook, act } from '@testing-library/react';
import { useScrollTo } from './use-scroll-to';

describe('useScrollTo', () => {
  beforeEach(() => {
    // Clean up DOM after each test
    document.body.innerHTML = '';
  });

  it('should be defined and return a scrollToElement function', () => {
    const { result } = renderHook(() => useScrollTo());
    expect(result.current.scrollToElement).toBeInstanceOf(Function);
  });

  it('should scroll to the element with the specified ID', () => {
    // Arrange
    const scrollIntoViewMock = vi.fn();
    const mockElement = document.createElement('div');
    mockElement.id = 'target';
    mockElement.scrollIntoView = scrollIntoViewMock;
    document.body.appendChild(mockElement);

    const { result } = renderHook(() => useScrollTo());

    // Act
    act(() => {
      result.current.scrollToElement('target');
    });

    // Assert
    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('should not throw if element with specified ID does not exist', () => {
    const { result } = renderHook(() => useScrollTo());

    expect(() =>
      act(() => {
        result.current.scrollToElement('non-existent-id');
      })
    ).not.toThrow();
  });
});
