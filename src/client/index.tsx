import React from 'react';
import { hydrateRoot } from 'react-dom/client'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { HeadProvider } from 'react-head';

const domNode = document.getElementById('root');
if (domNode === null) {
  console.log("Could not find element with root id.");
} else {
  const root = hydrateRoot(
    domNode, 
    <React.StrictMode>
      <HeadProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HeadProvider>
    </React.StrictMode>
  );
}