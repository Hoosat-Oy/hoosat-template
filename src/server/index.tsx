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

// Define routes and middleware
router.Middleware(cors(process.env.ORIGINS || "localhost:8080", 'GET, POST, PUT, DELETE'));

// Serve static files from the "public" directory.
router.Middleware(assets(process.env.PUBLIC! || "./build/public"));

// Handle multipart/form-data file uploading.
router.Middleware(upload(process.env.PUBLIC! || "./build/public/uploads"));

router.Post('/upload', (req, res) => {
  // Access the uploaded files through req.files
  console.log(req.files);
  // Since the file upload was handled globally by middleware send a response.
  res.status(200).json({ result: "success", files: req.files });
});

router.Get("*", async (req, res) => {
  const helmetContext = {};
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
