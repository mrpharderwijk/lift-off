import { vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './input';

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

vi.mock('@/components/shadcn/field');
const FieldMock = vi
  .mocked(Field)
  .mockImplementation(({ children }) => <div>{children}</div>);

vi.mock('@/components/shadcn/field-label');
const FieldLabelMock = vi
  .mocked(FieldLabel)
  .mockImplementation(({ children, htmlFor, className }) => (
    <label htmlFor={htmlFor} className={className} data-testid="field-label">
      {children}
    </label>
  ));

describe('Input', () => {
  beforeEach(vi.clearAllMocks);

  it('renders label and input with correct props', () => {
    // Arrange & Act
    render(
      <Input
        id="test-input"
        label="Test Label"
        placeholder="Test Placeholder"
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
      {
        htmlFor: 'test-input',
        className:
          'absolute pointer-events-none transition-all duration-200 font-medium text-base-lg top-1/2 -translate-y-1/2 left-4 text-text-secondary',
        children: 'Test Label',
      },
      {}
    );

    expect(screen.getByLabelText('Test Label')).toHaveAttribute(
      'id',
      'test-input'
    );
    expect(screen.getByLabelText('Test Label')).toHaveAttribute(
      'placeholder',
      ''
    );
    expect(screen.getByRole('textbox')).not.toHaveValue();
  });

  it('shows floating label when value is present', () => {
    // Arrange & Act
    render(
      <Input
        id="float-input"
        label="Float Label"
        placeholder="Floating"
        value="some value"
      />
    );
    const input = screen.getByLabelText('Float Label');

    // Assert
    expect(input).toHaveAttribute('placeholder', 'Floating');
    expect(screen.getByRole('textbox')).toHaveValue('some value');
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
      // Arrange & Act
      render(
        <Input
          id="error-input"
          label="label"
          placeholder="placeholder"
          value=""
          error={error}
          disableError={disableError}
        />
      );

      // Assert
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
    it('calls onChange when textarea value changes', async () => {
      // Arrange
      const handleChange = vi.fn();
      render(
        <Input
          id="change-input"
          label="Change Label"
          placeholder="Change"
          value=""
          onChange={handleChange}
        />
      );

      // Act
      await act(async () => {
        const textarea = screen.getByRole('textbox');
        await userEvent.type(textarea, 'abc');
      });

      // Assert
      expect(handleChange).toHaveBeenCalledTimes(3);
    });
  });

  it('renders customAction when provided', () => {
    // Arrange
    const CustomAction = <button>Action</button>;
    render(
      <Input
        id="custom-action"
        label="Custom Action"
        value=""
        customAction={CustomAction}
      />
    );

    // Assert
    expect(FlexBoxItemMock).toHaveBeenCalledTimes(2);
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('applies disabled styles and disables input', () => {
    // Arrange & Act
    render(<Input id="disabled-input" label="Disabled" value="" disabled />);
    const input = screen.getByLabelText('Disabled');

    // Assert
    expect(input).toBeDisabled();
  });
});
