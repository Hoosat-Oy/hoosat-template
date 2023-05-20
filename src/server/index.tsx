// Importing necessary modules and components
// import express, { Request, Response } from "express";
//import cors  from "cors";
import React from 'react';
import App from '../client/App';
import { renderToPipeableStream } from 'react-dom/server';
// import App from '../client/App';
import { StaticRouter } from 'react-router-dom/server';
// import { APIRoutes } from './api-routes';
// import { ErrorHandler } from './core/express-errors';
import { HelmetProvider } from 'react-helmet-async';
// import { Transform } from 'stream';
import { replaceHeadTags } from './core/seo';
import { ErrorHandler } from './core/errors';
import { cors } from './core/cors';
import { HelmetContext } from '../@types';
import { createRouter, createServer, listen } from './core/server';
import { pingRouter } from './api-routes/ping';
import { assets } from './core/assets';

// Create a router
const router = createRouter();

// Define routes and middleware
router.Middleware(cors('http://localhost:3000/', 'GET, POST, PUT, DELETE'));

// Serve static files from the "public" directory
router.Middleware(assets("./public"));

// Use Router from another module.
router.UseRouter(pingRouter);

router.Get("*", (req, res) => {
  const helmetContext: HelmetContext = {};
  // Rendering the App component to a pipeable stream
  const { pipe } = renderToPipeableStream(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <html>
          <head>
            <link rel="manifest" href="/manifest.json" />
          </head>
          <body>
            {/* Mounting the App component inside the StaticRouter */}
            <div id="root">
              <StaticRouter location={req.url || ''}>
                <App />
              </StaticRouter>
            </div>
          </body>
        </html>
      </HelmetProvider>
    </React.StrictMode>,
    {
      bootstrapScripts: ['/bundle.js'],
      onShellReady: async () => {
        const replaceStream = replaceHeadTags({
          title: helmetContext.helmet?.title?.toString() || '',
          style: helmetContext.helmet?.script?.toString() || '',
          meta: helmetContext.helmet?.meta?.toString() || '',
          link: helmetContext.helmet?.link?.toString() || '',
          script: helmetContext.helmet?.script?.toString() || '',
          base: helmetContext.helmet?.script?.toString() || '',
        });
        pipe(replaceStream).pipe(res.serverResponse);
      },
      onShellError(error) {
        console.log(error);
        res.status(500).send("onShellError");
        ErrorHandler(error);
      },
      onError(error) {
        console.error(error);
        ErrorHandler(error);
      }
    });
});

// Create the server
const server = createServer(router);

// Start listening on port 8080
const port = parseInt(process.env.PORT || "8080");
listen(server, port, () => {
  console.log(`Server is running on port ${port}`);
});
