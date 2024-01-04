// src/services/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Substitua pela URL real da sua API

interface AuthResponse {
  token: string;
}

const authService = {
  login: async (email: string, password: string): Promise<string> => {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/login`, { email, password });
      return response.data.token;
    } catch (error) {
      throw new Error('Falha no login');
    }
  },

  register: async (email: string, password: string): Promise<void> => {
    try {
      await axios.post(`${API_URL}/register`, { email, password });
    } catch (error) {
      throw new Error('Falha no registro');
    }
  },

  logout: (): void => {
    // Lógica para limpar o token do estado global ou contexto, por exemplo.
  },
};

export default authService;
