
import fs from 'fs';
import http, { IncomingMessage, ServerResponse } from "http";
import https from "https";
import path from 'path';
import { RequestHandler, Route, Router, Server } from '../../@types/hoosat-template';


export const createRouter = (): Router => {
  const routes: Route[] = [];
  const Route = (method: string, path: string, handler: RequestHandler) => {
    routes.push({ path, handler, method });
  };
  const UseRouter = (newRouter: Router) => {
    for(const route of newRouter.routes) {
      routes.push(route);
    }
  }
  const Get = (path: string, handler: RequestHandler) => {
    routes.push({path, handler, method: "GET"})
  };
  const Put = (path: string, handler: RequestHandler) => {
    routes.push({path, handler, method: "PUT"})
  };
  const Post = (path: string, handler: RequestHandler) => {
    routes.push({path, handler, method: "POST"})
  };
  const Delete = (path: string, handler: RequestHandler) => {
    routes.push({path, handler, method: "DELETE"})
  };
  const Middleware = (handler: RequestHandler) => {
    routes.push({ path: 'hoosat-middleware', handler, method: "" });
  };
  return { routes, Route, UseRouter, Get, Put, Post, Delete, Middleware };
};

export const assets = (publicPath: string): RequestHandler => {
  return (req: IncomingMessage, res: ServerResponse, next: RequestHandler | undefined) => {
    const filePath = path.join(publicPath, req.url || '');
    const fileStream = fs.createReadStream(filePath);
    fileStream.on('open', () => {
      res.setHeader('Content-Type', 'text/html'); 
      fileStream.pipe(res);
    });
    fileStream.on('error', (err) => {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT' || (err as NodeJS.ErrnoException).code === 'EISDIR') {
        next && next(req, res);
      } else {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    });
  };
};

export const handleRequest = (router: Router, req: IncomingMessage, res: ServerResponse) => {
  const { routes } = router;
  const path = req.url || '';
  const method = req.method || '';
  // Find executable middlewares
  const middlewares: RequestHandler[] = [];
  for (const route of routes) {
    if (route.path === 'hoosat-middleware') {
      middlewares.push(route.handler);
    }
  }
  // Execute middlewares and then the specified route.
  let currentMiddleware = 0;
  const executeNext = (currentReq: IncomingMessage, currentRes: ServerResponse): void => {
    if (currentMiddleware < middlewares.length) {
      const middleware = middlewares[currentMiddleware];
      currentMiddleware++;
      middleware(currentReq, currentRes, () => {
        executeNext(currentReq, currentRes);
      }); // Pass the new callback that maintains the current request and response
    } else {
      let foundRoute: Route | undefined;
      for (const route of routes) {
        if (route.path === path || (route.path.endsWith('*') && path.startsWith(route.path.slice(0, -1)))) {
          if(route.method === method) {
            foundRoute = route;
            break;
          }
        }
      }
      if (foundRoute) {
        foundRoute.handler(currentReq, currentRes, executeNext); // Pass executeNext as the next parameter
      } else {
        currentRes.writeHead(404, { 'Content-Type': 'text/plain' });
        currentRes.end('Not Found');
      }
    }
  };
  // Start executing middlewares and routes
  executeNext(req, res);
};

export const createServer = (router: Router) => {
  const protocol = process.env.PROTOCOL || "HTTP";
  let server: Server | undefined = undefined;
  if (protocol === "HTTPS") {
    const httpsOptions = {
      key: fs.readFileSync(process.env.HTTPS_KEY || ""),
      cert: fs.readFileSync(process.env.HTTPS_CERT || ""),
      ca: fs.readFileSync(process.env.HTTPS_CA  || ""),
    };
    server = https.createServer(httpsOptions, (req, res) => handleRequest(router, req, res));
  } else if (protocol === "HTTP") {
    server = http.createServer((req, res) => handleRequest(router, req, res));
  }
  return server;
}

export const listen = (server: Server, port: number, callback: () => void) => {
  return server?.listen(port, callback)
}