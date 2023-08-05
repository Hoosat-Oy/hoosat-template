import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

/**
 * Represents the About component of the Hoosat SSR template.
 * This component displays the about page content with a title and description.
 * It also includes a link to navigate back to the Home page.
 *
 * @returns {JSX.Element} The React component representing the About page.
 */
export const About = () => {
  const pageTitle = 'About of Hoosat SSR template';
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <h1>{pageTitle}</h1>
      <p>This is the Hoosat project template for building React + Express Typescript web applications with server-side rendering.</p>
      <Link to="/">Home</Link>
    </>
  );
};

