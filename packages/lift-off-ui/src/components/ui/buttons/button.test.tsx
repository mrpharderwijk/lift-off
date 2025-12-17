import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './button';
import { ButtonContent } from './components/button-content/button-content';
import { buttonClassNames } from '@/components/ui/buttons/button.class-names';

vi.mock('./components/button-content/button-content');
const ButtonContentMock = vi
  .mocked(ButtonContent)
  .mockImplementation(({ children }) => <div>{children}</div>);

vi.mock('@/components/ui/buttons/button.class-names');
const buttonClassNamesMock = vi.mocked(buttonClassNames);

describe('Button', () => {
  beforeEach(vi.clearAllMocks);

  it('renders the button with all properties', () => {
    // Arrange & Act
    render(<Button>Click Me</Button>);

    // Assert
    expect(buttonClassNamesMock).toHaveBeenCalledTimes(1);
    expect(buttonClassNamesMock).toHaveBeenNthCalledWith(1, {
      avatar: false,
      variant: 'primary',
      fullWidth: false,
      rounded: false,
      disabled: false,
      loading: false,
      iconOnly: false,
      size: 'md',
    });

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.getAttribute('type')).toBe('button');

    expect(button.className).not.toContain('w-full');
    expect(button.getAttribute('disabled')).toBeFalsy();

    expect(screen.getByText('Click Me')).toBeInTheDocument();

    expect(ButtonContentMock).toHaveBeenCalledTimes(1);
    expect(ButtonContentMock).toHaveBeenNthCalledWith(
      1,
      {
        avatar: false,
        variant: 'primary',
        size: 'md',
        icon: undefined,
        loading: false,
        disabled: false,
        children: 'Click Me',
      },
      {}
    );
  });

  describe('OnClick handler', () => {
    it.each([
      {
        description: 'called',
        props: { disabled: false },
        expected: true,
      },
      {
        description: 'not called',
        props: { disabled: true },
        expected: false,
      },
    ])('$description', async ({ expected, props }) => {
      // Arrange
      const onClickMock = vi.fn();
      render(
        <Button {...props} onClick={onClickMock}>
          Click Me
        </Button>
      );

      // Act
      await userEvent.click(screen.getByRole('button'));

      // Assert
      if (expected) {
        expect(onClickMock).toHaveBeenCalledTimes(1);
      } else {
        expect(onClickMock).not.toHaveBeenCalled();
      }
    });
  });

  describe('Loading state', () => {
    it.each([
      {
        description: 'renders with loading state',
        props: { loading: true },
        expected: true,
      },
      {
        description: 'renders without loading state',
        props: { loading: false },
        expected: false,
      },
      {
        description: 'renders without loading state',
        props: {},
        expected: false,
      },
    ])('$description', ({ expected, props }) => {
      // Arrange & Act
      render(<Button {...props}>Click Me</Button>);

      // Assert
      expect(ButtonContentMock).toHaveBeenCalledTimes(1);
      expect(ButtonContentMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          loading: expected,
        }),
        {}
      );
    });
  });
});
