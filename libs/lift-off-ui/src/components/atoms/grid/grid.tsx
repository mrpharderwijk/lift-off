import { PropsWithChildren, ReactElement } from 'react';

type GridProps = PropsWithChildren<{}>;

export function Grid({ children }: GridProps): ReactElement {
  return (
    <div className="grid [grid-template-areas:'icon_title_title''icon_subtitle_subtitle'">
      {children}
    </div>
  );
}
