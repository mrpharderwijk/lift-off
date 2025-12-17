import { boxClassnames } from '@/components/layout/box/box.class-names';

describe('boxClassnames', () => {
  beforeEach(vi.clearAllMocks);

  describe('display variants', () => {
    const cases = [
      { display: 'block', expected: expect.stringContaining('block') },
      { display: 'inline', expected: expect.stringContaining('inline') },
      { display: 'flex', expected: expect.stringContaining('flex') },
      { display: undefined, expected: expect.not.stringContaining('block') },
    ] as const;

    it.each(cases)(
      'returns correct classes for display: $display',
      ({ display, expected }) => {
        // Arrange & Act
        const result = boxClassnames({ display });

        // Assert
        expect(result).toEqual(expected);
      }
    );
  });

  describe('flexbox variants', () => {
    const cases = [
      {
        'flex-direction': 'row',
        expected: expect.stringContaining('flex-row'),
      },
      { 'flex-wrap': 'wrap', expected: expect.stringContaining('flex-wrap') },
      {
        'align-items': 'center',
        expected: expect.stringContaining('items-center'),
      },
      {
        'justify-content': 'between',
        expected: expect.stringContaining('justify-between'),
      },
      { gap: 2, expected: expect.stringContaining('gap-2') },
    ] as const;

    it.each(cases)('returns correct flex classes', (testCase) => {
      // Arrange & Act
      const [variant, value] = Object.entries(testCase).find(
        ([k]) => k !== 'expected'
      )!;
      const { expected } = testCase;
      const result = boxClassnames({ [variant]: value });

      // Assert
      expect(result).toEqual(expected);
    });
  });

  describe('spacing variants', () => {
    const cases = [
      { prop: 'margin', value: 4, expected: expect.stringContaining('m-4') },
      { prop: 'padding', value: 2, expected: expect.stringContaining('p-2') },
      {
        prop: 'margin-top',
        value: 1,
        expected: expect.stringContaining('mt-1'),
      },
      {
        prop: 'padding-bottom',
        value: 8,
        expected: expect.stringContaining('pb-8'),
      },
    ] as const;

    it.each(cases)(
      'returns correct spacing classes',
      ({ prop, value, expected }) => {
        // Arrange & Act
        const result = boxClassnames({ [prop]: value });

        // Assert
        expect(result).toEqual(expected);
      }
    );
  });

  describe('positioning variants', () => {
    const cases = [
      {
        prop: 'position',
        value: 'absolute',
        expected: expect.stringContaining('absolute'),
      },
      { prop: 'top', value: 0, expected: expect.stringContaining('top-0') },
      { prop: 'left', value: 2, expected: expect.stringContaining('left-2') },
      { prop: 'right', value: 4, expected: expect.stringContaining('right-4') },
      {
        prop: 'bottom',
        value: 8,
        expected: expect.stringContaining('bottom-8'),
      },
      { prop: 'z-index', value: 10, expected: expect.stringContaining('z-10') },
      {
        prop: 'overflow',
        value: 'hidden',
        expected: expect.stringContaining('overflow-hidden'),
      },
    ] as const;

    it.each(cases)(
      'returns correct positioning classes',
      ({ prop, value, expected }) => {
        // Arrange & Act
        const result = boxClassnames({ [prop]: value });

        // Assert
        expect(result).toEqual(expected);
      }
    );

    it('returns relative as the default position', () => {
      // Arrange & Act
      const result = boxClassnames();

      // Assert
      expect(result).toContain('relative');
    });
  });

  describe('sizing variants', () => {
    const cases = [
      { prop: 'height', value: 24, expected: expect.stringContaining('h-24') },
      {
        prop: 'min-height',
        value: 'xl',
        expected: expect.stringContaining('min-h-xl'),
      },
      {
        prop: 'max-height',
        value: '7xl',
        expected: expect.stringContaining('max-h-7xl'),
      },
      { prop: 'width', value: 32, expected: expect.stringContaining('w-32') },
      {
        prop: 'min-width',
        value: 'sm',
        expected: expect.stringContaining('min-w-sm'),
      },
      {
        prop: 'max-width',
        value: 'full',
        expected: expect.stringContaining('max-w-full'),
      },
    ] as const;

    it.each(cases)(
      'returns correct sizing classes',
      ({ prop, value, expected }) => {
        // Arrange & Act
        const result = boxClassnames({ [prop]: value });

        // Assert
        expect(result).toEqual(expected);
      }
    );
  });

  describe('border and radius variants', () => {
    const cases = [
      { border: 'px', expected: expect.stringContaining('border') },
      {
        'border-style': 'dashed',
        expected: expect.stringContaining('border-dashed'),
      },
      {
        'border-color': 'primary',
        expected: expect.stringContaining('border-primary'),
      },
      {
        'border-radius': 'lg',
        expected: expect.stringContaining('rounded-lg'),
      },
    ] as const;

    it.each(cases)('returns correct border/radius classes', (testCase) => {
      // Arrange & Act
      const { expected, ...rest } = testCase;
      const result = boxClassnames(rest);

      // Assert
      expect(result).toEqual(expected);
    });
  });

  describe('background color and opacity', () => {
    const cases = [
      {
        'bg-color': 'primary',
        expected: expect.stringContaining('bg-primary'),
      },
      { opacity: 50, expected: expect.stringContaining('opacity-50') },
    ] as const;

    it.each(cases)(
      'returns correct background/opacity classes',
      ({ ...params }) => {
        // Arrange & Act
        const { expected, ...rest } = params;
        const result = boxClassnames(rest);

        // Assert
        expect(result).toEqual(expected);
      }
    );
  });

  describe('fullHeight and fullWidth', () => {
    const cases = [
      { fullHeight: true, expected: expect.stringContaining('h-dvh') },
      { fullWidth: true, expected: expect.stringContaining('w-full') },
    ] as const;

    it.each(cases)(
      'returns correct fullHeight/fullWidth classes',
      ({ ...params }) => {
        // Arrange & Act
        const { expected, ...rest } = params;
        const result = boxClassnames(rest);

        // Assert
        expect(result).toEqual(expected);
      }
    );
  });

  describe('shadow variants', () => {
    const cases = [
      { shadow: 'md', expected: expect.stringContaining('shadow-md') },
      { shadow: 'none', expected: expect.stringContaining('shadow-none') },
    ] as const;

    it.each(cases)('returns correct shadow classes', ({ shadow, expected }) => {
      // Arrange & Act
      const result = boxClassnames({ shadow });

      // Assert
      expect(result).toEqual(expected);
    });
  });

  describe('spread and container', () => {
    it('returns spread classes when spread is true', () => {
      // Arrange & Act
      const result = boxClassnames({ spread: true });

      // Assert
      expect(result).toContain('left-0');
      expect(result).toContain('right-0');
      expect(result).toContain('top-0');
      expect(result).toContain('bottom-0');
    });

    it('does not return spread classes when spread is false', () => {
      // Arrange & Act
      const result = boxClassnames({ spread: false });

      // Assert
      expect(result).not.toContain('left-0');
      expect(result).not.toContain('right-0');
      expect(result).not.toContain('top-0');
      expect(result).not.toContain('bottom-0');
    });

    it('returns container class when container is true', () => {
      // Arrange & Act
      const result = boxClassnames({ container: true });

      // Assert
      expect(result).toContain('container');
    });

    it('does not return container class when container is false', () => {
      // Arrange & Act
      const result = boxClassnames({ container: false });

      // Assert
      expect(result).not.toContain('container');
    });
  });

  it('combines multiple variants correctly', () => {
    // Arrange & Act
    const result = boxClassnames({
      display: 'block',
      position: 'absolute',
      width: 10,
      padding: 2,
      'bg-color': 'primary',
      shadow: 'md',
      flex: 1,
    });

    // Assert
    expect(result).toContain('block');
    expect(result).toContain('absolute');
    expect(result).toContain('w-10');
    expect(result).toContain('p-2');
    expect(result).toContain('bg-primary');
    expect(result).toContain('shadow-md');
    expect(result).toContain('flex-1');
  });

  it('returns "relative" as position by default', () => {
    // Arrange & Act
    const result = boxClassnames();

    // Assert
    expect(result).toContain('relative');
  });
});
