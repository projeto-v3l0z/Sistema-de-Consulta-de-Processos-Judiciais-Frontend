// Hook para buscar e gerenciar mapeamentos

import { useState, useEffect } from 'react';

export const useMapeamentos = () => {
  const [mapeamentos, setMapeamentos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMapeamentos = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/processos/mapeamentos/');
        if (!response.ok) throw new Error('Erro ao buscar mapeamentos'); 
        const data = await response.json(); 
        setMapeamentos(data);
      } catch (err) {
        setError(err.message);
        console.error('Erro ao buscar mapeamentos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMapeamentos();
  }, []);

  return { mapeamentos, loading, error };
};