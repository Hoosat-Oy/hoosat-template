/**
 * This is the main component of the client-side React application.
 * It defines the routes for the app using the Routes and Route components from react-router-dom.
 * The Home component is rendered when the URL path is / and the About component is rendered when
 * the URL path is /about.
 * 
 * From this point onwards you can change your code to be productive. 
 * /src/client/App.tsx - Main component with routing
 * /src/client/routes/Home.tsx - Example component for routing.
 * /src/client/routes/About.tsx - Example component for routing.
 * 
 * @returns The React component that defines the app routes.
*/

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { About } from './routes/About';
import { Home } from './routes/Home';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
