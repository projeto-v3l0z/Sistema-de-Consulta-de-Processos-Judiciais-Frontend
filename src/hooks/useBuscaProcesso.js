'use client';
import { useState, useCallback } from 'react';
import { processosAPI } from '../lib/api';

export const useBuscaProcesso = () => {
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const buscarProcesso = useCallback(async (numeroProcesso) => {
    if (!numeroProcesso?.trim()) {
      setErro('Número do processo é obrigatório');
      return;
    }

    setCarregando(true);
    setErro(null);
    setResultado(null);

    try {
      // Remove caracteres não numéricos, mantendo pontos e traços
      const numeroLimpo = numeroProcesso.replace(/[^\d.-]/g, '');
      
      // Validação básica
      if (numeroLimpo.length < 10) {
        throw new Error('Número muito curto (mínimo 10 caracteres)');
      }

      // Chama a API real (pesquisa unificada)
      const resultados = await processosAPI.pesquisaUnificada(numeroLimpo);
      
      if (!resultados || resultados.length === 0) {
        throw new Error('Processo não encontrado');
      }

      setResultado(resultados[0]); // Pega o primeiro resultado
    } catch (error) {
      console.error('Erro na busca:', error);
      setErro(error.message || 'Erro ao buscar processo');
    } finally {
      setCarregando(false);
    }
  }, []);

  return {
    resultado,
    carregando,
    erro,
    buscarProcesso
  };
};