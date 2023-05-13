import React from 'react';
import { hydrateRoot } from 'react-dom/client'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { HeadProvider } from 'react-head';

// Get the root DOM node to hydrate the app into
const domNode = document.getElementById('root');

// If the root DOM node cannot be found, log an error message to the console
if (domNode === null) {
  console.log("Could not find element with root id.");
} else {
  // Hydrate the app into the root DOM node using the React DOM client API
  hydrateRoot(
    domNode, 
    // Wrap the App component in a StrictMode component for extra runtime checks
    <React.StrictMode>
      <HeadProvider>
        {/* Use a BrowserRouter to enable client-side routing */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HeadProvider>
    </React.StrictMode>
  );
}
