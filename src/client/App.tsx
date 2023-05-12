import React, { useState } from 'react';
import { Helmet, HelmetData } from 'react-helmet';

import './App.css';
import { About } from './routes/About';
import { Home } from './routes/Home';
import { Route, Routes, useLocation } from 'react-router';

export default function App() {
  const location = useLocation();
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
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />} />
        </Routes>
      </body>
    </html>
  );
}
