// src/api/platziApi.ts
import axios, { AxiosResponse } from 'axios';

const baseURL = 'https://fakeapi.platzi.com';

const platziApi = axios.create({
  baseURL,
});

// Função para definir o token de autenticação JWT nas requisições
export const setAuthToken = (token: string | null) => {
  if (token) {
    platziApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete platziApi.defaults.headers.common['Authorization'];
  }
};

// Funções para realizar chamadas à API
export const fetchProducts = (): Promise<AxiosResponse> => platziApi.get('/products');
export const createProduct = (data: any): Promise<AxiosResponse> => platziApi.post('/products', data);
export const updateProduct = (id: string, data: any): Promise<AxiosResponse> => platziApi.put(`/products/${id}`, data);
export const deleteProduct = (id: string): Promise<AxiosResponse> => platziApi.delete(`/products/${id}`);

// Repita o mesmo padrão para outras entidades (users, files, etc.)

export default platziApi;
