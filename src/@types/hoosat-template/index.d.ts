import http, { IncomingMessage, ServerResponse } from "http";
import https from "https";

type Server = https.Server<typeof http.IncomingMessage, typeof http.ServerResponse> | http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> | undefined;
type RequestHandler = (req: IncomingMessage, res: ServerResponse, next?: RequestHandler) => void;
type Route = { path: string; handler: RequestHandler, method: string };

type Router = {
  routes: Route[];
  Route: (method: string, path: string, handler: RequestHandler) => void;
  UseRouter: (newRouter: Router) => void;
  Get: (path: string, handler: RequestHandler) => void;
  Put: (path: string, handler: RequestHandler) => void;
  Post: (path: string, handler: RequestHandler) => void;
  Delete: (path: string, handler: RequestHandler) => void;
  Middleware: (handler: RequestHandler) => void;
};

interface ServerOptions {
  protocol?: string,
  https?: {
    key?: string,
    cert?: string,
    ca?: string,
  }
}

export { Server, ServerOptions, RequestHandler, Route, Router };

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

export interface HeadTags {
  title?: any;
  style?: any;
  meta?: any;
  link?: string;
  script?: any;
  base?: any;
}