// src/pages/Auth/LogoutPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login'); // Redirecione para a página de login após o logout
  };

  return (
    <div>
      <h2>Sair</h2>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
};

export default LogoutPage;
