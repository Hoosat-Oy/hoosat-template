import express from "express";
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from '../client/App';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  const location = req.url;
  const html = ReactDOMServer.renderToString(
    React.createElement(MemoryRouter, { initialEntries: [location] }, 
      React.createElement(App)  
    )
  );

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>React SSR with Typescript</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
