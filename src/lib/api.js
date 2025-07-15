// lib/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    // Adicione aqui headers de autenticação se necessário
  }
});

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Tratamento específico por status code
      switch (error.response.status) {
        case 400:
          error.message = 'Dados inválidos na requisição';
          break;
        case 401:
          error.message = 'Não autorizado';
          break;
        case 404:
          error.message = 'Processo não encontrado';
          break;
        case 500:
          error.message = 'Erro interno no servidor';
          break;
        default:
          error.message = `Erro na requisição: ${error.response.status}`;
      }
    } else if (error.request) {
      error.message = 'Sem resposta do servidor';
    }
    return Promise.reject(error);
  }
);

export const processosAPI = {
  /**
   * Busca processos com filtros opcionais
   * @param {Object} filters - Filtros de busca
   * @param {string} [filters.numero] - Número do processo
   * @param {string} [filters.tribunal] - Tribunal
   * @param {string} [filters.situacao] - Situação atual
   * @returns {Promise<Array>} Lista de processos
   */
  buscarProcessos: async (filters = {}) => {
    try {
      const response = await api.get('/processos/', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar processos:', error);
      throw error;
    }
  },

  /**
   * Busca um processo específico por ID
   * @param {number|string} id - ID do processo
   * @returns {Promise<Object>} Dados do processo
   */
  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/processos/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar processo por ID:', error);
      throw error;
    }
  },

  /**
   * Pesquisa unificada (banco local + DataJud)
   * @param {string} numero - Número do processo
   * @returns {Promise<Array>} Resultados da pesquisa
   */
  pesquisaUnificada: async (numero) => {
    try {
      const response = await api.get('/processos/pesquisa/', { 
        params: { numero } 
      });
      return response.data;
    } catch (error) {
      console.error('Erro na pesquisa unificada:', error);
      throw error;
    }
  },

  /**
   * Cria um novo processo
   * @param {Object} processoData - Dados do processo
   * @returns {Promise<Object>} Processo criado
   */
  criarProcesso: async (processoData) => {
    try {
      const response = await api.post('/processos/', processoData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar processo:', error);
      throw error;
    }
  },

  /**
   * Atualiza um processo existente
   * @param {number|string} id - ID do processo
   * @param {Object} updateData - Dados para atualização
   * @returns {Promise<Object>} Processo atualizado
   */
  atualizarProcesso: async (id, updateData) => {
    try {
      const response = await api.patch(`/processos/${id}/`, updateData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar processo:', error);
      throw error;
    }
  },

  /**
   * Força a atualização de um processo
   * @param {number|string} id - ID do processo
   * @returns {Promise<Object>} Processo atualizado
   */
  forcarAtualizacao: async (id) => {
    try {
      const response = await api.post(`/processos/${id}/forcar-atualizacao/`);
      return response.data;
    } catch (error) {
      console.error('Erro ao forçar atualização:', error);
      throw error;
    }
  },

  /**
   * Remove um processo
   * @param {number|string} id - ID do processo
   * @returns {Promise<void>}
   */
  deletarProcesso: async (id) => {
    try {
      await api.delete(`/processos/${id}/`);
    } catch (error) {
      console.error('Erro ao deletar processo:', error);
      throw error;
    }
  }
};

// Exporte a instância do axios caso precise usar diretamente
export default api;