// src/components/Auth/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      await authService.register(email, password);
      navigate('/login');
    } catch (error) {
      setError('Erro ao registrar. Verifique suas credenciais.');
      console.error('Erro ao registrar:', error);
    }
  };

  return (
    <div>
      <h2>Registrar</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default Register;
