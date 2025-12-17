import { render, screen } from '@testing-library/react';

import { Container } from '@/components/layout/container/container';

describe('Container', () => {
  it('renders the component', () => {
    // Arrange & Act
    render(<Container>Hello Container!</Container>);

    // Assert
    expect(screen.getByText('Hello Container!')).toBeInTheDocument();
    expect(screen.getByText('Hello Container!')).toContainHTML(
      '<div class="mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-20 max-w-[2520px] w-full relative">Hello Container!</div>'
    );
  });

  describe('tag prop', () => {
    it.each([
      'span',
      'article',
      'main',
      'div',
      'section',
      'aside',
      'header',
      'footer',
    ] as const)('renders the component as a %s tag', (tag) => {
      // Arrange & Act
      const { container } = render(
        <Container tag={tag} position="absolute">
          Container Tag Test
        </Container>
      );

      // Assert
      expect(container).toContainHTML(`Container Tag Test</${tag}>`);
    });
  });

  it('applies padding by default', () => {
    // Arrange & Act
    const { container } = render(<Container>Padding Test</Container>);

    // Assert
    // Should include "p-" or "px-" etc (ideally influenced by container.class-names), so just assert string contains "p" for now.
    const div = container.querySelector('div');
    expect(div?.className).toContain('px-');
  });

  it('does not apply padding when padding is false', () => {
    // Arrange & Act
    const { container } = render(
      <Container padding={false}>No Padding</Container>
    );

    // Assert
    const div = container.querySelector('div');
    expect(div?.className).not.toContain('px-');
  });

  it('applies fullWidth class when fullWidth is true', () => {
    // Arrange & Act
    const { container } = render(<Container fullWidth>Full Width</Container>);

    // Assert
    const div = container.querySelector('div');
    expect(div?.className).toContain('w-full');
  });

  it('applies fullHeight class when fullHeight is true', () => {
    // Arrange & Act
    const { container } = render(<Container fullHeight>Full Height</Container>);

    // Assert
    const div = container.querySelector('div');
    expect(div?.className).toContain('h-dvh');
  });

  it('applies narrow class when narrow is true', () => {
    // Arrange & Act
    const { container } = render(<Container narrow="md">Narrow</Container>);

    // Assert
    const div = container.querySelector('div');
    expect(div?.className).toContain('max-w-[623px]');
  });

  it('applies center class when center is true', () => {
    // Arrange & Act
    const { container } = render(<Container center>Centered</Container>);

    // Assert
    const div = container.querySelector('div');
    expect(div?.className).toMatch(/mx-\w+/); // Tailwind uses e.g. mx-auto
  });

  it('applies position prop', () => {
    // Arrange & Act
    const { container } = render(
      <Container position="absolute">Absolute</Container>
    );

    // Assert
    const div = container.querySelector('div');
    expect(div?.className).toContain('absolute');
  });

  it('applies data-testid prop', () => {
    // Arrange & Act
    render(<Container data-testid="testid-container">Test id</Container>);

    // Assert
    expect(screen.getByTestId('testid-container')).toBeInTheDocument();
  });

  it('combines multiple props correctly', () => {
    // Arrange & Act
    const { container } = render(
      <Container
        fullWidth
        fullHeight
        padding={false}
        center
        narrow="sm"
        position="fixed"
        data-testid="combo"
      >
        Combo Content
      </Container>
    );

    // Assert
    const element = screen.getByTestId('combo');
    expect(element.className).toContain('w-full');
    expect(element.className).toContain('h-dvh');
    expect(element.className).not.toContain('p-');
    expect(element.className).toContain('max-w-[568px]');
    expect(element.className).toMatch(/mx-\w+/);
    expect(element.className).toContain('fixed');
    expect(element).toHaveTextContent('Combo Content');
  });

  // it('applies custom props as html attributes', () => {
  //   // Arrange & Act
  //   const { container } = render(
  //     <Container data-testid="custom-id" aria-label="container-test">
  //       Content
  //     </Container>
  //   );

  //   // Assert
  //   const div = container.querySelector('div#custom-id');
  //   expect(div).toHaveAttribute('aria-label', 'container-test');
  // });
});
