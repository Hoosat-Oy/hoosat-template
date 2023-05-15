import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const Home = () => {
  const pageTitle = 'Home of Hoosat SSR template';
  const pageDescription = 'This is the Hoosat project template for building React + Express TypeScript web applications.';

  return (
      <main>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:image" content="https://example.com/image.jpg" />
          <meta property="og:url" content="https://example.com/" />
        </Helmet>
        <section>
          <h1>{pageTitle}</h1>
          <p>
            {pageDescription}
          </p>
          <Link to="/about">Navigate to About page</Link>
        </section>
      </main>
  );
};
