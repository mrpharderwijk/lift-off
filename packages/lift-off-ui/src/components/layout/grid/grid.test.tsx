import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Grid, GridProps } from '@/components/layout/grid';

describe('Grid', () => {
  it('renders the component', () => {
    // Arrange & Act
    render(<Grid data-testid="grid">Hello Grid!</Grid>);

    // Assert
    expect(screen.getByTestId('grid')).toBeInTheDocument();
    expect(screen.getByTestId('grid').tagName.toLowerCase()).toBe('div');
    expect(screen.getByText('Hello Grid!')).toBeInTheDocument();
  });

  describe('classNames from variants', () => {
    it('applies default classNames when no variants provided', () => {
      // Arrange & Act
      const { container } = render(<Grid>Grid Default</Grid>);

      // Assert
      expect(container.querySelector('div')).toHaveClass('grid');
    });

    it('applies responsive column variants', () => {
      // Arrange & Act
      const { container } = render(
        <Grid columns={3} columns-md={4} columns-lg={6}>
          Columns Variant
        </Grid>
      );

      // Assert
      expect(container.querySelector('div')?.className).toContain('grid');
      expect(container.querySelector('div')?.className).toContain(
        'grid-cols-[repeat(3,1fr)]'
      );
      expect(container.querySelector('div')?.className).toMatch(
        'md:grid-cols-[repeat(4,1fr)]'
      );
      expect(container.querySelector('div')?.className).toMatch(
        'lg:grid-cols-[repeat(6,1fr)]'
      );
    });

    it('applies gap variants', () => {
      const { container } = render(
        <Grid gap={2} gap-md={6}>
          Gap Test
        </Grid>
      );
      expect(container.querySelector('div')?.className).toMatch(/gap-2/);
      expect(container.querySelector('div')?.className).toMatch(/md:gap-6/);
    });

    it('combines multiple variants', () => {
      const { container } = render(
        <Grid columns={2} gap={4} place-items="center">
          Combined Test
        </Grid>
      );
      expect(container.querySelector('div')?.className).toContain(
        'grid-cols-[repeat(2,1fr)]'
      );
      expect(container.querySelector('div')?.className).toContain('gap-4');
      // Likely a class like "justify-items-center" depending on the implementation
      expect(container.querySelector('div')?.className).toContain(
        'place-items-center'
      );
    });
  });

  it('renders children correctly', () => {
    render(
      <Grid>
        <div>Child 1</div>
        <span>Child 2</span>
      </Grid>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});
