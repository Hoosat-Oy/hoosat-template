// Importing necessary modules and components
import fs from 'fs';
import http from "http";
import https from "https";
import React from 'react';
import express, { Request, Response } from "express";
import cors  from "cors";
import { renderToPipeableStream } from 'react-dom/server';
import App from '../client/App';
import { StaticRouter } from 'react-router-dom/server';
import { HeadProvider } from 'react-head';
import { APIRoutes } from './api-routes';

// Defining the port number
let PORT = process.env.PORT || 8080;

// Creating an instance of Express application
const app = express();

// Express middlewares
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS handling. 
app.use(cors({
  origin: (origin, callback) => {
    const whitelist = process.env.ORIGINS?.split(", ") || [`http://localhost:${PORT.toString()}`];
    if(!origin || whitelist.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error("You can access only from specific domains."), false);
    }
  }
}));


// use API routes.
APIRoutes(app);

// Serving static files from public folder
app.use(express.static("./public"));


// Define express app route for /api that calls a function giving it the router.

// Defining the route for all requests
app.get('*', (req: Request, res: Response) => {
  // Defining an array to store the head tags
  const headTags = [];

  // Rendering the App component to a pipeable stream
  const { pipe } = renderToPipeableStream(
    <React.StrictMode>
      <html>
        <head>
          {/* Adding head tags to the array */}
          {headTags}
        </head>
        <body>
          {/* Mounting the App component inside the StaticRouter */}
          <div id="root">
            <HeadProvider headTags={headTags}>
              <StaticRouter location={req.url}>
                <App />
              </StaticRouter>
            </HeadProvider>
          </div>
          {/* Including the client-side JS bundle */}
          <script src="bundle.js"></script>
        </body>
      </html>
    </React.StrictMode>
  );

  // Setting the content-type of the response to HTML and piping the rendered HTML to the response
  res.setHeader('content-type', 'text/html');
  pipe(res);
});

// Defining a fallback route for 404 Not Found responses
app.use((req: Request, res: Response) => {
  res.status(404).send(`Not found ${req.url}`);
});

// Start listening for HTTP or HTTPS connections
// depending on the configuration.
if(process.env.PROTOCOL === "HTTPS") {
  if(process.env.HTTPS_KEY !== undefined && process.env.HTTPS_CERT && process.env.HTTPS_CA) {
    const httpsOptions = {
      key: fs.readFileSync(process.env.HTTPS_KEY),
      cert: fs.readFileSync(process.env.HTTPS_CERT),
      ca: fs.readFileSync(process.env.HTTPS_CA),
    };
    const httpsServer = https.createServer(httpsOptions, app);
    httpsServer.listen(PORT, () => {
      console.log(`Server listening on port ${PORT.toString()} using https.\r\n`);
    });
  }
} else {
  const httpServer = http.createServer(app);
  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT.toString()} using http.\r\n`);
  });
}