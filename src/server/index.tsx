import React from 'react';
import App from '../client/App';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { replaceHeadTags } from './core/seo';
import { ErrorHandler } from './core/errors';
import { cors } from './core/cors';
import { HelmetContext } from './core/types';
import { createRouter, createServer, listen } from './core/server';
import { assets } from './core/assets';
import { upload } from './core/upload';
import { pingRouter } from './api-routes/ping';
import { generatePreloadTags } from './core/preload';

// Create a router
const router = createRouter();

router.UseRouter(pingRouter);

// Define routes and middleware
router.Middleware(cors(process.env.ORIGINS!, 'GET, POST, PUT, DELETE'));

// Serve static files from the "public" directory.
router.Middleware(assets(process.env.PUBLIC!));

// Handle multipart/form-data file uploading.
router.Middleware(upload(process.env.PUBLIC!));

router.Post('/upload', (req, res) => {
  // Access the uploaded files through req.files
  console.log(req.files);
  // Since the file upload was handled globally by middleware send a response.
  res.status(200).json({ result: "success", files: req.files });
});

router.Get("*", (req, res) => {
  const helmetContext: HelmetContext = {};
  const preloadTags = generatePreloadTags('./build/public', '/');

  const replaceStream = replaceHeadTags({
    title: helmetContext.helmet?.title?.toString() || '',
    meta: helmetContext.helmet?.meta?.toString() || '',
    link: preloadTags.join("\n") + (helmetContext.helmet?.link?.toString() || ''),
    script: helmetContext.helmet?.script?.toString() || '',
    base: helmetContext.helmet?.base?.toString() || '',
    style: helmetContext.helmet?.style?.toString() || '',
  });

  // Rendering the App component to a pipeable stream
  const { pipe } = renderToPipeableStream(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <html lang="FI-fi">
          <head >
            <meta charSet="utf-8" />
            <title>Porin Akkupaketti</title>
            <meta name="description" content="Author: Hoosat Oy, Illustrator: Toni Lukkaroinen, Description: Porin Akkupaketti, teemme pienakkujen huoltamista ja kierrätämme niitä." />
            <link rel="icon" href="/logo/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
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
    }
  );
});


// Create the server
const server = createServer(router);

// Start listening on port 8080
const port = parseInt(process.env.PORT || "8080");
listen(server, port, () => {
  console.log(`Server is running on port ${port}`);
});
