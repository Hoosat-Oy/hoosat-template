import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import App from '../client/App';

const app = express();

app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/', (req, res) => {
  const message = 'Hello from server!';
  const html = renderToString(React.createElement(App));
  const helmet = Helmet.renderStatic();

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/server.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
