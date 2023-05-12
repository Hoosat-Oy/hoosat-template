import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { hydrateRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { About } from './About';

const domNode = document.getElementById('root');
if(domNode === undefined || domNode === null) {
  console.log("Could not find element with root id.");
} else {
  const root = hydrateRoot(domNode, <App />);
}
