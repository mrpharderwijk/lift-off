import { backgroundClassNames } from './background.class-names';

describe('backgroundClassNames', () => {
  beforeEach(vi.clearAllMocks);

  describe('padding variant', () => {
    const cases = [
      {
        prop: 'padding-x',
        value: 4,
        expected: expect.stringContaining('px-4'),
      },
      {
        prop: 'padding-x',
        value: 6,
        expected: expect.stringContaining('px-6'),
      },
      {
        prop: 'padding-x',
        value: undefined,
        expected: expect.not.stringContaining('px-'),
      },
    ] as const;

    it.each(cases)(
      'returns correct classes for padding: $padding',
      ({ prop, value, expected }) => {
        // Arrange & Act
        const result = backgroundClassNames({ [prop]: value });

        // Assert
        expect(result).toEqual(expected);
      }
    );
  });

  describe('fullWidth variant', () => {
    const cases = [
      { fullWidth: true, expected: expect.stringContaining('w-full') },
      { fullWidth: false, expected: expect.not.stringContaining('w-full') },
      { fullWidth: undefined, expected: expect.stringContaining('w-full') }, // default true
    ] as const;

    it.each(cases)(
      'returns correct classes for fullWidth: $fullWidth',
      ({ fullWidth, expected }) => {
        // Arrange & Act
        const result = backgroundClassNames({ fullWidth });

        // Assert
        expect(result).toEqual(expected);
      }
    );
  });

  describe('background color variants', () => {
    // These keys need to match backgroundColorVariants from @/utils/variants
    const bgCases = [
      {
        'bg-color': 'primary',
        expected: expect.stringContaining('bg-primary'),
      },
      {
        'bg-color': 'secondary',
        expected: expect.stringContaining('bg-secondary'),
      },
      {
        'bg-color': 'transparent',
        expected: expect.stringContaining('bg-transparent'),
      },
      { 'bg-color': undefined, expected: expect.not.stringContaining('bg-') },
    ] as const;

    it.each(bgCases)(
      'returns correct classes for bg: $bg',
      ({ 'bg-color': bg, expected }) => {
        // Arrange & Act
        const result = backgroundClassNames({ 'bg-color': bg });

        // Assert
        expect(result).toEqual(expected);
      }
    );
  });

  it('combines multiple variants correctly', () => {
    // Arrange & Act
    const result = backgroundClassNames({
      fullWidth: true,
      'padding-x': 4,
      'bg-color': 'primary',
    });

    // Assert
    expect(result).toContain('w-full');
    expect(result).toContain('px-4');
    expect(result).toContain('bg-primary');
  });

  it('returns w-full by default', () => {
    // Arrange & Act
    const result = backgroundClassNames();

    // Assert
    expect(result).toContain('w-full');
  });
});
