import {
  buttonContentClassNames,
  buttonContentLabelClassNames,
  buttonContentIconClassNames,
} from './button-content.class-names';

describe('buttonContentClassNames', () => {
  beforeEach(vi.clearAllMocks);

  it('returns base classes', () => {
    // Arrange & Act
    const result = buttonContentClassNames({});

    // Assert
    expect(result).toContain('box-border');
    expect(result).toContain('relative');
    expect(result).toContain('flex');
    expect(result).toContain('flex-row');
    expect(result).toContain('items-center');
    expect(result).toContain('justify-center');
  });

  describe('variant', () => {
    it.each([
      { variant: 'primary' },
      { variant: 'primary-inverse' },
      { variant: 'primary-link' },
      { variant: 'secondary' },
      { variant: 'tertiary' },
      { variant: 'quaternary' },
      { variant: 'quaternary-inverse' },
      { variant: 'outline' },
    ])('applies no additional classes for variant=$variant', ({ variant }) => {
      // Arrange & Act
      const result = buttonContentClassNames({ variant: variant as any });

      // Assert
      expect(result).toContain('box-border');
      expect(result).toContain('relative');
      expect(result).toContain('flex');
    });

    it.each([
      {
        variant: 'sidebar-menu-item',
        expectedClasses: ['gap-4', 'justify-start'],
      },
      {
        variant: 'sidebar-menu-item-active',
        expectedClasses: ['gap-4', 'justify-start'],
      },
    ])(
      'applies correct classes for variant=$variant',
      ({ variant, expectedClasses }) => {
        // Arrange & Act
        const result = buttonContentClassNames({ variant: variant as any });

        // Assert
        expectedClasses.forEach((expectedClass) => {
          expect(result).toContain(expectedClass);
        });
      }
    );
  });

  describe('withIcon', () => {
    it('applies gap-2 when withIcon is true', () => {
      // Arrange & Act
      const result = buttonContentClassNames({ withIcon: true });

      // Assert
      expect(result).toContain('gap-2');
    });

    it('applies gap-0 when withIcon is false', () => {
      // Arrange & Act
      const result = buttonContentClassNames({ withIcon: false });

      // Assert
      expect(result).toContain('gap-0');
    });
  });

  describe('compound variants', () => {
    describe('loading', () => {
      it('applies bg-primary-disabled for primary variant when loading is true', () => {
        // Arrange & Act
        const result = buttonContentClassNames({
          variant: 'primary',
          loading: true,
        });

        // Assert
        expect(result).toContain('bg-primary-disabled');
      });

      it('applies bg-primary-inverse-disabled for primary-inverse variant when loading is true', () => {
        // Arrange & Act
        const result = buttonContentClassNames({
          variant: 'primary-inverse',
          loading: true,
        });

        // Assert
        expect(result).toContain('bg-primary-inverse-disabled');
      });

      it('applies bg-secondary-disabled for secondary variant when loading is true', () => {
        // Arrange & Act
        const result = buttonContentClassNames({
          variant: 'secondary',
          loading: true,
        });

        // Assert
        expect(result).toContain('bg-secondary-disabled');
      });
    });
  });
});

describe('buttonContentLabelClassNames', () => {
  beforeEach(vi.clearAllMocks);

  it('returns base classes', () => {
    // Arrange & Act
    const result = buttonContentLabelClassNames({});

    // Assert
    expect(result).toContain('flex-initial');
  });

  describe('variant', () => {
    it.each([
      { variant: 'primary' },
      { variant: 'primary-inverse' },
      { variant: 'secondary' },
      { variant: 'tertiary' },
      { variant: 'quaternary' },
      { variant: 'quaternary-inverse' },
      { variant: 'outline' },
    ])('applies no additional classes for variant=$variant', ({ variant }) => {
      // Arrange & Act
      const result = buttonContentLabelClassNames({ variant: variant as any });

      // Assert
      expect(result).toContain('flex-initial');
    });

    it('applies underline classes for primary-link variant', () => {
      // Arrange & Act
      const result = buttonContentLabelClassNames({ variant: 'primary-link' });

      // Assert
      expect(result).toContain('underline');
      expect(result).toContain('decoration-1');
    });

    it('applies font-medium for sidebar-menu-item variant', () => {
      // Arrange & Act
      const result = buttonContentLabelClassNames({
        variant: 'sidebar-menu-item',
      });

      // Assert
      expect(result).toContain('font-medium');
    });

    it('applies font-semibold for sidebar-menu-item-active variant', () => {
      // Arrange & Act
      const result = buttonContentLabelClassNames({
        variant: 'sidebar-menu-item-active',
      });

      // Assert
      expect(result).toContain('font-semibold');
    });
  });

  describe('avatar', () => {
    it('applies rounded-full w-10 h-10 when avatar is true', () => {
      // Arrange & Act
      const result = buttonContentLabelClassNames({ avatar: true });

      // Assert
      expect(result).toContain('rounded-full');
      expect(result).toContain('w-10');
      expect(result).toContain('h-10');
    });

    it('does not apply avatar classes when avatar is false', () => {
      // Arrange & Act
      const result = buttonContentLabelClassNames({ avatar: false });

      // Assert
      expect(result).not.toContain('rounded-full');
      expect(result).not.toContain('w-10');
      expect(result).not.toContain('h-10');
    });
  });

  describe('loading', () => {
    it('applies invisible when loading is true', () => {
      // Arrange & Act
      const result = buttonContentLabelClassNames({ loading: true });

      // Assert
      expect(result).toContain('invisible');
    });

    it('applies visible when loading is false', () => {
      // Arrange & Act
      const result = buttonContentLabelClassNames({ loading: false });

      // Assert
      expect(result).toContain('visible');
    });
  });

  describe('underline', () => {
    it('applies underline classes when underline is true', () => {
      // Arrange & Act
      const result = buttonContentLabelClassNames({ underline: true });

      // Assert
      expect(result).toContain('underline');
      expect(result).toContain('underline-offset-1');
      expect(result).toContain('decoration-1');
    });

    it('does not apply underline classes when underline is false', () => {
      // Arrange & Act
      const result = buttonContentLabelClassNames({ underline: false });

      // Assert
      expect(result).not.toContain('underline-offset-1');
      expect(result).not.toContain('decoration-1');
    });
  });

  describe('compound variants', () => {
    describe('primary-link with size', () => {
      it.each([
        { size: 'xs' },
        { size: 'sm' },
        { size: 'md' },
        { size: 'lg' },
        { size: 'xl' },
      ])(
        'applies underline-offset-2 for primary-link variant with size=$size',
        ({ size }) => {
          // Arrange & Act
          const result = buttonContentLabelClassNames({
            variant: 'primary-link',
            size: size as any,
          });

          // Assert
          expect(result).toContain('underline-offset-2');
        }
      );
    });
  });
});

describe('buttonContentIconClassNames', () => {
  beforeEach(vi.clearAllMocks);

  it('returns base classes', () => {
    // Arrange & Act
    const result = buttonContentIconClassNames({});

    // Assert
    expect(result).toBe('');
  });

  describe('size', () => {
    it.each([
      { size: 'xs', expectedSize: 'w-4 h-4' },
      { size: 'sm', expectedSize: 'w-4 h-4' },
      { size: 'md', expectedSize: 'w-4 h-4' },
      { size: 'lg', expectedSize: 'w-5 h-5' },
      { size: 'xl', expectedSize: 'w-6 h-6' },
    ])(
      'applies correct size classes for size=$size',
      ({ size, expectedSize }) => {
        // Arrange & Act
        const result = buttonContentIconClassNames({ size: size as any });

        // Assert
        const [width, height] = expectedSize.split(' ');
        expect(result).toContain(width);
        expect(result).toContain(height);
      }
    );
  });

  describe('variant', () => {
    it.each([
      { variant: 'primary' },
      { variant: 'primary-inverse' },
      { variant: 'primary-link' },
      { variant: 'secondary' },
      { variant: 'tertiary' },
      { variant: 'quaternary' },
      { variant: 'quaternary-inverse' },
      { variant: 'outline' },
      { variant: 'sidebar-menu-item' },
      { variant: 'sidebar-menu-item-active' },
    ])('applies no additional classes for variant=$variant', ({ variant }) => {
      // Arrange & Act
      const result = buttonContentIconClassNames({ variant: variant as any });

      // Assert
      expect(result).toBe('');
    });
  });

  describe('loading', () => {
    it('applies invisible when loading is true', () => {
      // Arrange & Act
      const result = buttonContentIconClassNames({ loading: true });

      // Assert
      expect(result).toContain('invisible');
    });

    it('applies visible when loading is false', () => {
      // Arrange & Act
      const result = buttonContentIconClassNames({ loading: false });

      // Assert
      expect(result).toContain('visible');
    });
  });
});
