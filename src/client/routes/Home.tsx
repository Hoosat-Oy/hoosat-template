import React from 'react';
import { Title } from 'react-head';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';


export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Title>Home of Hoosat SSR template</Title>
      <h1>Home</h1>
      <p>This is Hoosat project template for building React + Express Typescript web applications.</p>
      <button onClick={() => { navigate('/about'); }}>Navigate to about</button>
    </>
  )
};