import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


export const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>About</h1>
      <Link to="/">Home</Link>
    </>
  )
};