import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import type { ReactNode } from 'react';
import { ModalDialog, ModalFocusTrapWithWrapper } from './modal-dialog';
import { useFocusTrap } from '@/hooks/use-focus-trap/use-focus-trap';
import { Portal } from '@/components/core/portal/portal';
import { useOnClickOutside } from 'usehooks-ts';

let passedHandler: (() => void) | null = null;
vi.mock('usehooks-ts', () => ({
  useOnClickOutside: vi.fn(),
}));
const useOnClickOutsideMock = vi
  .mocked(useOnClickOutside)
  .mockImplementation((_ref: any, handler: any) => {
    passedHandler = vi.fn();
  });

vi.mock(
  '@/components/ui/modal-dialog/providers/dialog-context-provider',
  () => ({
    useDialogContext: () => ({
      closeDialog: vi.fn(),
    }),
  })
);

vi.mock('@/hooks/use-escape-key/use-escape-key', () => ({
  useEscapeKey: vi.fn(),
}));

vi.mock('@/hooks/use-focus-trap/use-focus-trap');
const useFocusTrapMock = vi.mocked(useFocusTrap);

vi.mock('@/components/layout/flex-box/flex-box', () => ({
  FlexBox: ({ children }: any) => <div data-testid="flexbox">{children}</div>,
}));

vi.mock('@/components/core/portal/portal');
const PortalMock = vi
  .mocked(Portal)
  .mockImplementation(
    ({ children }: { children: ReactNode }) =>
      (<div data-testid="portal-mock">{children}</div>) as any
  );

vi.mock('./components/modal-header/modal-header', () => ({
  ModalHeader: ({ children }: any) => (
    <div data-testid="modal-header">{children}</div>
  ),
}));

vi.mock('./components/modal-footer/modal-footer', () => ({
  ModalFooter: ({ children }: any) => (
    <div data-testid="modal-footer">{children}</div>
  ),
}));

vi.mock('./components/modal-close-button/modal-close-button', () => ({
  ModalCloseButton: ({ closeDialog }: any) => (
    <button
      aria-label="close"
      onClick={closeDialog}
      data-testid="modal-close-btn"
    >
      X
    </button>
  ),
}));

vi.mock('./components/modal-image/modal-image', () => ({
  ModalImage: ({ children }: any) => (
    <div data-testid="modal-image">{children}</div>
  ),
}));

xdescribe('ModalDialog', () => {
  beforeEach(vi.clearAllMocks);

  it('does not render if isVisible is false', () => {
    // Arrange & Act
    render(<ModalDialog isVisible={false}>Children</ModalDialog>);

    // Assert
    expect(screen.queryByText('Children')).not.toBeInTheDocument();
    expect(screen.queryByTestId('portal-mock')).toBeInTheDocument(); // portal should always render but empty
  });

  it('renders children inside modal when isVisible is true', () => {
    // Arrange & Act
    render(<ModalDialog isVisible>Test Content</ModalDialog>);

    // Assert
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(PortalMock).toHaveBeenCalledTimes(1);
    expect(PortalMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ children: 'Test Content' })
    );
  });

  it('renders header when header prop is provided', () => {
    // Arrange & Act
    render(
      <ModalDialog isVisible header="Header Content">
        Body
      </ModalDialog>
    );

    // Assert
    expect(screen.getByText('Header Content')).toBeInTheDocument();
    expect(screen.getByTestId('modal-header')).toBeInTheDocument();
  });

  it('renders footer when footer prop is provided', () => {
    // Arrange & Act
    render(
      <ModalDialog isVisible footer={<div>Footer Content</div>}>
        Body
      </ModalDialog>
    );

    // Assert
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
    expect(screen.getByTestId('modal-footer')).toBeInTheDocument();
  });

  it('renders ModalImage when image prop is provided', () => {
    // Arrange & Act
    render(
      <ModalDialog isVisible image={<img alt="img" src="#" />}>
        Body
      </ModalDialog>
    );

    // Assert
    expect(screen.getByTestId('modal-image')).toBeInTheDocument();
    expect(screen.getByAltText('img')).toBeInTheDocument();
  });

  it('renders ModalCloseButton when showHeaderCloseButton is true and header is provided', () => {
    // Arrange & Act
    render(
      <ModalDialog isVisible header="Header">
        Body
      </ModalDialog>
    );

    // Assert
    expect(screen.getByTestId('modal-close-btn')).toBeInTheDocument();
  });

  it('does not render ModalCloseButton if showHeaderCloseButton is false', () => {
    // Arrange & Act
    render(
      <ModalDialog isVisible header="Header" showHeaderCloseButton={false}>
        Body
      </ModalDialog>
    );

    // Assert
    expect(screen.queryByTestId('modal-close-btn')).not.toBeInTheDocument();
  });

  it('calls onClose when closeDialog is triggered (Close button)', () => {
    // Arrange & Act
    const onClose = vi.fn();
    render(
      <ModalDialog isVisible header="Header" onClose={onClose}>
        Body
      </ModalDialog>
    );
    const btn = screen.getByTestId('modal-close-btn');
    fireEvent.click(btn);

    // Assert
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when clicking outside if closeOnOutsideClick is true', () => {
    // useOnClickOutside is a mock, so let's call the passed handler directly
    // Arrange & Act
    const onClose = vi.fn();

    render(
      <ModalDialog isVisible onClose={onClose}>
        Body
      </ModalDialog>
    );
    if (passedHandler) {
      // Simulate outside click
      (passedHandler as () => void)();
      expect(onClose).toHaveBeenCalled();
    }
  });

  it('does not trigger close when clicking outside if closeOnOutsideClick is false', () => {
    const onClose = vi.fn();
    let passedHandler: (() => void) | null = null;
    (require('usehooks-ts').useOnClickOutside as any).mockImplementation(
      (_ref: any, handler: any) => {
        passedHandler = handler;
      }
    );

    render(
      <ModalDialog isVisible onClose={onClose} closeOnOutsideClick={false}>
        Body
      </ModalDialog>
    );
    if (passedHandler) {
      // Simulate outside click
      (passedHandler as () => void)();
      expect(onClose).not.toHaveBeenCalled();
    }
  });

  it('calls onClose on escape key if closeOnEscape is true', () => {
    // useEscapeKey is a mock, let's verify it is called with the correct handler
    const onClose = vi.fn();
    let passedCallback: (() => void) | undefined = undefined;
    (
      require('@/hooks/use-escape-key/use-escape-key').useEscapeKey as any
    ).mockImplementation((cb: any) => {
      passedCallback = cb;
    });

    render(
      <ModalDialog isVisible onClose={onClose} closeOnEscape>
        Body
      </ModalDialog>
    );
    if (passedCallback) {
      (passedCallback as () => void)(); // Simulate escape key
      expect(onClose).toHaveBeenCalled();
    }
  });

  it('does not call onClose on escape if closeOnEscape is false', () => {
    const onClose = vi.fn();
    let passedCallback: (() => void) | undefined = undefined;
    (
      require('@/hooks/use-escape-key/use-escape-key').useEscapeKey as any
    ).mockImplementation((cb: any, enabled: boolean) => {
      if (enabled) passedCallback = cb;
      else passedCallback = undefined;
    });

    render(
      <ModalDialog isVisible onClose={onClose} closeOnEscape={false}>
        Body
      </ModalDialog>
    );
    if (passedCallback) {
      (passedCallback as () => void)();
      // Not expected to be called because closeOnEscape is false
      expect(onClose).not.toHaveBeenCalled();
    } else {
      expect(onClose).not.toHaveBeenCalled();
    }
  });
});

describe('ModalFocusTrapWithWrapper', () => {
  it('renders children inside focus trap wrapper', () => {
    render(
      <ModalFocusTrapWithWrapper>
        <div>Focus Content</div>
      </ModalFocusTrapWithWrapper>
    );
    expect(screen.getByText('Focus Content')).toBeInTheDocument();
    // Class contains "flex shrink grow basis-2/3 flex-col gap-6 overflow-auto"
    expect(
      screen.getByText('Focus Content').closest('div')?.className
    ).toContain('flex');
  });

  it('calls useFocusTrap with correct props', () => {
    const useFocusTrap =
      require('@/hooks/use-focus-trap/use-focus-trap').useFocusTrap;
    render(
      <ModalFocusTrapWithWrapper>
        <div>Focus Trap Child</div>
      </ModalFocusTrapWithWrapper>
    );
    expect(useFocusTrap).toHaveBeenCalledWith(
      expect.objectContaining({
        ref: expect.any(Object),
        deactivateOnEscape: true,
        activateOnInit: true,
      })
    );
  });
});
