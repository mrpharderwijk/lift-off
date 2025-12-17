import { render, screen } from '@testing-library/react';
import { Body } from './body';
import { Text } from '../text/text';
import { TextElementTag } from '@/types';
import { VariantProps } from 'class-variance-authority';
import { textClassNames } from '@/components/typography/text/text.class-names';

vi.mock('../text/text');
const TextMock = vi
  .mocked(Text)
  .mockImplementation(({ children }) => <div>{children}</div>);

describe('Body', () => {
  beforeEach(vi.clearAllMocks);

  it('renders the component', () => {
    // Arrange & Act
    render(<Body>The quick brown fox</Body>);

    // Assert
    expect(screen.getByText('The quick brown fox')).toBeInTheDocument();

    expect(TextMock).toHaveBeenCalledTimes(1);
    expect(TextMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: 'The quick brown fox',
        tag: 'p',
        'font-size': 'base-lg',
        'text-color': 'black',
      }),
      {}
    );
  });

  describe('tag prop', () => {
    it.each([['p'], ['span']])('renders with the given tag: %s', (tag) => {
      // Arrange & Act
      render(<Body tag={tag as TextElementTag}>Custom Tag</Body>);

      // Assert
      expect(TextMock).toHaveBeenCalledTimes(1);
      expect(TextMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          children: 'Custom Tag',
          tag,
        }),
        {}
      );
    });
  });

  describe('size props', () => {
    it.each([['base-md'], ['base-lg'], ['base-xl'], ['base-xlt']])(
      'applies the size prop: %s',
      (size) => {
        // Arrange & Act
        render(
          <Body size={size as VariantProps<typeof textClassNames>['font-size']}>
            Sized Text
          </Body>
        );

        // Assert
        expect(TextMock).toHaveBeenCalledTimes(1);
        expect(TextMock).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            children: 'Sized Text',
            'font-size': size,
          }),
          {}
        );
      }
    );

    it('applies the size-sm, size-md, size-lg, and size-xl props', () => {
      // Arrange & Act
      render(
        <Body
          size="base-sm"
          size-sm="base-xs"
          size-md="base-lg"
          size-lg="base-xl"
          size-xl="base-xlt"
        >
          Responsive Text
        </Body>
      );

      // Assert
      expect(TextMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          children: 'Responsive Text',
          'font-size': 'base-sm',
          'font-size-sm': 'base-xs',
          'font-size-md': 'base-lg',
          'font-size-lg': 'base-xl',
          'font-size-xl': 'base-xlt',
        }),
        {}
      );
    });
  });

  describe('color prop', () => {
    it('applies the color prop', () => {
      render(<Body color="gray">Colored Text</Body>);

      expect(TextMock).toHaveBeenCalledWith(
        expect.objectContaining({
          children: 'Colored Text',
          'text-color': 'gray',
        }),
        {}
      );
    });

    it('defaults color to black', () => {
      render(<Body>Default Color</Body>);

      expect(TextMock).toHaveBeenCalledWith(
        expect.objectContaining({
          children: 'Default Color',
          'text-color': 'black',
        }),
        {}
      );
    });
  });

  describe('weight props', () => {
    it('applies the weight prop', () => {
      render(<Body weight="bold">Bold Text</Body>);

      expect(TextMock).toHaveBeenCalledWith(
        expect.objectContaining({
          children: 'Bold Text',
          weight: 'bold',
        }),
        {}
      );
    });

    it('applies the weight-sm, weight-md, weight-lg, and weight-xl props', () => {
      render(
        <Body
          weight="semibold"
          weight-sm="light"
          weight-md="medium"
          weight-lg="bold"
          weight-xl="extrabold"
        >
          Weighted Text
        </Body>
      );

      expect(TextMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          children: 'Weighted Text',
          weight: 'semibold',
          'weight-sm': 'light',
          'weight-md': 'medium',
          'weight-lg': 'bold',
          'weight-xl': 'extrabold',
        }),
        {}
      );
    });
  });

  it('forwards custom props', () => {
    render(
      <Body tag="span" data-testid="my-body" aria-label="custom-content">
        Test
      </Body>
    );

    expect(TextMock).toHaveBeenCalledTimes(1);
    expect(TextMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: 'Test',
        tag: 'span',
        'data-testid': 'my-body',
        'aria-label': 'custom-content',
      }),
      {}
    );
  });

  it('renders correctly with all available props', () => {
    render(
      <Body
        tag="span"
        size="base-lg"
        size-sm="base-xs"
        size-md="base-lg"
        size-lg="base-xl"
        size-xl="base-xlt"
        color="blue"
        weight="normal"
        weight-sm="thin"
        weight-md="medium"
        weight-lg="bold"
        weight-xl="extrabold"
        data-testid="all-props"
      >
        All Props
      </Body>
    );

    expect(TextMock).toHaveBeenCalledTimes(1);
    expect(TextMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: 'All Props',
        tag: 'span',
        'font-size': 'base-lg',
        'font-size-sm': 'base-xs',
        'font-size-md': 'base-lg',
        'font-size-lg': 'base-xl',
        'font-size-xl': 'base-xlt',
        'text-color': 'blue',
        weight: 'normal',
        'weight-sm': 'thin',
        'weight-md': 'medium',
        'weight-lg': 'bold',
        'weight-xl': 'extrabold',
        'data-testid': 'all-props',
      }),
      {}
    );
  });
});
