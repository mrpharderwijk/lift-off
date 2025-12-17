import { buttonClassNames } from './button.class-names';

describe('buttonClassNames', () => {
  beforeEach(vi.clearAllMocks);

  it('returns base classes', () => {
    // Arrange & Act
    const result = buttonClassNames({});

    // Assert
    expect(result).toContain('box-border');
    expect(result).toContain('transition-all');
    expect(result).toContain('duration-300');
  });

  describe('variant', () => {
    it.each([
      {
        variant: 'primary',
        expectedClasses: [
          'bg-bg-primary',
          'hover:bg-bg-primary-hover',
          'focus:bg-bg-primary-hover',
          'focus-visible:bg-bg-primary-hover',
          'disabled:bg-bg-primary-disabled',
        ],
      },
      {
        variant: 'primary-inverse',
        expectedClasses: [
          'bg-bg-primary-inverse',
          'hover:bg-bg-primary-inverse-hover',
          'focus:bg-bg-primary-inverse-hover',
          'focus-visible:bg-bg-primary-inverse-hover',
          'disabled:bg-bg-primary-inverse-disabled',
        ],
      },
      {
        variant: 'primary-link',
        expectedClasses: ['bg-bg-primary', 'disabled:bg-bg-primary-disabled'],
      },
      {
        variant: 'secondary',
        expectedClasses: ['bg-linear-to-r', 'from-blue-700', 'to-purple-800'],
      },
      {
        variant: 'tertiary',
        expectedClasses: [
          'bg-bg-tertiary',
          'hover:bg-bg-tertiary-hover',
          'focus:bg-bg-tertiary-hover',
          'focus-visible:bg-bg-tertiary-hover',
          'disabled:bg-bg-tertiary-disabled',
        ],
      },
      {
        variant: 'quaternary',
        expectedClasses: [
          'bg-bg-quaternary',
          'hover:bg-bg-quaternary-hover',
          'focus:bg-bg-quaternary-hover',
          'focus-visible:bg-bg-quaternary-hover',
          'disabled:bg-bg-quaternary-disabled',
        ],
      },
      {
        variant: 'quaternary-inverse',
        expectedClasses: [
          'bg-bg-primary',
          'hover:hover:bg-bg-quaternary-hover',
          'focus:hover:bg-bg-quaternary-hover',
          'focus-visible:hover:bg-bg-quaternary-hover',
          'disabled:bg-bg-quaternary-disabled',
        ],
      },
      {
        variant: 'outline',
        expectedClasses: [
          'border-1',
          'border-border-tertiary',
          'hover:border-border-tertiary-hover',
          'focus:border-border-tertiary-hover',
          'focus-visible:border-border-tertiary-hover',
          'disabled:border-border-secondary-disabled',
          'hover:disabled:border-border-secondary-disabled',
        ],
      },
      {
        variant: 'sidebar-menu-item',
        expectedClasses: [
          'xxxxxxxx',
          'bg-bg-secondary',
          'hover:bg-bg-secondary',
          'focus:bg-bg-secondary',
          'focus-visible:bg-bg-secondary',
          'disabled:bg-bg-primary-disabled',
        ],
      },
      {
        variant: 'sidebar-menu-item-active',
        expectedClasses: [
          'bg-bg-quaternary',
          'hover:bg-bg-primary',
          'focus:bg-bg-primary',
          'focus-visible:bg-bg-primary',
          'disabled:bg-bg-quaternary-disabled',
        ],
      },
    ])(
      'applies correct classes for variant=$variant',
      ({ variant, expectedClasses }) => {
        // Arrange & Act
        const result = buttonClassNames({ variant: variant as any });

        // Assert
        expectedClasses.forEach((expectedClass) => {
          expect(result).toContain(expectedClass);
        });
      }
    );
  });

  describe('size', () => {
    it.each([
      { size: 'xs', expectedHeight: 'h-6', expectedText: 'text-base-xs' },
      { size: 'sm', expectedHeight: 'h-[34px]', expectedText: 'text-base-sm' },
      { size: 'md', expectedHeight: 'h-10', expectedText: 'text-base-md' },
      { size: 'lg', expectedHeight: 'h-12', expectedText: 'text-base-lg' },
      {
        size: 'xl',
        expectedHeight: 'h-12',
        expectedText: 'text-base-md',
        expectedMdHeight: 'md:h-14',
        expectedMdText: 'md:text-base-xl',
      },
    ])(
      'applies correct size classes for size=$size',
      ({
        size,
        expectedHeight,
        expectedText,
        expectedMdHeight,
        expectedMdText,
      }) => {
        // Arrange & Act
        const result = buttonClassNames({ size: size as any });

        // Assert
        expect(result).toContain(expectedHeight);
        expect(result).toContain(expectedText);
        if (expectedMdHeight) {
          expect(result).toContain(expectedMdHeight);
        }
        if (expectedMdText) {
          expect(result).toContain(expectedMdText);
        }
      }
    );
  });

  describe('avatar', () => {
    it('applies rounded-full when avatar is true', () => {
      // Arrange & Act
      const result = buttonClassNames({ avatar: true });

      // Assert
      expect(result).toContain('rounded-full');
    });

    it('does not apply rounded-full when avatar is false', () => {
      // Arrange & Act
      const result = buttonClassNames({ avatar: false });

      // Assert
      expect(result).not.toContain('rounded-full');
    });
  });

  describe('rounded', () => {
    it('applies rounded-full when rounded is true', () => {
      // Arrange & Act
      const result = buttonClassNames({ rounded: true });

      // Assert
      expect(result).toContain('rounded-full');
    });

    it.each([
      { rounded: 'xs', expectedClass: 'rounded-xs' },
      { rounded: 'sm', expectedClass: 'rounded-sm' },
      { rounded: 'md', expectedClass: 'rounded-md' },
      { rounded: 'lg', expectedClass: 'rounded-lg' },
      { rounded: 'xl', expectedClass: 'rounded-xl' },
    ])(
      'applies correct rounded class for rounded=$rounded',
      ({ rounded, expectedClass }) => {
        // Arrange & Act
        const result = buttonClassNames({ rounded: rounded as any });

        // Assert
        expect(result).toContain(expectedClass);
      }
    );
  });

  describe('disabled', () => {
    it('applies cursor-not-allowed when disabled is true', () => {
      // Arrange & Act
      const result = buttonClassNames({ disabled: true });

      // Assert
      expect(result).toContain('cursor-not-allowed');
    });

    it('applies cursor-pointer when disabled is false', () => {
      // Arrange & Act
      const result = buttonClassNames({ disabled: false });

      // Assert
      expect(result).toContain('cursor-pointer');
    });
  });

  describe('loading', () => {
    it('applies cursor-not-allowed classes when loading is true', () => {
      // Arrange & Act
      const result = buttonClassNames({ loading: true });

      // Assert
      expect(result).toContain('cursor-not-allowed');
      expect(result).toContain('hover:cursor-not-allowed');
    });

    it('does not apply cursor classes when loading is false', () => {
      // Arrange & Act
      const result = buttonClassNames({ loading: false });

      // Assert
      expect(result).not.toContain('hover:cursor-not-allowed');
    });
  });

  describe('iconOnly', () => {
    it('applies padding classes when iconOnly is true', () => {
      // Arrange & Act
      const result = buttonClassNames({ iconOnly: true });

      // Assert
      expect(result).toContain('px-0');
      expect(result).toContain('py-0');
      expect(result).toContain('p-0');
    });
  });

  describe('compound variants', () => {
    describe('font weight', () => {
      it.each([
        { size: 'xs' },
        { size: 'sm' },
        { size: 'md' },
        { size: 'lg' },
        { size: 'xl' },
      ])('applies font-semibold for size=$size', ({ size }) => {
        // Arrange & Act
        const result = buttonClassNames({ size: size as any });

        // Assert
        expect(result).toContain('font-semibold');
      });
    });

    describe('padding', () => {
      it.each([
        {
          size: 'xs',
          variant: 'primary',
          expectedPadding: 'px-3 py-1',
        },
        {
          size: 'sm',
          variant: 'primary',
          expectedPadding: 'px-4 py-2',
        },
        {
          size: 'md',
          variant: 'primary',
          expectedPadding: 'px-3 py-2.5',
        },
        {
          size: 'lg',
          variant: 'primary',
          expectedPadding: 'px-6 py-3.5',
        },
        {
          size: 'xl',
          variant: 'primary',
          expectedPadding: 'px-6 py-4',
          expectedMdPadding: 'md:px-8 md:py-4',
        },
      ])(
        'applies correct padding for size=$size and variant=$variant',
        ({ size, variant, expectedPadding, expectedMdPadding }) => {
          // Arrange & Act
          const result = buttonClassNames({
            size: size as any,
            variant: variant as any,
            avatar: false,
            iconOnly: false,
            rounded: false,
          });

          // Assert
          const [px, py] = expectedPadding.split(' ');
          expect(result).toContain(px);
          expect(result).toContain(py);
          if (expectedMdPadding) {
            const [mdPx, mdPy] = expectedMdPadding.split(' ');
            expect(result).toContain(mdPx);
            expect(result).toContain(mdPy);
          }
        }
      );

      it('does not apply padding for primary-link variant', () => {
        // Arrange & Act
        const result = buttonClassNames({
          variant: 'primary-link',
          size: 'md',
          avatar: false,
          iconOnly: false,
          rounded: false,
        });

        // Assert
        expect(result).not.toContain('px-3');
        expect(result).not.toContain('py-2.5');
      });
    });

    describe('padding with rounded', () => {
      it.each([
        {
          size: 'xs',
          variant: 'primary',
          expectedPadding: 'px-3 py-1.5',
        },
        {
          size: 'sm',
          variant: 'primary',
          expectedPadding: 'px-4 py-[9px]',
        },
        {
          size: 'md',
          variant: 'primary',
          expectedPadding: 'px-5 py-2.5',
        },
        {
          size: 'lg',
          variant: 'primary',
          expectedPadding: 'px-6 py-3.5',
        },
        {
          size: 'xl',
          variant: 'primary',
          expectedPadding: 'px-8 py-4',
        },
      ])(
        'applies correct padding for size=$size with rounded=true',
        ({ size, variant, expectedPadding }) => {
          // Arrange & Act
          const result = buttonClassNames({
            size: size as any,
            variant: variant as any,
            avatar: false,
            iconOnly: false,
            rounded: true,
          });

          // Assert
          const [px, py] = expectedPadding.split(' ');
          expect(result).toContain(px);
          expect(result).toContain(py);
        }
      );
    });

    describe('rounded default', () => {
      it.each([
        { variant: 'primary' },
        { variant: 'secondary' },
        { variant: 'tertiary' },
        { variant: 'quaternary' },
        { variant: 'quaternary-inverse' },
        { variant: 'outline' },
      ])(
        'applies rounded-sm for variant=$variant when rounded is false',
        ({ variant }) => {
          // Arrange & Act
          const result = buttonClassNames({
            variant: variant as any,
            rounded: false,
          });

          // Assert
          expect(result).toContain('rounded-sm');
        }
      );

      it.each([
        { variant: 'primary-link' },
        { variant: 'sidebar-menu-item' },
        { variant: 'sidebar-menu-item-active' },
      ])('does not apply rounded-sm for variant=$variant', ({ variant }) => {
        // Arrange & Act
        const result = buttonClassNames({
          variant: variant as any,
          rounded: false,
        });

        // Assert
        expect(result).not.toContain('rounded-sm');
      });
    });

    describe('rounded avatar', () => {
      it('applies px-0 py-0 when avatar is true and rounded is true', () => {
        // Arrange & Act
        const result = buttonClassNames({
          variant: 'primary',
          avatar: true,
          rounded: true,
        });

        // Assert
        expect(result).toContain('px-0');
        expect(result).toContain('py-0');
      });
    });

    describe('icon only', () => {
      it.each([
        { size: 'xs', expectedWidth: 'w-6' },
        { size: 'sm', expectedWidth: 'w-[34px]' },
        { size: 'md', expectedWidth: 'w-10' },
        { size: 'lg', expectedWidth: 'w-12' },
        { size: 'xl', expectedWidth: 'w-14' },
      ])(
        'applies correct width for iconOnly=true and size=$size',
        ({ size, expectedWidth }) => {
          // Arrange & Act
          const result = buttonClassNames({
            iconOnly: true,
            size: size as any,
          });

          // Assert
          expect(result).toContain(expectedWidth);
        }
      );
    });

    describe('avatar', () => {
      it.each([
        { size: 'xs', expectedWidth: 'w-6' },
        { size: 'sm', expectedWidth: 'w-[34px]' },
        { size: 'md', expectedWidth: 'w-10' },
        { size: 'lg', expectedWidth: 'w-12' },
        { size: 'xl', expectedWidth: 'w-14' },
      ])(
        'applies correct width for avatar=true and size=$size',
        ({ size, expectedWidth }) => {
          // Arrange & Act
          const result = buttonClassNames({
            avatar: true,
            size: size as any,
          });

          // Assert
          expect(result).toContain(expectedWidth);
        }
      );
    });

    describe('font color', () => {
      it.each([{ variant: 'primary-inverse' }, { variant: 'secondary' }])(
        'applies text-text-primary-inverse for variant=$variant',
        ({ variant }) => {
          // Arrange & Act
          const result = buttonClassNames({ variant: variant as any });

          // Assert
          expect(result).toContain('text-text-primary-inverse');
        }
      );

      it.each([
        { variant: 'primary' },
        { variant: 'primary-link' },
        { variant: 'tertiary' },
        { variant: 'outline' },
      ])('applies text-text-primary for variant=$variant', ({ variant }) => {
        // Arrange & Act
        const result = buttonClassNames({ variant: variant as any });

        // Assert
        expect(result).toContain('text-text-primary');
      });
    });

    describe('size for primary-link', () => {
      it('applies h-auto w-auto rounded-xs for primary-link variant', () => {
        // Arrange & Act
        const result = buttonClassNames({ variant: 'primary-link' });

        // Assert
        expect(result).toContain('h-auto');
        expect(result).toContain('w-auto');
        expect(result).toContain('rounded-xs');
      });
    });

    describe('loading', () => {
      it('applies loading classes when loading is true', () => {
        // Arrange & Act
        const result = buttonClassNames({
          variant: 'primary',
          loading: true,
        });

        // Assert
        expect(result).toContain('cursor-not-allowed');
        expect(result).toContain('bg-bg-tertiary-disabled/60');
        expect(result).toContain('hover:bg-bg-tertiary-disabled/60');
      });
    });

    describe('sidebar menu item', () => {
      it.each([
        { variant: 'sidebar-menu-item' },
        { variant: 'sidebar-menu-item-active' },
      ])(
        'applies sidebar menu item classes for variant=$variant',
        ({ variant }) => {
          // Arrange & Act
          const result = buttonClassNames({
            variant: variant as any,
            avatar: false,
            iconOnly: false,
          });

          // Assert
          expect(result).toContain('p-4');
          expect(result).toContain('w-full');
          expect(result).toContain('rounded-xl');
          expect(result).toContain('h-14');
          expect(result).toContain('text-base-lg');
        }
      );
    });
  });
});
