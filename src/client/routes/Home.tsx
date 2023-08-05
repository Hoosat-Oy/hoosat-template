import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

/**
 * Represents the Home component of the Hoosat SSR template.
 * This component displays the home page content with a title, description,
 * and a link to navigate to the About page.
 *
 * @returns {JSX.Element} The React component representing the Home page.
 */
export const Home = () => {
  const pageTitle = 'Home of Hoosat SSR template';
  const pageDescription = 'This is the Hoosat project template for building React + Express TypeScript web applications.';

  return (
      <main>
        {/* The Helmet component sets the title and meta tags for SEO */}
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
          {/* The Link component creates a link to the About page */}
          <Link to="/about">Navigate to About page</Link>
        </section>
      </main>
  );
};
