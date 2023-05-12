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
