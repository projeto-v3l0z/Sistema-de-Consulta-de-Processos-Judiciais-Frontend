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
      // Validação básica do formato do número do processo
      const numeroLimpo = numeroProcesso.replace(/[^0-9.-]/g, '');
      
      if (numeroLimpo.length < 10) {
        throw new Error('Número do processo deve ter pelo menos 10 caracteres');
      }

      // Tentar buscar na API real primeiro
      let dados;
      try {
        dados = await processosAPI.buscarPorNumero(numeroLimpo);
      } catch (apiError) {
        console.log('API não disponível, usando dados simulados:', apiError.message);
        
        // Fallback para dados simulados
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (numeroLimpo.includes('404')) {
          throw new Error('Processo não encontrado');
        }
        
        dados = {
          numero: numeroLimpo,
          status: 'Em andamento',
          vara: '1ª Vara Cível de São Paulo',
          assunto: 'Ação de Cobrança',
          dataDistribuicao: '15/06/2024',
          ultimaMovimentacao: '10/12/2024',
          situacao: 'Ativo',
          valor: 'R$ 15.000,00',
          partes: {
            requerente: 'João Silva Santos',
            requerido: 'Empresa XYZ Ltda'
          },
          advogados: {
            requerente: 'Dr. Pedro Oliveira - OAB/SP 123456',
            requerido: 'Dra. Maria Costa - OAB/SP 654321'
          },
          movimentacoes: [
            {
              data: '10/12/2024',
              descricao: 'Juntada de petição pela parte requerente'
            },
            {
              data: '05/12/2024',
              descricao: 'Designada audiência de conciliação'
            },
            {
              data: '01/12/2024',
              descricao: 'Contestação apresentada pela parte requerida'
            }
          ]
        };
      }

      setResultado(dados);
    } catch (error) {
      console.error('Erro ao buscar processo:', error);
      setErro(error.message || 'Erro ao buscar processo');
    } finally {
      setCarregando(false);
    }
  }, []);

  const limparResultados = useCallback(() => {
    setResultado(null);
    setErro(null);
  }, []);

  return {
    resultado,
    carregando,
    erro,
    buscarProcesso,
    limparResultados
  };
};
