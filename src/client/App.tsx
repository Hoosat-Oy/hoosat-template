

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { About } from './routes/About';
import { Home } from './routes/Home';

/**
 * Represents the main component of the client-side React application.
 * It defines the routes for the app using the Routes and Route components from react-router-dom.
 * The Home component is rendered when the URL path is "/" and the About component is rendered when
 * the URL path is "/about".
 *
 * @returns {JSX.Element} The React component that defines the app routes.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
