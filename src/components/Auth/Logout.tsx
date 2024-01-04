// components/Auth/Logout.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Utilize o hook useNavigate
import authService from '../../services/authService';

const Logout: React.FC = () => {
  const navigate = useNavigate();  // Utilize o hook useNavigate

  const handleLogout = () => {
    authService.logout();
    navigate('/login');  // Use o hook useNavigate para navegar para a página desejada
  };

  return (
    <div>
      <h2>Sair</h2>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
};

export default Logout;
