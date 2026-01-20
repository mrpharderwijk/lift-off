import { textClassNames } from '@/components/core/typography/text/text.class-names';

describe('textClassNames', () => {
  beforeEach(vi.clearAllMocks);

  describe('font size variant', () => {
    const cases = [
      { variant: 'font-size', value: 'base-md', expected: 'text-base-md' },
      {
        variant: 'font-size-sm',
        value: 'base-xs',
        expected: 'sm:text-base-xs',
      },
      {
        variant: 'font-size-md',
        value: 'base-xl',
        expected: 'md:text-base-xl',
      },
      {
        variant: 'font-size-lg',
        value: 'base-xlt',
        expected: 'lg:text-base-xlt',
      },
      {
        variant: 'font-size-xl',
        value: 'base-sm',
        expected: 'xl:text-base-sm',
      },
    ] as const;

    it.each(cases)(
      'returns correct class for $variant: $value',
      ({ variant, value, expected }) => {
        // Arrange & Act
        const result = textClassNames({ [variant]: value });

        // Assert
        expect(result).toContain(expected);
      }
    );
  });

  describe('font weight variant', () => {
    const cases = [
      { variant: 'font-weight', value: 'bold', expected: 'font-bold' },
      { variant: 'font-weight-sm', value: 'thin', expected: 'sm:font-thin' },
      {
        variant: 'font-weight-md',
        value: 'medium',
        expected: 'md:font-medium',
      },
      {
        variant: 'font-weight-lg',
        value: 'extrabold',
        expected: 'lg:font-extrabold',
      },
      { variant: 'font-weight-xl', value: 'light', expected: 'xl:font-light' },
    ] as const;

    it.each(cases)(
      'returns correct class for $variant: $value',
      ({ variant, value, expected }) => {
        // Arrange & Act
        const result = textClassNames({ [variant]: value });

        // Assert
        expect(result).toContain(expected);
      }
    );
  });

  describe('text color variant', () => {
    const cases = [
      { variant: 'text-color', value: 'blue', expected: 'text-mykonos' },
      {
        variant: 'text-color-sm',
        value: 'gray',
        expected: 'sm:text-text-gray',
      },
      {
        variant: 'text-color-md',
        value: 'primary-error',
        expected: 'md:text-text-primary-error',
      },
      {
        variant: 'text-color-lg',
        value: 'secondary',
        expected: 'lg:text-text-secondary',
      },
    ] as const;

    it.each(cases)(
      'returns correct class for $variant: $value',
      ({ variant, value, expected }) => {
        // Arrange & Act
        const result = textClassNames({ [variant]: value });

        // Assert
        expect(result).toContain(expected);
      }
    );
  });

  describe('combines multiple variants', () => {
    it('returns combined classes for multiple responsive variants', () => {
      const result = textClassNames({
        'font-size': 'base-md',
        'font-weight-md': 'medium',
        'text-color-sm': 'gray',
      });
      expect(result).toContain('text-base-md');
      expect(result).toContain('md:font-medium');
      expect(result).toContain('sm:text-text-gray');
    });
  });

  it('returns default classes when no variants provided', () => {
    const result = textClassNames();
    expect(result).toContain('underline-offset-1');
    expect(result).toContain('decoration-1');
  });

  describe('other style utility variants', () => {
    it('returns letter spacing classes', () => {
      const result = textClassNames({ 'letter-spacing': 'wide' });
      expect(result).toContain('wide');
    });

    it('returns line-clamp classes', () => {
      const result = textClassNames({ 'line-clamp': 2 });
      expect(result).toContain('line-clamp-2');
    });

    it('returns text align classes', () => {
      const result = textClassNames({ 'text-align': 'center' });
      expect(result).toContain('text-center');
    });

    it('returns text decoration classes', () => {
      const result = textClassNames({ 'text-decoration': 'underline' });
      expect(result).toContain('underline');
    });

    it('returns white-space classes', () => {
      const result = textClassNames({ 'white-space': 'nowrap' });
      expect(result).toContain('whitespace-nowrap');
    });

    it('returns padding classes', () => {
      const result = textClassNames({ 'padding-x': 5 });
      expect(result).toContain('px-5');
    });
  });

  it('combines all supported variants correctly', () => {
    const result = textClassNames({
      'font-size': 'base-md',
      'font-size-md': 'base-xs',
      'font-weight': 'bold',
      'font-weight-lg': 'extrabold',
      'text-color': 'blue',
      'text-align': 'center',
      'text-decoration': 'underline',
      'white-space': 'nowrap',
      'line-clamp': 3,
      'padding-x': 4,
    });

    expect(result).toContain('text-base-md');
    expect(result).toContain('md:text-base-xs');
    expect(result).toContain('font-bold');
    expect(result).toContain('lg:font-extrabold');
    expect(result).toContain('text-mykonos');
    expect(result).toContain('text-center');
    expect(result).toContain('underline');
    expect(result).toContain('whitespace-nowrap');
    expect(result).toContain('line-clamp-3');
    expect(result).toContain('px-4');
  });
});
