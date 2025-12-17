import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';
import { IconType } from 'react-icons';
import { LucideIcon } from 'lucide-react';

import { ButtonWrapper } from './button-wrapper';
import { ButtonContent } from '../components/button-content/button-content';
import { buttonClassNames } from '../button.class-names';

vi.mock('../components/button-content/button-content', () => ({
  ButtonContent: vi.fn(({ avatar, children }) => (
    <div>
      {avatar} {children}
    </div>
  )),
  TID_BUTTON_LOADER: 'button__loader',
}));

const ButtonContentMock = vi.mocked(ButtonContent);

vi.mock('../button.class-names', () => ({
  buttonClassNames: vi.fn(() => ''),
}));

const buttonClassNamesMock = vi.mocked(buttonClassNames);

vi.mock('@/utils/class-names', () => ({
  cn: vi.fn((...args: any[]) => args.filter(Boolean).join(' ')),
}));

describe('ButtonWrapper', () => {
  beforeEach(vi.clearAllMocks);

  const defaultProps = {
    renderRoot: ({ buttonContent }: { buttonContent: React.ReactElement }) => (
      <div>{buttonContent}</div>
    ),
    children: 'Click Me',
  };

  it('renders the button wrapper with all default properties', () => {
    // Arrange & Act
    render(<ButtonWrapper {...defaultProps} />);

    // Assert
    expect(buttonClassNamesMock).toHaveBeenCalledTimes(1);
    expect(buttonClassNamesMock).toHaveBeenNthCalledWith(1, {
      avatar: false,
      variant: 'primary',
      fullWidth: false,
      rounded: false,
      disabled: false,
      loading: false,
      size: 'md',
      iconOnly: false,
    });

    expect(ButtonContentMock).toHaveBeenCalledTimes(1);
    expect(ButtonContentMock).toHaveBeenNthCalledWith(
      1,
      {
        avatar: false,
        icon: undefined,
        loading: false,
        disabled: false,
        variant: 'primary',
        size: 'md',
        children: 'Click Me',
      },
      {}
    );
  });

  describe('renderRoot', () => {
    it('calls renderRoot with buttonContent', () => {
      // Arrange
      const renderRootMock = vi.fn(({ buttonContent }) => (
        <div data-testid="custom-root">{buttonContent}</div>
      ));

      // Act
      render(
        <ButtonWrapper {...defaultProps} renderRoot={renderRootMock}>
          Click Me
        </ButtonWrapper>
      );

      // Assert
      expect(renderRootMock).toHaveBeenCalledTimes(1);
      expect(renderRootMock).toHaveBeenNthCalledWith(1, {
        buttonContent: expect.any(Object),
      });
      expect(screen.getByTestId('custom-root')).toBeInTheDocument();
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });
  });

  describe('props forwarding', () => {
    it('forwards all props to ButtonContent', () => {
      // Arrange
      const IconMock = vi.fn(() => (
        <svg data-testid="icon" />
      )) as unknown as IconType;

      // Act
      render(
        <ButtonWrapper
          {...defaultProps}
          avatar={true}
          variant="primary"
          size="lg"
          icon={IconMock}
          loading={true}
          disabled={true}
        />
      );

      // Assert
      expect(ButtonContentMock).toHaveBeenCalledTimes(1);
      expect(ButtonContentMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          avatar: true,
          variant: 'primary',
          size: 'lg',
          icon: IconMock,
          loading: true,
          disabled: true,
          children: 'Click Me',
        }),
        {}
      );
    });

    it('forwards rest props to ButtonContent', () => {
      // Arrange & Act
      render(<ButtonWrapper {...defaultProps} underline={true} />);

      // Assert
      expect(ButtonContentMock).toHaveBeenCalledTimes(1);
      expect(ButtonContentMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          underline: true,
        }),
        {}
      );
    });
  });

  describe('iconOnly calculation', () => {
    it('calculates iconOnly as true when there is an icon but no children', () => {
      // Arrange
      const IconMock = vi.fn(() => <svg />) as unknown as IconType;

      // Act
      render(
        <ButtonWrapper {...defaultProps} icon={IconMock} children={undefined} />
      );

      // Assert
      expect(buttonClassNamesMock).toHaveBeenCalledTimes(1);
      expect(buttonClassNamesMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          iconOnly: true,
        })
      );
    });

    it('calculates iconOnly as false when there are children', () => {
      // Arrange
      const IconMock = vi.fn(() => <svg />) as unknown as IconType;

      // Act
      render(<ButtonWrapper {...defaultProps} icon={IconMock} />);

      // Assert
      expect(buttonClassNamesMock).toHaveBeenCalledTimes(1);
      expect(buttonClassNamesMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          iconOnly: false,
        })
      );
    });

    it('calculates iconOnly as false when there is no icon', () => {
      // Act
      render(<ButtonWrapper {...defaultProps} />);

      // Assert
      expect(buttonClassNamesMock).toHaveBeenCalledTimes(1);
      expect(buttonClassNamesMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          iconOnly: false,
        })
      );
    });
  });

  describe('rounded calculation', () => {
    it('calculates rounded as true when rounded prop is true', () => {
      // Act
      render(<ButtonWrapper {...defaultProps} rounded={true} />);

      // Assert
      expect(buttonClassNamesMock).toHaveBeenCalledTimes(1);
      expect(buttonClassNamesMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          rounded: true,
        })
      );
    });

    it('calculates rounded as true when iconOnly is true', () => {
      // Arrange
      const IconMock = vi.fn(() => <svg />) as unknown as IconType;

      // Act
      render(
        <ButtonWrapper {...defaultProps} icon={IconMock} children={undefined} />
      );

      // Assert
      expect(buttonClassNamesMock).toHaveBeenCalledTimes(1);
      expect(buttonClassNamesMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          rounded: true,
        })
      );
    });

    it('calculates rounded as true when avatar is true', () => {
      // Act
      render(<ButtonWrapper {...defaultProps} avatar={true} />);

      // Assert
      expect(buttonClassNamesMock).toHaveBeenCalledTimes(1);
      expect(buttonClassNamesMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          rounded: true,
        })
      );
    });

    it('calculates rounded as false when rounded, iconOnly, and avatar are all false', () => {
      // Act
      render(<ButtonWrapper {...defaultProps} rounded={false} />);

      // Assert
      expect(buttonClassNamesMock).toHaveBeenCalledTimes(1);
      expect(buttonClassNamesMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          rounded: false,
        })
      );
    });
  });

  describe('buttonClassNames call', () => {
    it.each([
      { variant: 'primary' },
      { variant: 'primary-inverse' },
      { variant: 'primary-link' },
      { variant: 'secondary' },
      { variant: 'tertiary' },
      { variant: 'quaternary' },
      { variant: 'quaternary-inverse' },
      { variant: 'outline' },
    ])('calls buttonClassNames with variant=$variant', ({ variant }) => {
      // Act
      render(<ButtonWrapper {...defaultProps} variant={variant as any} />);

      // Assert
      expect(buttonClassNamesMock).toHaveBeenCalledTimes(1);
      expect(buttonClassNamesMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          variant,
        })
      );
    });

    it.each([
      { size: 'xs' },
      { size: 'sm' },
      { size: 'md' },
      { size: 'lg' },
      { size: 'xl' },
    ])('calls buttonClassNames with size=$size', ({ size }) => {
      // Act
      render(<ButtonWrapper {...defaultProps} size={size as any} />);

      // Assert
      expect(buttonClassNamesMock).toHaveBeenCalledTimes(1);
      expect(buttonClassNamesMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          size,
        })
      );
    });

    it.each([{ fullWidth: true }, { fullWidth: false }])(
      'calls buttonClassNames with fullWidth=$fullWidth',
      ({ fullWidth }) => {
        // Act
        render(<ButtonWrapper {...defaultProps} fullWidth={fullWidth} />);

        // Assert
        expect(buttonClassNamesMock).toHaveBeenCalledTimes(1);
        expect(buttonClassNamesMock).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            fullWidth,
          })
        );
      }
    );

    it.each([{ disabled: true }, { disabled: false }])(
      'calls buttonClassNames with disabled=$disabled',
      ({ disabled }) => {
        // Act
        render(<ButtonWrapper {...defaultProps} disabled={disabled} />);

        // Assert
        expect(buttonClassNamesMock).toHaveBeenCalledTimes(1);
        expect(buttonClassNamesMock).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            disabled,
          })
        );
      }
    );

    it.each([{ loading: true }, { loading: false }])(
      'calls buttonClassNames with loading=$loading',
      ({ loading }) => {
        // Act
        render(<ButtonWrapper {...defaultProps} loading={loading} />);

        // Assert
        expect(buttonClassNamesMock).toHaveBeenCalledTimes(1);
        expect(buttonClassNamesMock).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            loading,
          })
        );
      }
    );

    it.each([{ avatar: true }, { avatar: false }])(
      'calls buttonClassNames with avatar=$avatar',
      ({ avatar }) => {
        // Act
        render(<ButtonWrapper {...defaultProps} avatar={avatar} />);

        // Assert
        expect(buttonClassNamesMock).toHaveBeenCalledTimes(1);
        expect(buttonClassNamesMock).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            avatar,
          })
        );
      }
    );
  });

  describe('onClick handler', () => {
    it('calls onClick when the wrapper div is clicked', async () => {
      // Arrange
      const onClickMock = vi.fn();
      const user = userEvent.setup();

      // Act
      render(<ButtonWrapper {...defaultProps} onClick={onClickMock} />);

      const wrapper = screen.getByText('Click Me').parentElement;
      await user.click(wrapper!);

      // Assert
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when onClick is not provided', async () => {
      // Arrange
      const user = userEvent.setup();

      // Act
      render(<ButtonWrapper {...defaultProps} />);

      const wrapper = screen.getByText('Click Me').parentElement;
      await user.click(wrapper!);

      // Assert
      // No error should occur
      expect(wrapper).toBeInTheDocument();
    });
  });

  // describe('ref forwarding', () => {
  //   it('forwards ref to the wrapper div', () => {
  //     // Arrange
  //     const ref = createRef<HTMLDivElement>();

  //     // Act
  //     render(<ButtonWrapper {...defaultProps} ref={ref} />);

  //     // Assert
  //     expect(ref.current).toBeInstanceOf(HTMLDivElement);
  //     expect(ref.current).toBe(screen.getByText('Click Me').parentElement);
  //   });
  // });

  describe('data-testid', () => {
    it('applies data-testid to the wrapper div when provided', () => {
      // Arrange & Act
      render(<ButtonWrapper {...defaultProps} data-testid="custom-button" />);

      // Assert
      expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    });

    it('does not apply data-testid when not provided', () => {
      // Arrange & Act
      render(<ButtonWrapper {...defaultProps} />);

      // Assert
      const wrapper = screen.getByText('Click Me').parentElement;
      expect(wrapper).not.toHaveAttribute('data-testid');
    });
  });

  describe('error handling', () => {
    it('throws error when variant is primary-link and iconOnly is true', () => {
      // Arrange
      const IconMock = vi.fn(() => <svg />) as unknown as IconType;
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      // Act & Assert
      expect(() => {
        render(
          <ButtonWrapper
            {...defaultProps}
            variant="primary-link"
            icon={IconMock}
            children={undefined}
          />
        );
      }).toThrow('primary-link button is not supported with icon only!');

      consoleErrorSpy.mockRestore();
    });

    it('throws error when avatar is true and variant is not primary', () => {
      // Arrange
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      // Act & Assert
      expect(() => {
        render(
          <ButtonWrapper {...defaultProps} avatar={true} variant="secondary" />
        );
      }).toThrow('avatar is not supported with variants other than primary!');

      consoleErrorSpy.mockRestore();
    });

    it('does not throw error when avatar is true and variant is primary', () => {
      // Arrange & Act
      render(
        <ButtonWrapper {...defaultProps} avatar={true} variant="primary" />
      );

      // Assert
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });
  });

  describe('icon types', () => {
    it('accepts IconType from react-icons', () => {
      // Arrange
      const IconMock = vi.fn(() => (
        <svg data-testid="react-icon" />
      )) as unknown as IconType;

      // Act
      render(<ButtonWrapper {...defaultProps} icon={IconMock} />);

      // Assert
      expect(ButtonContentMock).toHaveBeenCalledTimes(1);
      expect(ButtonContentMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          icon: IconMock,
        }),
        {}
      );
    });

    it('accepts LucideIcon from lucide-react', () => {
      // Arrange
      const LucideIconMock = vi.fn(() => (
        <svg data-testid="lucide-icon" />
      )) as unknown as LucideIcon;

      // Act
      render(<ButtonWrapper {...defaultProps} icon={LucideIconMock} />);

      // Assert
      expect(ButtonContentMock).toHaveBeenCalledTimes(1);
      expect(ButtonContentMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          icon: LucideIconMock,
        }),
        {}
      );
    });
  });
});
