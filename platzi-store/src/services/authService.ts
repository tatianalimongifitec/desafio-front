// src/services/authService.ts
import axios from 'axios';

export const login = async (username: string, password: string) => {
  const response = await axios.post('API_ENDPOINT/login', { username, password });
  return response.data.token;
};

export const setAuthToken = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const logout = () => {
  delete axios.defaults.headers.common['Authorization'];
};
