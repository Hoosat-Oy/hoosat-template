import React from 'react';
import { Title } from 'react-head';
import { Link, useNavigate } from 'react-router-dom';


export const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <Title>About Hoosat SSR template</Title>
      <h1>About</h1>
      <Link to="/">Home</Link>
    </>
  )
};