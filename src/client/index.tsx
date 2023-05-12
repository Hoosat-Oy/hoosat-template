import React from 'react';
import { hydrateRoot } from 'react-dom/client'
import App from './App';

const domNode = document.getElementById('root');
if(domNode === undefined || domNode === null) {
  console.log("Could not find element with root id.");
} else {
  const root = hydrateRoot(domNode, <App />);
}
