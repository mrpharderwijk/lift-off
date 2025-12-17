import { bodyClassNames } from '@/components/typography/body/body.class-names';
import { VariantProps } from 'class-variance-authority';

describe('bodyClassNames', () => {
  beforeEach(vi?.clearAllMocks);

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
        const result = bodyClassNames({ [variant]: value });

        // Assert
        expect(result).toContain(expected);
      }
    );
  });

  describe('text align variant', () => {
    const cases = [
      { variant: 'text-align', value: 'center', expected: 'text-center' },
      { variant: 'text-align', value: 'left', expected: 'text-left' },
      { variant: 'text-align', value: 'right', expected: 'text-right' },
      { variant: 'text-align', value: 'justify', expected: 'text-justify' },
    ] as const;

    it.each(cases)(
      'returns correct class for $variant: $value',
      ({ variant, value, expected }) => {
        // Arrange & Act
        const result = bodyClassNames({
          [variant]: value as VariantProps<typeof bodyClassNames>['text-align'],
        });

        // Assert
        expect(result).toContain(expected);
      }
    );
  });

  describe('padding variants', () => {
    it('returns correct class for padding-x', () => {
      const result = bodyClassNames({ 'padding-x': 4 });
      expect(result).toContain('px-4');
    });

    it('returns correct class for padding-y', () => {
      const result = bodyClassNames({ 'padding-y': 2 });
      expect(result).toContain('py-2');
    });
  });

  describe('text overflow variants', () => {
    it('returns correct class for text-overflow: ellipsis', () => {
      const result = bodyClassNames({ 'text-overflow': 'ellipsis' });
      expect(result).toContain('text-ellipsis');
    });

    it('returns correct class for text-overflow: clip', () => {
      const result = bodyClassNames({ 'text-overflow': 'clip' });
      expect(result).toContain('text-clip');
    });
  });

  describe('combines multiple variants', () => {
    it('returns combined classes for multiple responsive variants', () => {
      const result = bodyClassNames({
        'font-weight': 'bold',
        'font-weight-md': 'medium',
        'text-align': 'center',
        'padding-x': 2,
        'text-overflow': 'clip',
      });
      expect(result).toContain('font-bold');
      expect(result).toContain('md:font-medium');
      expect(result).toContain('text-center');
      expect(result).toContain('px-2');
      expect(result).toContain('text-clip');
    });
  });

  it('returns default classes when no variants provided', () => {
    const result = bodyClassNames();
    // Almost always returns an empty string or whatever default value for cva root
    expect(result).toBe('font-medium');
  });
});
