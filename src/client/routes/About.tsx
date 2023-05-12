import React from 'react';
import { useNavigate } from 'react-router-dom';


export const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>About</h1>
      <button onClick={() => { navigate('/'); }}>Navigate to home</button>
    </>
  )
};