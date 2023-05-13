import React from 'react';
import { Title } from 'react-head';
import { Link } from 'react-router-dom';

export const Home = () => {
  const pageTitle = 'Home of Hoosat SSR template';

  return (
    <main>
      <Title>{pageTitle}</Title>
      <section>
        <h1>{pageTitle}</h1>
        <p>
          This is the Hoosat project template for building React + Express TypeScript web applications.
        </p>
        <Link to="/about">Navigate to About page</Link>
      </section>
    </main>
  );
};
