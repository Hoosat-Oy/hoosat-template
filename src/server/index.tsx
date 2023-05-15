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
import { APIRoutes } from './api-routes';
import { ErrorHandler } from './core/express-errors';
import { HelmetProvider } from 'react-helmet-async';
import { Transform } from 'stream';
import { HelmetContext } from '../@types/helmet';

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

const replaceHeadTags = (headTags: { title?: any; style?: any; meta?: any; link?: string; script?: any; base?: any; }) => {
  let replaced = false;
  return new Transform({
    transform(chunk, _encoding, callback) {
      if (!replaced) {
        let chunkStr = chunk.toString();
        const headOpenTagMatch = chunkStr.match(/<head[^>]*>/i);
        const headCloseTagMatch = chunkStr.match(/<\/head>/i);
        if (headOpenTagMatch && headCloseTagMatch) {
          const headContent = chunkStr.substring(headOpenTagMatch.index + headOpenTagMatch[0].length, headCloseTagMatch.index);
          const newHeadContent = headContent + headTags.title + headTags.style + headTags.meta + headTags.script + headTags.base;
          chunkStr = chunkStr.substring(0, headOpenTagMatch.index + headOpenTagMatch[0].length) + newHeadContent + chunkStr.substring(headCloseTagMatch.index);
          chunk = Buffer.from(chunkStr);
          replaced = true;
        }
      }
      callback(null, chunk);
    }
  });
};

// Defining the route for all requests
app.get('*', async (req: Request, res: Response) => {
  const helmetContext: HelmetContext = {};
  // Rendering the App component to a pipeable stream
  const { pipe } = renderToPipeableStream(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <html>
          <head>
          </head>
          <body>
            {/* Mounting the App component inside the StaticRouter */}
            <div id="root">
              <StaticRouter location={req.url}>
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
      pipe(replaceStream).pipe(res);
    },
    onShellError(error) {
      res.statusCode = 500;
      res.setHeader('content-type', 'text/html');
      res.send('<h1>Something went wrong</h1>');
      ErrorHandler(req, res, error);
    },
    onError(error) {
      console.error(error);
      ErrorHandler(req, res, error);
    }
  });
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

