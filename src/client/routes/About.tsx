import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

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

