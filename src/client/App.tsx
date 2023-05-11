import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

const Home = () => <h1 className='large'>Home</h1>;
const About = () => <h1>About</h1>;

const App = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
);

export default App;
