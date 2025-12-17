import { containerClassNames } from './container.class-names';

describe('containerClassNames', () => {
  beforeEach(vi.clearAllMocks);

  describe('padding variant', () => {
    const cases = [
      { padding: true, expected: expect.stringContaining('px-4') },
      { padding: false, expected: expect.not.stringContaining('px-4') },
    ] as const;

    it.each(cases)(
      'returns correct classes for padding: $padding',
      ({ padding, expected }) => {
        // Arrange & Act
        const result = containerClassNames({ padding });

        // Assert
        expect(result).toEqual(expected);
      }
    );
  });

  describe('fullWidth variant', () => {
    const cases = [
      { fullWidth: true, expected: expect.stringContaining('w-full') },
      {
        fullWidth: false,
        expected: expect.stringContaining('max-w-[2520px] w-full'),
      },
      {
        fullWidth: undefined,
        expected: expect.stringContaining('max-w-[2520px] w-full'),
      },
    ] as const;

    it.each(cases)(
      'returns correct classes for fullWidth: $fullWidth',
      ({ fullWidth, expected }) => {
        // Arrange & Act
        const result = containerClassNames({ fullWidth });

        // Assert
        expect(result).toEqual(expected);
      }
    );
  });

  describe('narrow variant', () => {
    const cases = [
      { narrow: 'sm', expected: expect.stringContaining('max-w-[568px] px-4') },
      { narrow: 'md', expected: expect.stringContaining('max-w-[623px] px-4') },
      { narrow: 'lg', expected: expect.stringContaining('max-w-[1280px]') },
      {
        narrow: undefined,
        expected: expect.not.stringContaining('max-w-[568px] px-4'),
      },
    ] as const;

    it.each(cases)(
      'returns correct classes for narrow: $narrow',
      ({ narrow, expected }) => {
        // Arrange & Act
        const result = containerClassNames({ narrow });

        // Assert
        expect(result).toEqual(expected);
      }
    );
  });

  describe('center variant', () => {
    const cases = [
      {
        center: true,
        expected: expect.stringContaining('flex justify-center'),
      },
      {
        center: false,
        expected: expect.not.stringContaining('flex justify-center'),
      },
      {
        center: undefined,
        expected: expect.not.stringContaining('flex justify-center'),
      },
    ] as const;

    it.each(cases)(
      'returns correct classes for center: $center',
      ({ center, expected }) => {
        // Arrange & Act
        const result = containerClassNames({ center });

        // Assert
        expect(result).toEqual(expected);
      }
    );
  });

  describe('background color variants', () => {
    // These keys need to match backgroundColorVariants from @/utils/variants
    const bgCases = [
      { bg: 'primary', expected: expect.stringContaining('bg-primary') },
      { bg: 'secondary', expected: expect.stringContaining('bg-secondary') },
      {
        bg: 'transparent',
        expected: expect.stringContaining('bg-transparent'),
      },
      { bg: undefined, expected: expect.not.stringContaining('bg-') },
    ] as const;

    it.each(bgCases)(
      'returns correct classes for bg: $bg',
      ({ bg, expected }) => {
        // Arrange & Act
        const result = containerClassNames({ 'bg-color': bg });

        // Assert
        expect(result).toEqual(expected);
      }
    );
  });

  describe('fullHeight variant', () => {
    // These keys need to match fullHeightVariants from @/utils/variants
    const fhCases = [
      { fullHeight: true, expected: expect.stringContaining('h-dvh') },
      {
        fullHeight: false,
        expected: expect.not.stringContaining('h-dvh'),
      },
      {
        fullHeight: undefined,
        expected: expect.not.stringContaining('h-dvh'),
      },
    ] as const;

    it.each(fhCases)(
      'returns correct classes for fullHeight: $fullHeight',
      ({ fullHeight, expected }) => {
        // Arrange & Act
        const result = containerClassNames({ fullHeight });

        // Assert
        expect(result).toEqual(expected);
      }
    );
  });

  it('returns "mx-auto" when no variants provided', () => {
    // Arrange & Act
    const result = containerClassNames();

    // Assert
    expect(result).toContain('mx-auto');
  });

  it('combines multiple variants correctly', () => {
    // Arrange & Act
    const result = containerClassNames({
      fullWidth: true,
      padding: true,
      narrow: 'md',
      center: true,
      fullHeight: true,
      'bg-color': 'primary',
    });

    // Assert
    expect(result).toContain('w-full');
    expect(result).toContain('px-4');
    expect(result).toContain('max-w-[623px] px-4');
    expect(result).toContain('flex justify-center');
    expect(result).toContain('h-dvh');
    expect(result).toContain('bg-primary');
    expect(result).toContain('mx-auto');
  });
});
