import { vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InputEmail } from '@/components/forms/inputs/input-email/input-email';

import { FlexBox } from '@/components/layout/flex-box/flex-box';
import { FlexBoxItem } from '@/components/layout/flex-box/flex-box-item/flex-box-item';
import { Field, FieldLabel } from '@/components/ui/shadcn/field';

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

describe('InputEmail', () => {
  beforeEach(vi.clearAllMocks);

  it('renders label and input with correct props and email type', () => {
    // Arrange & Act
    render(
      <InputEmail
        id="test-email"
        label="Email"
        placeholder="Enter your email"
        value=""
      />
    );

    // Assert
    expect(FieldMock).toHaveBeenCalledTimes(1);

    expect(FlexBoxMock).toHaveBeenCalledTimes(2);
    expect(FlexBoxMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        'flex-direction': 'col',
        gap: 2,
        width: 'full',
        children: expect.anything(),
      }),
      {}
    );
    expect(FlexBoxMock).toHaveBeenNthCalledWith(
      2,
      {
        'flex-direction': 'row',
        'align-items': 'center',
        'justify-content': 'start',
        children: expect.anything(),
      },
      {}
    );

    expect(FlexBoxItemMock).toHaveBeenCalledTimes(1);
    expect(FlexBoxItemMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        flex: 'auto',
        position: 'relative',
        children: expect.anything(),
      }),
      {}
    );

    expect(FieldLabelMock).toHaveBeenCalledTimes(1);
    expect(FieldLabelMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        htmlFor: 'test-email',
        className: expect.any(String),
        children: 'Email',
      }),
      {}
    );

    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('id', 'test-email');
    expect(input).toHaveAttribute('placeholder', '');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('autocomplete', 'email');
    expect(screen.getByRole('textbox')).not.toHaveValue();
  });

  it('shows floating label when value is present', () => {
    render(
      <InputEmail
        id="float-email"
        label="Email Label"
        placeholder="Floating"
        value="test@example.com"
      />
    );
    const input = screen.getByLabelText('Email Label');
    expect(input).toHaveAttribute('placeholder', 'Floating');
    expect(input).toHaveValue('test@example.com');
    expect(input).toHaveAttribute('type', 'email');
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
        <InputEmail
          id="error-email"
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
        expect(FlexBoxMock).toHaveBeenNthCalledWith(
          3,
          expect.objectContaining({
            'flex-direction': 'row',
            'align-items': 'center',
            'justify-content': 'start',
            gap: 1,
            children: expect.anything(),
          }),
          {}
        );

        expect(screen.getByText('This is an error')).toBeInTheDocument();
        expect(screen.queryByRole('alert')).toBeInTheDocument();
      }
    });
  });

  describe('onChange', () => {
    it('calls onChange when input value changes', async () => {
      const handleChange = vi.fn();
      render(
        <InputEmail
          id="change-email"
          label="Change Email"
          placeholder="Change"
          value=""
          onChange={handleChange}
        />
      );

      await act(async () => {
        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'abc@');
      });

      expect(handleChange).toHaveBeenCalledTimes(4);
    });
  });

  it('renders customAction when provided', () => {
    const CustomAction = <button>Action</button>;
    render(
      <InputEmail
        id="custom-action-email"
        label="Custom Action"
        value=""
        customAction={CustomAction}
      />
    );

    expect(FlexBoxItemMock).toHaveBeenCalledTimes(2);
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('applies disabled styles and disables input', () => {
    render(
      <InputEmail
        id="disabled-email"
        label="Disabled Email"
        value=""
        disabled
      />
    );
    const input = screen.getByLabelText('Disabled Email');
    expect(input).toBeDisabled();
  });
});
