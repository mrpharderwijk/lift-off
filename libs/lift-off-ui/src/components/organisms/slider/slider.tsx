import { ReactElement } from 'react';
import { SliderNavButton } from './slider-nav-button';
import { SliderCaption } from './slider-caption';
import { SliderContextProvider } from './slider-context-provider';

export function Slider(): ReactElement {
  return (
    <SliderContextProvider>
      <div className="flex flex-col w-full px-4 bg-gray-100">
        <SliderCaption label="Caption" />
        <div className="slider-container flex items-center w-full justify-center">
          <div className="flex-initial">
            <SliderNavButton label="prev" onClick={() => {}} />
          </div>

          <div className="slider-slide-groups flex-auto flex flex-row flex-nowrap">
            <div className="flex flex-col flex-auto">
              <div className="slider-slide-group-slide">Slide</div>
              <div className="slider-slide-group-slide">Slide</div>
              <div className="slider-slide-group-slide">Slide</div>
              <div className="slider-slide-group-slide">Slide</div>
            </div>
            <div className="flex flex-col flex-auto">
              <div className="slider-slide-group-slide">Slide</div>
              <div className="slider-slide-group-slide">Slide</div>
              <div className="slider-slide-group-slide">Slide</div>
              <div className="slider-slide-group-slide">Slide</div>
            </div>
          </div>

          <div className="flex-initial">
            <SliderNavButton label="next" onClick={() => {}} />
          </div>
        </div>
      </div>
    </SliderContextProvider>
  );
}
