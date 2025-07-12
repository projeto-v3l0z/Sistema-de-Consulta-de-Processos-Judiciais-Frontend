import axios from 'axios';

// Configuração base da API
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Timeout na requisição. Tente novamente.');
    }
    
    if (error.response?.status === 404) {
      throw new Error('Processo não encontrado');
    }
    
    if (error.response?.status >= 500) {
      throw new Error('Erro interno do servidor. Tente novamente mais tarde.');
    }
    
    throw error;
  }
);

// Funções específicas para processos
export const processosAPI = {
  // Buscar processo por número
  buscarPorNumero: async (numeroProcesso) => {
    try {
      const response = await api.get(`/processos/${numeroProcesso}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Buscar múltiplos processos (para futuras funcionalidades)
  buscarMultiplos: async (numeros) => {
    try {
      const response = await api.post('/processos/buscar-multiplos', { numeros });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Buscar histórico de movimentações
  buscarMovimentacoes: async (numeroProcesso) => {
    try {
      const response = await api.get(`/processos/${numeroProcesso}/movimentacoes`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;
