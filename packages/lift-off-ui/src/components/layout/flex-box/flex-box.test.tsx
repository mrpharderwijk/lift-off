import { render, screen } from '@testing-library/react';

import { FlexBox, FlexBoxProps } from './flex-box';
import { Box } from '@/components/layout/box';

vi.mock('@/components/layout/box');
const BoxMock = vi
  .mocked(Box)
  .mockImplementation(({ children }) => <>{children}</>);

describe('FlexBox', () => {
  beforeEach(vi.clearAllMocks);

  it('renders the component', () => {
    // Arrange & Act
    render(<FlexBox>Hello Flex!</FlexBox>);

    // Assert
    expect(screen.getByText('Hello Flex!')).toBeInTheDocument();

    expect(BoxMock).toHaveBeenCalledTimes(1);
    expect(BoxMock).toHaveBeenNthCalledWith(
      1,
      {
        children: 'Hello Flex!',
        display: 'flex',
      },
      {}
    );
  });

  describe('as prop', () => {
    it.each([
      'span',
      'article',
      'main',
      'div',
      'section',
      'aside',
      'header',
      'footer',
    ] as FlexBoxProps['tag'][])('renders the component as a %s tag', (tag) => {
      // Arrange & Act
      render(
        <FlexBox tag={tag} position="absolute">
          Test Tag!
        </FlexBox>
      );

      // Assert
      expect(BoxMock).toHaveBeenCalledTimes(1);
      expect(BoxMock).toHaveBeenNthCalledWith(
        1,
        {
          tag,
          children: 'Test Tag!',
          display: 'flex',
          position: 'absolute',
        },
        {}
      );
    });
  });

  describe('flexDirection prop', () => {
    it.each([
      {
        'flex-direction': 'row',
        'flex-direction-sm': 'row',
        'flex-direction-md': 'row',
        'flex-direction-lg': 'row',
        className: 'flex-row sm:flex-row md:flex-row lg:flex-row',
      },
      {
        'flex-direction': 'col',
        'flex-direction-sm': 'col',
        'flex-direction-md': 'col',
        'flex-direction-lg': 'col',
        className: 'flex-col sm:flex-col md:flex-col lg:flex-col',
      },
      {
        'flex-direction': 'colReverse',
        'flex-direction-sm': 'colReverse',
        'flex-direction-md': 'colReverse',
        'flex-direction-lg': 'colReverse',
        className:
          'flex-col-reverse sm:flex-col-reverse md:flex-col-reverse lg:flex-col-reverse',
      },
    ] as {
      'flex-direction': FlexBoxProps['flex-direction'];
      'flex-direction-sm': FlexBoxProps['flex-direction-sm'];
      'flex-direction-md': FlexBoxProps['flex-direction-md'];
      'flex-direction-lg': FlexBoxProps['flex-direction-lg'];
      className: string;
    }[])(
      'renders the component with the $flex-direction prop',
      ({
        'flex-direction': flexDirection,
        'flex-direction-sm': flexDirectionSm,
        'flex-direction-md': flexDirectionMd,
        'flex-direction-lg': flexDirectionLg,
        className,
      }) => {
        // Arrange & Act
        render(
          <FlexBox
            flex-direction={flexDirection}
            flex-direction-sm={flexDirectionSm}
            flex-direction-md={flexDirectionMd}
            flex-direction-lg={flexDirectionLg}
          >
            Test Tag!
          </FlexBox>
        );

        // Assert
        expect(BoxMock).toHaveBeenCalledTimes(1);
        expect(BoxMock).toHaveBeenNthCalledWith(
          1,
          {
            children: 'Test Tag!',
            display: 'flex',
            'flex-direction': flexDirection,
            'flex-direction-sm': flexDirectionSm,
            'flex-direction-md': flexDirectionMd,
            'flex-direction-lg': flexDirectionLg,
          },
          {}
        );
      }
    );
  });

  describe('FlexBox.Item', () => {
    it('renders the FlexBox.Item as a child', () => {
      // Arrange & Act
      const { getByText } = render(
        <FlexBox>
          <FlexBox.Item flex-grow={1}>Item Child</FlexBox.Item>
        </FlexBox>
      );

      // Assert
      expect(getByText('Item Child')).toBeInTheDocument();
    });
  });

  it('passes additional props (like data-testid, tabIndex)', () => {
    // Arrange & Act
    render(
      <FlexBox data-testid="my-flex" tabIndex={2}>
        Flex!
      </FlexBox>
    );

    // Assert
    expect(BoxMock).toHaveBeenCalledTimes(1);
    expect(BoxMock).toHaveBeenNthCalledWith(
      1,
      {
        'data-testid': 'my-flex',
        tabIndex: 2,
        children: 'Flex!',
        display: 'flex',
      },
      {}
    );
  });
});
