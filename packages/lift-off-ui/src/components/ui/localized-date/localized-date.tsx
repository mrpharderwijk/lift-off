type LocalizedDateProps = {
  date: Date;
  locale: Intl.LocalesArgument;
};

export function LocalizedDate({
  date,
  locale,
}: LocalizedDateProps): string | null {
  if (!date) {
    return null;
  }

  return date.toLocaleDateString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
