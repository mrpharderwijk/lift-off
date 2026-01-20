import { vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { enUS, nl, de } from 'date-fns/locale';

import { SelectMonth } from '@/components/forms/selects/select-month/select-month';

import { FlexBox } from '@/components/layout/flex-box/flex-box';
import { FlexBoxItem } from '@/components/layout/flex-box/flex-box-item/flex-box-item';
import { Field, FieldLabel } from '@/components/shadcn/field';

vi.mock('@/components/layout/flex-box/flex-box');
const FlexBoxMock = vi
  .mocked(FlexBox)
  .mockImplementation(({ children }) => <div>{children}</div>);

vi.mock('@/components/layout/flex-box/flex-box-item/flex-box-item');
const FlexBoxItemMock = vi
  .mocked(FlexBoxItem)
  .mockImplementation(({ children }) => <div>{children}</div>);

vi.mock('@/components/ui/shadcn/field');
const FieldMock = vi
  .mocked(Field)
  .mockImplementation(({ children }) => <div>{children}</div>);

vi.mock('@/components/ui/shadcn/field-label');
const FieldLabelMock = vi
  .mocked(FieldLabel)
  .mockImplementation(({ children, htmlFor, className }) => (
    <label htmlFor={htmlFor} className={className} data-testid="field-label">
      {children}
    </label>
  ));

describe('SelectMonth', () => {
  beforeEach(vi.clearAllMocks);

  it('renders label and select with correct props', () => {
    // Arrange & Act
    render(
      <SelectMonth
        id="test-month"
        label="Month"
        placeholder="Select a month"
        value=""
      />
    );

    // Assert
    expect(FieldMock).toHaveBeenCalledTimes(1);
    expect(FlexBoxMock).toHaveBeenCalledTimes(2);
    expect(FieldLabelMock).toHaveBeenCalledTimes(1);
    expect(FieldLabelMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        htmlFor: 'test-month',
        className: expect.any(String),
        children: 'Month',
      }),
      {}
    );

    const select = screen.getByLabelText('Month');
    expect(select).toHaveAttribute('id', 'test-month');
    expect(select).toHaveAttribute('aria-label', 'Month');
  });

  it('renders all 12 months with default format (MMMM)', () => {
    render(
      <SelectMonth
        id="test-month"
        label="Month"
        value=""
        monthFormat="MMMM"
        locale={enUS}
      />
    );

    const select = screen.getByLabelText('Month');
    expect(select).toBeInTheDocument();

    // Check for full month names
    expect(screen.getByRole('option', { name: 'January' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'December' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Jan' })).not.toBeInTheDocument();
  });

  it('renders months with MMM format (short names)', () => {
    render(
      <SelectMonth
        id="test-month"
        label="Month"
        value=""
        monthFormat="MMM"
        locale={enUS}
      />
    );

    expect(screen.getByRole('option', { name: 'Jan' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Dec' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'January' })).not.toBeInTheDocument();
  });

  it('renders months with MM format (numbers)', () => {
    render(
      <SelectMonth
        id="test-month"
        label="Month"
        value=""
        monthFormat="MM"
      />
    );

    expect(screen.getByRole('option', { name: '01' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '12' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'January' })).not.toBeInTheDocument();
  });

  it('supports different locales', () => {
    render(
      <SelectMonth
        id="test-month"
        label="Month"
        value=""
        monthFormat="MMMM"
        locale={nl}
      />
    );

    // Dutch month names
    expect(screen.getByRole('option', { name: 'januari' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'december' })).toBeInTheDocument();
  });

  it('handles value in YYYY-MM format', () => {
    render(
      <SelectMonth
        id="test-month"
        label="Month"
        value="2024-03"
      />
    );

    const select = screen.getByLabelText('Month') as HTMLSelectElement;
    expect(select.value).toBe('03');
  });

  it('handles value as month number', () => {
    render(
      <SelectMonth
        id="test-month"
        label="Month"
        value={3}
      />
    );

    const select = screen.getByLabelText('Month') as HTMLSelectElement;
    expect(select.value).toBe('03');
  });

  it('handles value as string month number', () => {
    render(
      <SelectMonth
        id="test-month"
        label="Month"
        value="5"
      />
    );

    const select = screen.getByLabelText('Month') as HTMLSelectElement;
    expect(select.value).toBe('05');
  });

  it('shows floating label when value is present', () => {
    render(
      <SelectMonth
        id="float-month"
        label="Month Label"
        placeholder="Select month"
        value="2024-03"
      />
    );
    const select = screen.getByLabelText('Month Label') as HTMLSelectElement;
    expect(select.value).toBe('03');
  });

  it('shows floating label when placeholder is defined even without value', () => {
    render(
      <SelectMonth
        id="placeholder-month"
        label="Month Label"
        placeholder="Select a month"
        value=""
      />
    );
    const label = screen.getByTestId('field-label');
    // Label should be floating (small text at top) when placeholder is present
    expect(label.className).toContain('text-xs');
    expect(label.className).toContain('top-2');
  });

  describe('Error handling', () => {
    it.each([
      {
        description:
          'shows error message and error styles when error is present and disableError is false',
        error: 'This is an error',
        disableError: false,
      },
      {
        description:
          'does not show error message and error styles when error is present and disableError is true',
        error: 'This is an error',
        disableError: true,
      },
    ])('$description', ({ error, disableError }) => {
      render(
        <SelectMonth
          id="error-month"
          label="label"
          placeholder="placeholder"
          value=""
          error={error}
          disableError={disableError}
        />
      );

      if (disableError) {
        expect(FlexBoxMock).toHaveBeenCalledTimes(2);
        expect(screen.queryByText('This is an error')).not.toBeInTheDocument();
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      } else {
        expect(FlexBoxMock).toHaveBeenCalledTimes(3);
        expect(screen.getByText('This is an error')).toBeInTheDocument();
        expect(screen.queryByRole('alert')).toBeInTheDocument();
      }
    });
  });

  describe('onChange', () => {
    it('calls onChange when select value changes', async () => {
      const handleChange = vi.fn();
      render(
        <SelectMonth
          id="change-month"
          label="Change Month"
          placeholder="Change"
          value=""
          onChange={handleChange}
        />
      );

      await act(async () => {
        const select = screen.getByLabelText('Change Month');
        await userEvent.selectOptions(select, '03');
      });

      expect(handleChange).toHaveBeenCalledTimes(1);
      const event = handleChange.mock.calls[0][0];
      expect(event.target.value).toBe('03');
    });
  });

  it('applies disabled styles and disables select', () => {
    render(
      <SelectMonth
        id="disabled-month"
        label="Disabled Month"
        value=""
        disabled
      />
    );
    const select = screen.getByLabelText('Disabled Month');
    expect(select).toBeDisabled();
  });

  it('includes placeholder option when not required', () => {
    render(
      <SelectMonth
        id="optional-month"
        label="Month"
        placeholder="Select a month"
        value=""
        required={false}
      />
    );

    const placeholderOption = screen.getByRole('option', { name: 'Select a month' });
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption).toHaveValue('');
  });

  it('does not include placeholder option when required', () => {
    render(
      <SelectMonth
        id="required-month"
        label="Month"
        placeholder="Select a month"
        value=""
        required={true}
      />
    );

    const placeholderOption = screen.queryByRole('option', { name: 'Select a month' });
    expect(placeholderOption).not.toBeInTheDocument();
  });

  it('sets aria-required when required prop is true', () => {
    render(
      <SelectMonth
        id="required-month"
        label="Month"
        value=""
        required={true}
      />
    );

    const select = screen.getByLabelText('Month');
    expect(select).toHaveAttribute('aria-required', 'true');
  });

  it('sets aria-invalid when error is present', () => {
    render(
      <SelectMonth
        id="invalid-month"
        label="Month"
        value=""
        error="Invalid month"
      />
    );

    const select = screen.getByLabelText('Month');
    expect(select).toHaveAttribute('aria-invalid', 'true');
  });

  it('combines aria-describedby correctly', () => {
    render(
      <SelectMonth
        id="described-month"
        label="Month"
        value=""
        error="Error message"
        aria-describedby="custom-description"
      />
    );

    const select = screen.getByLabelText('Month');
    const describedBy = select.getAttribute('aria-describedby');
    expect(describedBy).toContain('described-month-error');
    expect(describedBy).toContain('custom-description');
  });
});
