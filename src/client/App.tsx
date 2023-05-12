import React, { useState } from 'react';
import { Router } from 'react-router-dom';
import { Helmet, HelmetData } from 'react-helmet';

import './App.css';
import { About } from './About';

export default function App() {
  const helmet = Helmet.renderStatic();

  return (
    <html>
      <head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          <Helmet>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>My Title</title>
              <link rel="canonical" href="http://mysite.com/example" />
              <link rel="stylesheet" href="/styles.css"></link>
          </Helmet>
      </head>
      <body>
        <About />
      </body>
    </html>
  );
}
