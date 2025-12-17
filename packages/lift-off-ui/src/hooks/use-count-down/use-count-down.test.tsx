import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { useCountDown } from './use-count-down';

describe('useCountDown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T00:00:00Z'));
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should initialize with the correct time left', () => {
    // Arrange
    const futureDate = new Date('2024-01-01T00:00:10Z');

    // Act
    const { result } = renderHook(() => useCountDown(futureDate));

    // Assert
    expect(result.current).toBe(10);
  });

  it('should count down every second', () => {
    // Arrange
    const futureDate = new Date('2024-01-01T00:00:05Z');
    const { result } = renderHook(() => useCountDown(futureDate));

    // Act
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Assert
    expect(result.current).toBe(4);

    // Act
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Assert
    expect(result.current).toBe(2);
  });

  it('should not go negative when date has passed', () => {
    // Arrange
    const futureDate = new Date('2024-01-01T00:00:02Z');
    const { result } = renderHook(() => useCountDown(futureDate));

    // Act
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Assert
    expect(result.current).toBe(0);
  });

  it('should return 0 when date is in the past', () => {
    // Arrange
    const pastDate = new Date('2023-12-31T23:59:59Z');

    // Act
    const { result } = renderHook(() => useCountDown(pastDate));

    // Assert
    expect(result.current).toBe(0);
  });

  it('should update when date prop changes', () => {
    // Arrange
    const initialDate = new Date('2024-01-01T00:00:10Z');
    const { result, rerender } = renderHook(({ date }) => useCountDown(date), {
      initialProps: { date: initialDate },
    });

    // Act
    const newDate = new Date('2024-01-01T00:00:20Z');
    rerender({ date: newDate });

    // Assert
    expect(result.current).toBe(20);
  });

  it('should continue counting down after date prop changes', () => {
    // Arrange
    const initialDate = new Date('2024-01-01T00:00:10Z');
    const { result, rerender } = renderHook(({ date }) => useCountDown(date), {
      initialProps: { date: initialDate },
    });

    // Act
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Assert
    expect(result.current).toBe(8);

    // Act
    const newDate = new Date('2024-01-01T00:00:15Z');
    rerender({ date: newDate });
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Assert
    // After rerender: system time is at 2s, new date is 15s in future = 13s left
    // After advancing 1s: system time is at 3s, new date is 15s in future = 12s left
    expect(result.current).toBe(12);
  });
});
