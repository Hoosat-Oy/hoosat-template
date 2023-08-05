Hoosat Create is a full-stack server-side rendered (SSR) TypeScript React stack designed to provide a seamless development experience with a clear separation between the client and server. Developed by Hoosat Oy, this stack offers a robust set of features to accelerate web application development.

## Features

- **Full-Stack TypeScript Application:** Hoosat Create leverages the power of TypeScript throughout the entire application stack, from the frontend to the backend, ensuring type safety and improved developer productivity.
- **Server-Side SEO with react-helmet-async:** The stack includes server-side SEO capabilities using react-helmet-async, allowing you to manage and control the document head and meta tags for search engine optimization.
- **ES Modules Only:** Hoosat Create supports ECMAScript modules (ES modules) for both server-side and client-side code, enabling better code organization and modularity.
- **Configured with Webpack:** The stack is pre-configured with Webpack for production builds, enabling efficient bundling, minification, and optimization of the code.
- **Jest for Unit Testing:** Hoosat Create comes with Jest, a popular JavaScript testing framework, to facilitate unit testing for your application components.
- **Example Components and Routes:** The stack includes pre-built example components and routes, providing a starting point for building your application.
- **Optional Hoosat UI React Component Library:** As an optional dependency, Hoosat Create offers the Hoosat UI React component library, which you can use to enhance your application's user interface with pre-designed UI components.


## Getting started

To create a new project using Hoosat Create, simply run the following command:
```
npx hoosat-create@latest
```

The npx script will prompt you with questions to configure your project, and it will generate the initial project structure for you.

Once the project is created, navigate to the project directory:
```
cd project_name
```

To start the development server, use the following command:
```
npm run dev
```

This command will concurrently build the development version of the client and server and run the server to serve both the client and API routes. The application will be accessible at `https://localhost:8080` in your browser.

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
- `public`: Contains public files for the project.
- `build`: Contains build output of server and client, the `public` folder is moved into here.


## Basic example server

File: `./src/server/index.tsx`

```
import React from 'react';
import App from '../client/App';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';


import { I18nextProvider } from 'react-i18next';
import i18n from './core/i18n';

import { cors } from './core/cors';
import { createRouter, createServer, listen } from './core/server';
import { assets } from './core/assets';
import { upload } from './core/upload';
import { pingRouter } from './api-routes/ping';
import { renderer } from './core/renderer';

// Create a router
const router = createRouter();

router.UseRouter(pingRouter);

/**
 * Middleware to handle CORS for allowed origins and HTTP methods.
 * @function
 * @param {string} origins - The allowed origins, separated by commas.
 * @param {string} methods - The allowed HTTP methods, separated by commas.
 */
router.Middleware(cors(process.env.ORIGINS || "localhost:8080", 'GET, POST, PUT, DELETE'));

/**
 * Middleware to serve static files from the "public" directory.
 * @function
 * @param {string} publicDir - The path to the "public" directory.
 */
router.Middleware(assets(process.env.PUBLIC! || "./build/public"));

/**
 * Middleware to handle multipart/form-data file uploading.
 * @function
 * @param {string} publicDir - The path to the "public" directory for uploads.
 */
router.Middleware(upload(process.env.PUBLIC! || "./build/public/uploads"));

/**
 * POST route to handle file uploads.
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.Post('/upload', (req, res) => {
  // Access the uploaded files through req.files
  console.log(req.files);
  // Since the file upload was handled globally by middleware send a response.
  res.status(200).json({ result: "success", files: req.files });
});

/**
 * GET route to handle all other requests.
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.Get("*", async (req, res) => {
  const helmetContext = {};
  /**
   * Represents the JSX element for the server-side rendering.
   * @type {JSX.Element}
   */
  const jsx = 
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <HelmetProvider context={helmetContext}>
          <html lang="FI-fi">
            <head>
              <meta charSet="utf-8" />
              <link rel="icon" href="/logo/favicon.ico" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="manifest" href="/manifest.json" />
            </head>
            <body>
              {/* Mounting the App component inside the StaticRouter */}
              <div id="root">
                <StaticRouter location={req.url!}>
                  <App />
                </StaticRouter>
              </div>
            </body>
          </html>
        </HelmetProvider>
      </I18nextProvider>
    </React.StrictMode>;
  renderer({
    res: res, 
    jsx: jsx, 
    helmetContext: helmetContext, 
    extractCSS: true, 
    preloadTagFolder: './build/public',
    headTags: {}
  });
});


// Create the server
const server = createServer(router);

// Start listening on port 8080
const port = parseInt(process.env.PORT || "8080");
listen(server, port, () => {
  console.log(`Server is running on port ${port}`);
});

```

## License
This template is licensed under the MIT License. Feel free to use it for your own projects or as a starting point for your own templates.

## Join us
[https://discord.gg/UXPFcPaPBg](Discord)