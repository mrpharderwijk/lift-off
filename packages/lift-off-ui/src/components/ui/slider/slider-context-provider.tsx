import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
} from 'react';

type Context = {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
};

export const SliderContext = createContext<Context>({
  currentSlide: 0,
  setCurrentSlide: () => {},
});

export function SliderContextProvider({
  children,
}: PropsWithChildren): ReactElement {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <SliderContext.Provider value={{ currentSlide, setCurrentSlide }}>
      {children}
    </SliderContext.Provider>
  );
}

export function useSliderContext(): Context {
  const context = useContext(SliderContext);

  if (!context) {
    throw new Error(
      'useSliderContext must be used within a SliderContextProvider'
    );
  }

  return context;
}
