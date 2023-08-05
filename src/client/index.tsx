import React from 'react';
import { hydrateRoot } from 'react-dom/client'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

/**
 * Represents the root DOM node where the React app will be hydrated.
 */
const domNode = document.getElementById('root');

/**
 * Hydrates the React app into the root DOM node using the React DOM client API.
 * If the root DOM node cannot be found, log an error message to the console.
 * @param domNode - The root DOM node.
 * @returns {void}
 */
if (domNode === null) {
  console.log("Could not find element with root id.");
} else {
  // Hydrate the app into the root DOM node using the React DOM client API
  hydrateRoot(
    domNode, 
    // Wrap the App component in a StrictMode component for extra runtime checks
    <React.StrictMode>
      <HelmetProvider>
        {/* Use a BrowserRouter to enable client-side routing */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  );
}
