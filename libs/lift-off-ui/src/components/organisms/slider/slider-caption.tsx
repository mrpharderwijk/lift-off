import { ReactElement } from 'react';

type SliderCaptionProps = {
  label: string;
};

export function SliderCaption({ label }: SliderCaptionProps): ReactElement {
  return <div className="slider-caption">{label}</div>;
}
