# Hoosat React + Typescript Template

This is a template for building a full-stack server side rendered web application using React and TypeScript. It includes support for ES modules using Webpack and unit testing with Jest.

## Technologies Used

- React-helmet-async 1.3
- React 18.2
- TypeScript 4.9.2
- Webpack 5
- Jest 27

## Features

- Full-stack TypeScript application using React and Node HTTP/HTTPS.
- Includes working server side SEO with `react-helmet-async`
- Supports ES modules for server-side and client-side code.
- Configured with Webpack for production builds.
- Includes Jest for unit testing.
- Includes example components and routes for getting started.
- Includes HoosatUI as optional dependancy as git submodule.


## Getting started

1. Clone this repository
```
git clone https://github.com/hoosat-oy/hoosat-template
```

2. Install dependancies
```
cd hoosat-template
npm install
```

3. Build the client and server and start the server.
```
npm run dev
```

4. Open `https://localhost:3000` in your browser to view the application.

## Scripts

- `npm run dev`: Builds and runs the development version.
  - This script concurrently executes the following commands:
    - `npm run dev:build:client`: Builds the client in development mode and watches for file changes.
    - `npm run dev:build:server`: Builds the server in development mode and watches for file changes.
    - `npm run dev:run`: Starts the server with Nodemon to automatically restart it on file changes.

- `npm run build`: Builds the production version.
  - This script sequentially executes the following commands:
    - `npm run build:client`: Builds the client in production mode.
    - `npm run build:server`: Builds the server in production mode.

- `npm run start`: Runs the production version.
  - This script starts the server using the compiled production files.

- `npm run test`: Runs test units with Jest.
  - This script executes the test units using Jest.

## File structure

- `src/client`: Contains client-side code (React components, styles, etc.).
- `src/server`: Contains server-side code (Node HTTP/HTTPS routes, API routes, etc.).
- `src/common`: Contains common code.
- `public`: Contains the bundle.js client code and public files for the project.
- `dist`: Contains production build output of server.

## Node HTTP/HTTP server with server side router.

`src/server/core/server.ts` contains the source code, it supports middlewares, wildcard routes and specific routes. There are middlewares currently for setting cors and static files. 

### Basic example

```
import { createRouter, createServer, listen } from './core/server';
import { cors } from './core/cors';
import { assets } from './core/assets';
// Creating the router
const router = createRouter();

// Adding static file middleware
router.Middleware(assets("./public"));

// Creating a ping route
// For request and response we dont use wrappers for node http types and methods.
router.Get("/ping", (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(20, { 'Content-Type': "text/plain" });
  res.end("pong!");
});

// Now that the middleware and routes have been set the server must be created that handles the routes.
const server = createServer(router);

// Start listening on port 3000
const port = parseInt(process.env.PORT || "8080");
listen(server, port, () => {
  console.log(`Server is running on port ${port.toString()}`);
});
```

## License
This template is licensed under the MIT License. Feel free to use it for your own projects or as a starting point for your own templates.

## Join us
[https://discord.gg/UXPFcPaPBg](Discord)