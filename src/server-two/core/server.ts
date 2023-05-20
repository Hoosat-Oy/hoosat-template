
import fs from 'fs';
import http, { IncomingMessage, ServerResponse } from "http";
import https from "https";
import { HoosatRequest, HoosatResponse, HoosatRequestHandler, HoosatRoute, HoosatRouter, HoosatServer, HoosatServerOptions } from '../../@types';

/**
 * Creates a new router instance.
 *
 * @returns {Router} The created router instance.
 */
export const createRouter = (): HoosatRouter => {
  /**
   * The router instance used for defining routes and middleware.
   *
   * @typedef {Object} Router
   * @property {Array<Route>} routes - The array of registered routes.
   * @property {Function} Route - The function used to define a new route.
   * @property {Function} UseRouter - The function used to include routes from another router.
   * @property {Function} Get - The function used to define a GET route.
   * @property {Function} Put - The function used to define a PUT route.
   * @property {Function} Post - The function used to define a POST route.
   * @property {Function} Delete - The function used to define a DELETE route.
   * @property {Function} Middleware - The function used to define a middleware.
   */
  const routes: HoosatRoute[] = [];
  /**
   * Defines a new route with the specified method, path, and handler.
   * @param {string} method - The HTTP method for the route.
   * @param {string} path - The path pattern for the route.
   * @param {HoosatRequestHandler} handler - The request handler function for the route.
   * @return {void}
   */
  const Route = (method: string, path: string, handler: HoosatRequestHandler): void => {
    routes.push({ path, handler, method });
  };
  /**
   * Includes routes from another router into the current router.
   *
   * @param {HoosatRouter} newRouter - The router instance to include.
   * @returns {void}
   */
  const UseRouter = (newRouter: HoosatRouter): void => {
    for(const route of newRouter.routes) {
      routes.push(route);
    }
  }
  /**
   * Defines a new GET route with the specified path and handler.
   *
   * @param {string} path - The path pattern for the route.
   * @param {HoosatRequestHandler} handler - The request handler function for the route.
   * @returns {void}
   */
  const Get = (path: string, handler: HoosatRequestHandler): void => {
    routes.push({path, handler, method: "GET"})
  };
  /**
   * Defines a new PUT route with the specified path and handler.
   *
   * @param {string} path - The path pattern for the route.
   * @param {HoosatRequestHandler} handler - The request handler function for the route.
   * @returns {void}
   */
  const Put = (path: string, handler: HoosatRequestHandler): void => {
    routes.push({path, handler, method: "PUT"})
  };
  /**
   * Defines a new POST route with the specified path and handler.
   *
   * @param {string} path - The path pattern for the route.
   * @param {HoosatRequestHandler} handler - The request handler function for the route.
   * @returns {void}
   */
  const Post = (path: string, handler: HoosatRequestHandler): void => {
    routes.push({path, handler, method: "POST"})
  };
  /**
   * Defines a new DELETE route with the specified path and handler.
   *
   * @param {string} path - The path pattern for the route.
   * @param {HoosatRequestHandler} handler - The request handler function for the route.
   * @returns {void}
   */
  const Delete = (path: string, handler: HoosatRequestHandler): void => {
    routes.push({path, handler, method: "DELETE"})
  };
  /**
   * Defines a middleware with the specified handler.
   *
   * @param {HoosatRequestHandler} handler - The request handler function for the middleware.
   * @returns {void}
   */
  const Middleware = (handler: HoosatRequestHandler): void => {
    routes.push({ path: 'hoosat-middleware', handler, method: "" });
  };
  return { routes, Route, UseRouter, Get, Put, Post, Delete, Middleware };
};

const parseIncomingMessage = (message: IncomingMessage): HoosatRequest => {
  const request: HoosatRequest = {
    incomingMessage: message,
    url: message.url || "",
    headers: message.headers,
    params: {},
  }
  let data = '';
  message.on('data', (chunk) => {
    data += chunk;
  });
  message.on('end', () => {
    // Parse the request body if it is in JSON format
    try {
      request.body = JSON.parse(data);
    } catch (error) {
      request.body = data;
    }
  });
  return request;
}

const createServerResponse = (response: ServerResponse): HoosatResponse => {
  const serverResponse: HoosatResponse = {
    serverResponse: response,
    statusCode: response.statusCode || 200,
    headers: response.getHeaders(),
    send: (body: string | object) => {
      if (typeof body === 'object') {
        serverResponse.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(body));
      } else {
        serverResponse.setHeader('Content-Type', 'text/plain');
        response.end(body);
      }
      return serverResponse;
    },
    json: (body: object) => {
      serverResponse.send(body);
      return serverResponse;
    },
    setHeader: (name: string, value: string | string[]) => {
      response.setHeader(name, value);
      return serverResponse;
    },
    status: (status) => {
      serverResponse.statusCode = status;
      return serverResponse;
    }
  };
  return serverResponse;
};

/**
 * Handles incoming requests by executing middlewares and routing to the appropriate handler.
 *
 * @param {Router} router - The router instance used for routing.
 * @param {IncomingMessage} req - The incoming request object.
 * @param {ServerResponse} res - The server response object.
 * @returns {void}
 */
export const handleRequest = (router: HoosatRouter, req: IncomingMessage, res: ServerResponse): void => {
  const request = parseIncomingMessage(req);
  const response = createServerResponse(res);
  const { routes } = router;
  const path = req.url || '';
  const method = req.method || '';
  // Find executable middlewares
  const middlewares: HoosatRequestHandler[] = [];
  for (const route of routes) {
    if (route.path === 'hoosat-middleware') {
      middlewares.push(route.handler);
    }
  }
  // Execute middlewares and then the specified route.
  let currentMiddleware = 0;
  const executeNext = (currentReq: HoosatRequest, currentRes: HoosatResponse): void => {
    if (currentMiddleware < middlewares.length) {
      const middleware = middlewares[currentMiddleware];
      currentMiddleware++;
      middleware(currentReq, currentRes, () => {
        executeNext(currentReq, currentRes);
      }); // Pass the new callback that maintains the current request and response
    } else {
      let foundRoute: HoosatRoute | undefined;
      for (const route of routes) {
        const { path: routePath, method: routeMethod } = route;
        const pathSegments = path.split('/').filter(segment => segment !== '');
        const routeSegments = routePath.split('/').filter(segment => segment !== '');
        if (pathSegments.length === routeSegments.length && routeMethod === method) {
          let match = true;
          const params: { [paramName: string]: string } = {};
          for (let i = 0; i < routeSegments.length; i++) {
            const routeSegment = routeSegments[i];
            if (routeSegment.startsWith(':')) {
              const paramName = routeSegment.slice(1);
              const paramValue = pathSegments[i];
              params[paramName] = paramValue;
            } else if (pathSegments[i] !== routeSegment) {
              match = false;
              break;
            }
          }
          if (match) {
            currentReq.params = params;
            foundRoute = route;
            break;
          }
        }
      }
      if (foundRoute) {
        foundRoute.handler(currentReq, currentRes, executeNext); 
      } else {
        foundRoute = routes.find(route => {
          if(route.path === "*") {
            return true;
          } else if (route.path.endsWith("/*") && path.startsWith(route.path.slice(0, -1))) {
            return true;
          }  else {
            return false;
          }
        })
        if(foundRoute) {
          foundRoute.handler(currentReq, currentRes, executeNext); 
        } else {
          response.status(404).send("Not Found");
        }
      }
    }
  };
  // Start executing middlewares and routes
  executeNext(request, response);
};


/**
 * Creates a server using the specified router and options.
 *
 * @param {Router} router - The router instance to handle incoming requests.
 * @param {ServerOptions} [options] - The options for configuring the server.
 * @returns {Server | undefined} The created server instance, or `undefined` if creation fails.
 */
export const createServer = (router: HoosatRouter, options?: HoosatServerOptions): HoosatServer | undefined => {
  /**
   * The protocol options for configuring the server.
   *
   * @typedef {Object} https
   * @property {string} [key] - The path to the private key file for HTTPS.
   * @property {string} [cert] - The path to the certificate file for HTTPS.
   * @property {string} [ca] - The path to the CA (Certificate Authority) file for HTTPS.
   */
  /**
   * The options for configuring the server.
   *
   * @typedef {Object} ServerOptions
   * @property {string} [protocol] - The protocol to use for the server (e.g., "HTTP" or "HTTPS").
   * @property {https} [https] - The HTTPS options for configuring the server.
   */

  // Determine the protocol to use for the server (default: "HTTP").
  const protocol = options?.protocol || "HTTP";
  let server: HoosatServer = undefined;
  if (protocol === "HTTPS") {
    /**
     * The options for configuring an HTTPS server.
     *
     * @type {https.ServerOptions}
     */
    const httpsOptions: https.ServerOptions = {
      key: fs.readFileSync(options?.https?.key || ""),
      cert: fs.readFileSync(options?.https?.cert || ""),
      ca: fs.readFileSync(options?.https?.ca || ""),
    };

    // Create an HTTPS server with the provided options.
    server = https.createServer(httpsOptions, (req, res) => handleRequest(router, req, res));
  } else if (protocol === "HTTP") {
    // Create an HTTP server.
    server = http.createServer((req, res) => handleRequest(router, req, res));
  }
  return server;
};

/**
 * Starts the server to listen on the specified port.
 *
 * @param {Server} server - The server instance to start listening.
 * @param {number} port - The port number to listen on.
 * @param {Function} callback - The callback function to be called when the server starts listening.
 *                              This function does not receive any arguments.
 * @returns {Server} The server instance.
 */
export const listen = (server: HoosatServer, port: number, callback: () => void): HoosatServer => {
  /**
   * The server instance.
   *
   * @typedef {Object} Server
   * @property {Function} listen - Starts the server to listen on a specified port.
   */

  return server?.listen(port, callback);
};