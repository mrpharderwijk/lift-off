import { render, screen } from '@testing-library/react';
import {
  Heading,
  headingTextPropsMap,
  LikeEnumValues,
} from '@/components/typography/heading';
import { Text } from '@/components/typography/text';

vi.mock('@/components/typography/text/text');
const TextMock = vi
  .mocked(Text)
  .mockImplementation(({ children }) => <div>{children}</div>);

describe('Heading', () => {
  beforeEach(vi.clearAllMocks);

  it('renders the component', () => {
    // Arrange & Act
    render(<Heading>The quick brown fox</Heading>);

    // Assert
    expect(screen.getByText('The quick brown fox')).toBeInTheDocument();

    expect(TextMock).toHaveBeenCalledTimes(1);
    expect(TextMock).toHaveBeenNthCalledWith(
      1,
      {
        children: 'The quick brown fox',
        tag: 'h1',
      },
      {}
    );
  });

  describe('tag prop', () => {
    it.each([['h1'], ['h2'], ['h3'], ['h4'], ['h5'], ['h6']] as const)(
      'renders custom tag: %s',
      (tag) => {
        // Arrange & Act
        render(<Heading tag={tag}>Custom Tag</Heading>);

        // Assert
        expect(TextMock).toHaveBeenCalledTimes(1);
        expect(TextMock).toHaveBeenNthCalledWith(
          1,
          {
            children: 'Custom Tag',
            tag,
          },
          {}
        );
      }
    );
  });

  describe('like prop', () => {
    it.each(LikeEnumValues)('applies like prop: %s', (like) => {
      // Arrange & Act
      render(
        <Heading like={like} data-testid="heading-like">
          Like Variant
        </Heading>
      );

      // Assert
      expect(TextMock).toHaveBeenCalledTimes(1);
      expect(TextMock).toHaveBeenNthCalledWith(
        1,
        {
          children: 'Like Variant',
          'data-testid': 'heading-like',
          'font-size': headingTextPropsMap[like]['font-size'],
          tag: 'h1',
        },
        {}
      );
    });
  });

  it('forwards custom props', () => {
    // Arrange & Act
    render(
      <Heading tag="h2" data-testid="my-heading" aria-label="custom">
        Test
      </Heading>
    );

    // Assert
    expect(TextMock).toHaveBeenCalledTimes(1);
    expect(TextMock).toHaveBeenNthCalledWith(
      1,
      {
        children: 'Test',
        'data-testid': 'my-heading',
        tag: 'h2',
        'aria-label': 'custom',
      },
      {}
    );
  });

  it('renders with both like and tag props', () => {
    // Arrange & Act
    render(
      <Heading tag="h3" like="h3-semibold" data-testid="combo-heading">
        Combo
      </Heading>
    );

    // Assert
    expect(TextMock).toHaveBeenCalledTimes(1);
    expect(TextMock).toHaveBeenNthCalledWith(
      1,
      {
        children: 'Combo',
        'data-testid': 'combo-heading',
        tag: 'h3',
        'font-size': 'titles-lg-semibold',
      },
      {}
    );
  });
});
