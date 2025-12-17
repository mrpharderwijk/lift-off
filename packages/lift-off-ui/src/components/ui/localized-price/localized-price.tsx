import { ReactElement } from 'react';

type LocalizedPriceProps = {
  price: string | number;
  locale: Intl.LocalesArgument;
  currency: Intl.NumberFormatOptions['currency'];
  minFractionDigits?: number;
  maxFractionDigits?: number;
};

export function LocalizedPrice({
  price,
  locale,
  currency,
  minFractionDigits = 2,
  maxFractionDigits = 2,
}: LocalizedPriceProps): ReactElement {
  const localizedPrice = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
  }).format(Number(price));

  return <span className="lining-nums tabular-nums">{localizedPrice}</span>;
}
