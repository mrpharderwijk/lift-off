import { textAreaClassNames } from '@/components/forms/text-area/text-area.class-names';
import { VariantProps } from 'class-variance-authority';

describe('textAreaClassNames', () => {
  beforeEach(vi.clearAllMocks);
  const baseClassNames =
    'w-full pt-[25px] px-4 pb-1 border border-border-quarternary rounded-lg transition-all duration-200 text-base-lg font-medium text-text-primary outline-offset-2 outline-black';

  it.each([
    {
      description: 'should return the correct min-height variant',
      prop: {
        'min-height': 14,
      },
      expected: 'min-h-[14px]',
    },
    {
      description: 'should return the correct min-height variant',
      prop: { 'min-height': 500 },
      expected: 'min-h-[500px]',
    },
    {
      description: 'should return only base classes if min-height is not valid',
      prop: { 'min-height': 1234 },
      expected: '',
    },
    {
      description: 'should return only base classes if no props are specified',
      prop: {},
      expected: baseClassNames,
    },
  ])(
    'should apply the correct prop variant when specified',
    ({ prop, expected }) => {
      // Arrange & Act
      const result = textAreaClassNames({ ...prop } as VariantProps<
        typeof textAreaClassNames
      >);

      // Assert
      expect(result).toContain(baseClassNames);
      expect(result).toContain(expected);
    }
  );
});
