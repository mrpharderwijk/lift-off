import { ReactElement } from 'react';
import { PropsWithChildren } from 'react';
import { BorderBox } from './border-box';

export function PaddingBox({ children }: PropsWithChildren): ReactElement {
  return <BorderBox bg-color="warning" />;
}
