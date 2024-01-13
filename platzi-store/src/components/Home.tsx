// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h2>Bem-vindo à FITec Store!</h2>
      <p>Explore nossos produtos e faça ótimos negócios.</p>
      
      {/* Botão de SignIn */}
      <Link to="/signin">
        <button>SignIn</button>
      </Link>
      
      {/* Botão de Signup */}
      <Link to="/signup">
        <button>Signup</button>
      </Link>
    </div>
  );
};

export default Home;
