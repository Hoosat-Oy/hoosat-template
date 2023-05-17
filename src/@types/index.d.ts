import http, { IncomingMessage, OutgoingHttpHeaders, ServerResponse } from "http";
import https from "https";

interface HoosatRequest {
  incomingMessage: IncomingMessage;
  url: string;
  headers: http.IncomingHttpHeaders;
  params: {};
  body?: any;
}

interface HoosatResponse {
  serverResponse: ServerResponse;
  statusCode: number;
  headers: OutgoingHttpHeaders;
  send: (body: string | object) => HoosatResponse;
  json: (body: object) => HoosatResponse;
  setHeader: (arg0: string, arg1: string) => HoosatResponse;
  status: (status: number) => HoosatResponse;
}

type HoosatServer = https.Server<typeof IncomingMessage, typeof ServerResponse> | http.Server<typeof IncomingMessage, typeof ServerResponse> | undefined;
type HoosatRequestHandler = (req: HoosatRequest, res: HoosatResponse, next?: HoosatRequestHandler) => void;
type HoosatRoute = { path: string; handler: HoosatRequestHandler, method: string };

type HoosatRouter = {
  routes: HoosatRoute[];
  Route: (method: string, path: string, handler: HoosatRequestHandler) => void;
  UseRouter: (newRouter: HoosatRouter) => void;
  Get: (path: string, handler: HoosatRequestHandler) => void;
  Put: (path: string, handler: HoosatRequestHandler) => void;
  Post: (path: string, handler: HoosatRequestHandler) => void;
  Delete: (path: string, handler: HoosatRequestHandler) => void;
  Middleware: (handler: HoosatRequestHandler) => void;
};

interface HoosatServerOptions {
  protocol?: string,
  https?: {
    key?: string,
    cert?: string,
    ca?: string,
  }
}

export { HoosatServer, HoosatServerOptions, HoosatRequestHandler, HoosatRequest, HoosatResponse, HoosatRoute, HoosatRouter };

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