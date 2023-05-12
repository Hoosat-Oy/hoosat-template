import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';


export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
          <title>Home</title>
          <meta name="description" content="Home of Hoosat SSR template" />
      </Helmet>
      <h1>Home</h1>
      <button onClick={() => { navigate('/about'); }}>Navigate to about</button>
    </>
  )
};