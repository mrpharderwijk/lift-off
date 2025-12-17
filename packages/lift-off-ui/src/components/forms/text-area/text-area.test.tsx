import { vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextArea } from './text-area';

import { FlexBox } from '@/components/layout/flex-box/flex-box';
import { FlexBoxItem } from '../../layout/flex-box/flex-box-item/flex-box-item';
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

const FieldLabelMock = vi
  .mocked(FieldLabel)
  .mockImplementation(({ children, htmlFor, className }) => (
    <label htmlFor={htmlFor} className={className} data-testid="field-label">
      {children}
    </label>
  ));

describe('TextArea', () => {
  beforeEach(vi.clearAllMocks);

  it('renders label and textarea with correct props', () => {
    // Arrange & Act
    render(
      <TextArea
        id="test-textarea"
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
      expect.objectContaining({
        'flex-direction': 'row',
        'align-items': 'center',
        'justify-content': 'start',
        children: expect.anything(),
      }),
      {}
    );

    expect(FlexBoxItemMock).toHaveBeenCalledTimes(1);
    expect(FlexBoxItemMock).toHaveBeenNthCalledWith(
      1,
      {
        flex: 'auto',
        position: 'relative',
        children: expect.anything(),
      },
      {}
    );

    expect(FieldLabelMock).toHaveBeenCalledTimes(1);
    expect(FieldLabelMock).toHaveBeenNthCalledWith(
      1,
      {
        htmlFor: 'test-textarea',
        className:
          'absolute pointer-events-none transition-all duration-200 font-medium text-base-lg top-6 -translate-y-1/2 left-4 text-text-secondary',
        children: 'Test Label',
      },
      {}
    );

    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-textarea');
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', '');
    expect(screen.getByRole('textbox')).not.toHaveValue();
  });

  it('shows floating label when value is present', () => {
    // Arrange & Act
    render(
      <TextArea
        id="float-textarea"
        label="Float Label"
        placeholder="Floating"
        value="some value"
      />
    );
    const textarea = screen.getByLabelText('Float Label');

    // Assert
    expect(textarea).toHaveAttribute('placeholder', 'Floating');
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
        <TextArea
          id="error-textarea"
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
        <TextArea
          id="change-textarea"
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

  describe('charCount', () => {
    it.each([
      {
        description:
          'renders char count when charCount=true and maxLength is set',
        charCount: true,
        maxLength: 20,
      },
      {
        description:
          'renders char count when charCount=true and maxLength is not set',
        charCount: true,
        maxLength: undefined,
      },
      {
        description: 'does not render char count when charCount=false',
        charCount: false,
        maxLength: undefined,
      },
    ])('$description', ({ charCount, maxLength }) => {
      // Arrange & Act
      render(
        <TextArea
          id="charcount-textarea"
          label="Count Label"
          value="hello"
          charCount
          maxLength={20}
        />
      );

      // Assert
      expect(screen.getByText('5 / 20')).toBeInTheDocument();
    });
  });

  it('applies disabled styles and disables textarea', () => {
    // Arrange & Act
    render(
      <TextArea id="disabled-textarea" label="Disabled" value="" disabled />
    );

    // Assert
    const textarea = screen.getByLabelText('Disabled');
    expect(textarea).toBeDisabled();
  });
});
