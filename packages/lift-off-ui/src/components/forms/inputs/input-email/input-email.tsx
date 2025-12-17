import { ReactElement } from 'react';

import { Input, InputProps } from '@/components/forms/inputs/input';
import { REGEX_EMAIL } from '@/components/forms/inputs/input-email/regex';

type InputEmailProps = InputProps;

export function InputEmail({ ...props }: InputEmailProps): ReactElement {
  return (
    <Input
      {...props}
      pattern={props.pattern ?? REGEX_EMAIL.source}
      type="email"
      autoComplete="email"
    />
  );
}
