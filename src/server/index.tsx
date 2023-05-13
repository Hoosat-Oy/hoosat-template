// Importing necessary modules and components
import express, { Request, Response } from "express";
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import App from '../client/App';
import { StaticRouter } from 'react-router-dom/server';
import { HeadProvider } from 'react-head';

// Defining the port number
const PORT = process.env.PORT || 3000;

// Creating an instance of Express application
const app = express();

// Serving static files from public folder
app.use(express.static("./public"));

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
app.use((res: Response) => {
  res.status(404).send('Not Found');
});

// Starting the server on the defined port number
app.listen(PORT, () => {
  console.log(`Server is listening on port ${ PORT }`);
});