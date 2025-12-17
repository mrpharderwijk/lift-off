import { render, screen } from '@testing-library/react';
import { Text } from '@/components/typography/text';
import { textClassNames } from '@/components/typography/text/text.class-names';
import { TextElementTag } from '@/types';
import { VariantProps } from 'class-variance-authority';

describe('Text', () => {
  beforeEach(vi.clearAllMocks);

  it('renders the component', () => {
    // Arrange & Act
    render(<Text>The quick brown fox</Text>);

    // Assert
    expect(screen.getByText('The quick brown fox')).toBeInTheDocument();
    expect(screen.getByText('The quick brown fox').tagName.toLowerCase()).toBe(
      'span'
    );
  });

  describe('tag prop', () => {
    it.each([['span'], ['p'], ['strong'], ['em']])(
      'renders as the correct tag: %s',
      (tag) => {
        // Arrange & Act
        render(
          <Text tag={tag as TextElementTag} data-testid="custom-tag">
            Custom Tag
          </Text>
        );

        // Assert
        const el = screen.getByTestId('custom-tag');
        expect(el.tagName.toLowerCase()).toBe(tag);
        expect(el).toHaveTextContent('Custom Tag');
      }
    );
  });

  describe('font size props', () => {
    it.each([['base-xs'], ['base-lg'], ['title-md']])(
      'applies font-size class for %s',
      (size) => {
        // Arrange & Act
        render(
          <Text
            font-size={size as VariantProps<typeof textClassNames>['font-size']}
            data-testid="text-size"
          >
            Sized Text
          </Text>
        );

        // Assert
        const el = screen.getByTestId('text-size');
        const expectedClass = textClassNames({
          'font-size': size as VariantProps<typeof textClassNames>['font-size'],
        });
        expect(el.className).toContain(expectedClass);
      }
    );

    it('applies responsive font-size props', () => {
      // Arrange & Act
      render(
        <Text
          font-size="base-sm"
          font-size-sm="base-xs"
          font-size-md="base-lg"
          font-size-lg="base-xl"
          font-size-xl="base-xlt"
          data-testid="responsive-sizes"
        >
          Responsive Text
        </Text>
      );

      // Assert
      const el = screen.getByTestId('responsive-sizes');
      const expectedClass = textClassNames({
        'font-size': 'base-sm',
        'font-size-sm': 'base-xs',
        'font-size-md': 'base-lg',
        'font-size-lg': 'base-xl',
        'font-size-xl': 'base-xlt',
      });
      expect(el.className).toContain(expectedClass);
    });
  });

  describe('text color prop', () => {
    it('applies the text color class', () => {
      // Arrange & Act
      render(
        <Text text-color="gray" data-testid="colored-text">
          Colored Text
        </Text>
      );

      // Assert
      const el = screen.getByTestId('colored-text');
      const expectedClass = textClassNames({ 'text-color': 'gray' });
      expect(el.className).toContain(expectedClass);
    });

    it('defaults to no text-color class if not specified', () => {
      // Arrange & Act
      render(<Text data-testid="default-color">Default Color</Text>);

      // Assert
      const el = screen.getByTestId('default-color');
      const expectedClass = textClassNames({});
      expect(el.className).toContain(expectedClass);
    });
  });

  describe('font weight props', () => {
    it('applies the weight prop', () => {
      // Arrange & Act
      render(
        <Text font-weight="bold" data-testid="bold-text">
          Bold Text
        </Text>
      );

      // Assert
      const el = screen.getByTestId('bold-text');
      const expectedClass = textClassNames({ 'font-weight': 'bold' });
      expect(el.className).toContain(expectedClass);
    });

    it('applies the responsive font-weight props', () => {
      render(
        <Text
          font-weight="semibold"
          font-weight-sm="light"
          font-weight-md="medium"
          font-weight-lg="bold"
          font-weight-xl="extrabold"
          data-testid="responsive-weight"
        >
          Weighted Text
        </Text>
      );
      const el = screen.getByTestId('responsive-weight');
      const expectedClass = textClassNames({
        'font-weight': 'semibold',
        'font-weight-sm': 'light',
        'font-weight-md': 'medium',
        'font-weight-lg': 'bold',
        'font-weight-xl': 'extrabold',
      });
      expect(el.className).toContain(expectedClass);
    });
  });

  it('forwards custom props', () => {
    // Arrange & Act
    render(
      <Text tag="strong" data-testid="custom-prop" aria-label="labelled">
        Test
      </Text>
    );

    // Assert
    const el = screen.getByTestId('custom-prop');
    expect(el.getAttribute('aria-label')).toBe('labelled');
    expect(el.tagName.toLowerCase()).toBe('strong');
    expect(el).toHaveTextContent('Test');
  });

  it('renders with all available props', () => {
    render(
      <Text
        tag="span"
        font-size="base-lg"
        font-size-sm="base-xs"
        font-size-md="base-lg"
        font-size-lg="base-xl"
        font-size-xl="base-xlt"
        text-color="blue"
        font-weight="normal"
        font-weight-sm="thin"
        font-weight-md="medium"
        font-weight-lg="bold"
        font-weight-xl="extrabold"
        data-testid="all-props"
      >
        All Props
      </Text>
    );
    const el = screen.getByTestId('all-props');
    expect(el.tagName.toLowerCase()).toBe('span');
    const expectedClass = textClassNames({
      'font-size': 'base-lg',
      'font-size-sm': 'base-xs',
      'font-size-md': 'base-lg',
      'font-size-lg': 'base-xl',
      'font-size-xl': 'base-xlt',
      'text-color': 'blue',
      'font-weight': 'normal',
      'font-weight-sm': 'thin',
      'font-weight-md': 'medium',
      'font-weight-lg': 'bold',
      'font-weight-xl': 'extrabold',
    });
    expect(el.className).toContain(expectedClass);
    expect(el).toHaveTextContent('All Props');
  });
});
