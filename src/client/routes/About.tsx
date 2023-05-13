import React from 'react';
import { Title } from 'react-head';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <>
      <Title>About Hoosat SSR template</Title>
      <h1>About</h1>
      <p>This is the Hoosat project template for building React + Express Typescript web applications with server-side rendering.</p>
      <Link to="/">Home</Link>
    </>
  );
};

