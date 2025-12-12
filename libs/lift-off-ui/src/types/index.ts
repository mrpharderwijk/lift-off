export type ElementTag = {
  as?:
    | 'div'
    | 'span'
    | 'section'
    | 'aside'
    | 'header'
    | 'footer'
    | 'main'
    | 'article';
};

export type PropsWithTestId<T = unknown> = T & {
  'data-testid'?: string;
};
