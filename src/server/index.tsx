import path from 'path';
import express, { Request, Response } from "express";
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../client/App';

const PORT = process.env.PORT || 3000;
const app = express();

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.get('*', (req: Request, res: Response) => {
  const { pipe } = renderToPipeableStream(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
    , {
    bootstrapScripts: ['/hoosat.js'],
    onShellReady() {
      res.setHeader('content-type', 'text/html');
      pipe(res);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
