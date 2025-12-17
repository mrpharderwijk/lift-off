import { render, screen } from '@testing-library/react';

import { LocalizedPrice } from './localized-price';

describe('LocalizedPrice', () => {
  it('formats price in EUR for fr locale', () => {
    // Arrange & Act
    render(<LocalizedPrice price={100} locale="fr" currency="EUR" />);

    // Assert
    expect(screen.getByText('100,00 €')).toBeInTheDocument();
  });

  it('formats price in EUR for nl locale', () => {
    // Arrange & Act
    render(<LocalizedPrice price={100} locale="nl" currency="EUR" />);

    // Assert
    expect(screen.getByText('€ 100,00')).toBeInTheDocument();
  });

  it('formats price in USD with conversion rate for en locale', () => {
    // Arrange & Act
    render(<LocalizedPrice price={100} locale="en" currency="USD" />);

    // Assert
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });

  it('handles string price input', () => {
    // Arrange & Act
    render(<LocalizedPrice price="50.5" locale="fr" currency="EUR" />);

    // Assert
    expect(screen.getByText('50,50 €')).toBeInTheDocument();
  });

  it('respects custom fraction digits', () => {
    // Arrange & Act
    render(
      <LocalizedPrice
        price={100.123}
        locale="fr"
        currency="EUR"
        minFractionDigits={1}
        maxFractionDigits={3}
      />
    );

    // Assert
    expect(screen.getByText('100,123 €')).toBeInTheDocument();
  });

  it('uses default currency and rate when locale is not found', () => {
    // Arrange & Act
    render(
      <LocalizedPrice price={100} locale="invalid-locale" currency="EUR" />
    );

    // Assert
    expect(screen.getByText('€100.00')).toBeInTheDocument();
  });
});
