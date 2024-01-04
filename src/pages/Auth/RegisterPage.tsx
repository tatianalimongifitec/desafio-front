// src/pages/Auth/RegisterPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await authService.register(email, password);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  return (
    <div>
      <h2>Registrar</h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleRegister}>
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
