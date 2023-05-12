import path from 'path';
import express, { Request, Response } from "express";
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import App from '../client/App';
import { StaticRouter } from 'react-router-dom/server';
import { HeadProvider } from 'react-head';

const PORT = process.env.PORT || 3000;
const app = express();

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.get('*', (req: Request, res: Response) => {
  const headTags = [];
  const { pipe } = renderToPipeableStream(
    <React.StrictMode>
        <html>
          <head>
            {headTags}
          </head>
          <body>
            <div id="root">
              <HeadProvider headTags={headTags}>
                <StaticRouter location={req.url}>
                  <App />
                </StaticRouter>
              </HeadProvider>
            </div>
            <script src="bundle.js"></script>
          </body>
        </html>
    </React.StrictMode>
  );
  res.setHeader('content-type', 'text/html');
  pipe(res);
});

app.use((req: Request, res: Response) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
