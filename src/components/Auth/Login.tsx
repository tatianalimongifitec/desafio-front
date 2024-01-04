// components/Auth/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import authService from '../../services/authService';

const Login: React.FC = () => {
  const navigate = useNavigate();  // Utilize o hook useNavigate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const token = await authService.login(email, password);
      // Salve o token no estado global ou em um contexto, por exemplo.
      navigate('/');  // Use o hook useNavigate para navegar para a página desejada
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

export default Login;
