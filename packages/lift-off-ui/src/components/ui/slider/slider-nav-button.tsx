import { ReactElement } from 'react';

type SliderNavButtonProps = {
  label: string;
  onClick: () => void;
};

export function SliderNavButton({
  label,
  onClick,
}: SliderNavButtonProps): ReactElement {
  return <button>{label}</button>;
}
