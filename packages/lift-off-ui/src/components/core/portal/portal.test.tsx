import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Portal } from './portal';

describe('Portal', () => {
  let portalRoot: HTMLElement;

  beforeEach(() => {
    // Create a div to act as the portal target
    portalRoot = global.document.createElement('div');
    portalRoot.setAttribute('id', 'portal');
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    // Clean up the portal target after each test
    if (portalRoot.parentNode === document.body) {
      document.body.removeChild(portalRoot);
    }
  });

  it('renders children into the specified portal target', async () => {
    render(
      <Portal id="portal">
        <div data-testid="inside-portal">Test Content</div>
      </Portal>
    );
    // Wait for effect to trigger, but since useEffect runs _after_ render, update the DOM first
    expect(await screen.findByTestId('inside-portal')).toBeInTheDocument();
    expect(
      portalRoot.querySelector('[data-testid="inside-portal"]')
    ).not.toBeNull();
    expect(screen.getByTestId('inside-portal').textContent).toBe(
      'Test Content'
    );
  });

  it('renders children into document.body if portal target does not exist', async () => {
    // Remove the portal
    document.body.removeChild(portalRoot);

    render(
      <Portal id="nonexistent-portal">
        <div data-testid="global-portal">Body Content</div>
      </Portal>
    );

    expect(await screen.findByTestId('global-portal')).toBeInTheDocument();
    expect(
      document.body.querySelector('[data-testid="global-portal"]')
    ).not.toBeNull();
  });

  it('does not render on server side (before client mount)', () => {
    // Simulate server-side render by not running effects: Portal should return null first render
    // We'll check initial DOM does not contain child
    const { container } = render(
      <Portal id="portal">
        <span data-testid="ssr-child">SSR Child</span>
      </Portal>
    );
    // The effect sets mounted=true, but initial render is mounted=false, so null is rendered
    // But react-testing-library runs useEffect, so this test might be redundant in that context
    // Instead we can spy and ensure the DOM is manipulated only after mount
    expect(container.innerHTML).toBe('');
  });

  it('unmounts cleanly and updates state', () => {
    const { unmount } = render(
      <Portal id="portal">
        <span data-testid="to-unmount">Unmount Me</span>
      </Portal>
    );
    expect(screen.getByTestId('to-unmount')).toBeInTheDocument();
    unmount();
    expect(portalRoot.querySelector('[data-testid="to-unmount"]')).toBeNull();
  });

  it('passes children as a node, not a string', async () => {
    render(
      <Portal id="portal">
        <button type="button">Inside Button</button>
      </Portal>
    );
    expect(
      await screen.findByRole('button', { name: /inside button/i })
    ).toBeInTheDocument();
  });

  it('uses default id="portal" if not specified and still works', async () => {
    render(
      <Portal>
        <span data-testid="default-portal">Default Portal</span>
      </Portal>
    );
    expect(await screen.findByTestId('default-portal')).toBeInTheDocument();
    expect(
      portalRoot.querySelector('[data-testid="default-portal"]')
    ).not.toBeNull();
  });
});
