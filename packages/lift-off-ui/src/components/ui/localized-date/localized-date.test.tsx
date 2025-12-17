import { describe, it, expect } from 'vitest';
import { LocalizedDate } from './localized-date';

describe('LocalizedDate', () => {
  it.each([
    {
      name: 'formats date in en-US locale',
      date: new Date('2024-04-30T11:42:00Z'),
      locale: 'en-US',
      matcher: (result: string | null) => expect(result).toBe('April 30, 2024'),
    },
    {
      name: 'formats date in fr-FR locale',
      date: new Date('2024-04-30T11:42:00Z'),
      locale: 'fr-FR',
      matcher: (result: string | null) =>
        expect(result).toMatch(/30.*avril.*2024/),
    },
    {
      name: 'formats date in de-DE locale',
      date: new Date('2024-04-30T11:42:00Z'),
      locale: 'de-DE',
      matcher: (result: string | null) =>
        expect(result).toMatch(/30.*April.*2024/),
    },
    {
      name: 'formats date in nl-NL locale',
      date: new Date('2024-12-02T11:42:00Z'),
      locale: 'nl-NL',
      matcher: (result: string | null) =>
        expect(result).toMatch(/2.*december.*2024/),
    },
    {
      name: 'returns null when date is null',
      date: null,
      locale: 'en-US',
      matcher: (result: string | null) => expect(result).toBeNull(),
    },
    {
      name: 'formats date using locale "en" (shorthand)',
      date: new Date('2023-01-05T00:00:00Z'),
      locale: 'en',
      matcher: (result: string | null) =>
        expect(result).toMatch(/January.*5.*2023/),
    },
    {
      name: 'handles invalid locale by falling back to default',
      date: new Date('2023-08-15T00:00:00Z'),
      locale: 'invalid-locale',
      matcher: (result: string | null) =>
        expect(result).toMatch(/August.*15.*2023/),
    },
  ])('$name', ({ date, locale, matcher }) => {
    // @ts-expect-error: testing null date case above
    const result = LocalizedDate({ date, locale });
    matcher(result);
  });
});
