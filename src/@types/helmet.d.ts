export interface HelmetContext {
  helmet?: {
    priority?: {
      toComponent: () => React.ReactElement | null;
      toString: () => string;
    };
    base?: {
      toComponent: () => React.ReactElement | null;
      toString: () => string;
    };
    bodyAttributes?: {
      toComponent: () => React.ReactElement | null;
      toString: () => string;
    };
    htmlAttributes?: {
      toComponent: () => React.ReactElement | null;
      toString: () => string;
    };
    link?: {
      toComponent: () => React.ReactElement | null;
      toString: () => string;
    };
    meta?: {
      toComponent: () => React.ReactElement | null;
      toString: () => string;
    };
    noscript?: {
      toComponent: () => React.ReactElement | null;
      toString: () => string;
    };
    script?: {
      toComponent: () => React.ReactElement | null;
      toString: () => string;
    };
    style?: {
      toComponent: () => React.ReactElement | null;
      toString: () => string;
    };
    title?: {
      toComponent: () => React.ReactElement | null;
      toString: () => string;
    };
  }
}