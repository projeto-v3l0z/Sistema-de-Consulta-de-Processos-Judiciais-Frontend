'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar/Navbar';
import SearchForm from '../../components/BuscaCentral/SearchForm';
import ProcessCard from '../../components/BuscaCentral/ProcessCard';
import BackToTopButton from '../../components/BuscaCentral/BackToTopButton';
import styles from './search.module.css';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dados simulados para os filtros
  const tribunais = [
    { value: 'tjsp', label: 'TJ-SP' },
    { value: 'tjrj', label: 'TJ-RJ' },
    { value: 'tjmg', label: 'TJ-MG' },
    { value: 'stf', label: 'STF' },
    { value: 'stj', label: 'STJ' }
  ];

  const situacoes = [
    { value: 'andamento', label: 'Em Andamento' },
    { value: 'suspenso', label: 'Suspenso' },
    { value: 'arquivado', label: 'Arquivado' },
    { value: 'julgado', label: 'Julgado' },
    { value: 'aguardando', label: 'Aguardando Julgamento' }
  ];

  // Obter parâmetros da URL
  const searchValues = {
    query: searchParams.get('query') || '',
    tribunal: searchParams.get('tribunal') || '',
    situacao: searchParams.get('situacao') || '',
    fromDate: searchParams.get('fromDate') || '',
    toDate: searchParams.get('toDate') || ''
  };

  useEffect(() => {
    const searchProcesses = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulação de chamada API - substitua pela sua API real
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Dados simulados de processos
        const mockProcesses = [
          {
            id: 1,
            numero: '1234567-89.2024.8.26.0001',
            documento: '123.456.789-10',
            situacao: 'Em Andamento',
            tribunal: 'TJ-SP',
            dataAbertura: '2024-06-15',
            partes: 'João Silva vs Empresa XYZ Ltda',
            valor: 'R$ 50.000,00'
          },
          {
            id: 2,
            numero: '2345678-90.2024.8.26.0002',
            documento: '987.654.321-00',
            situacao: 'Julgado',
            tribunal: 'TJ-SP',
            dataAbertura: '2024-05-20',
            partes: 'Maria Santos vs ABC Comércio',
            valor: 'R$ 25.000,00'
          },
          {
            id: 3,
            numero: '3456789-01.2024.8.26.0003',
            documento: '11.222.333/0001-44',
            situacao: 'Suspenso',
            tribunal: 'TJ-RJ',
            dataAbertura: '2024-07-10',
            partes: 'Empresa DEF vs Fornecedor GHI',
            valor: 'R$ 100.000,00'
          },
          {
            id: 4,
            numero: '4567890-12.2024.8.26.0004',
            documento: '555.666.777-88',
            situacao: 'Arquivado',
            tribunal: 'TJ-MG',
            dataAbertura: '2024-04-01',
            partes: 'Pedro Oliveira vs Seguradora JKL',
            valor: 'R$ 15.000,00'
          }
        ];

        // Filtrar os processos baseado nos parâmetros de busca
        let filteredProcesses = mockProcesses;

        if (searchValues.query) {
          filteredProcesses = filteredProcesses.filter(p => 
            p.numero.includes(searchValues.query) || 
            p.documento.includes(searchValues.query) ||
            p.partes.toLowerCase().includes(searchValues.query.toLowerCase())
          );
        }

        if (searchValues.tribunal) {
          filteredProcesses = filteredProcesses.filter(p => 
            p.tribunal.toLowerCase().includes(searchValues.tribunal.toLowerCase())
          );
        }

        if (searchValues.situacao) {
          filteredProcesses = filteredProcesses.filter(p => 
            p.situacao.toLowerCase().includes(searchValues.situacao.toLowerCase())
          );
        }

        setProcesses(filteredProcesses);
      } catch (err) {
        setError('Erro ao buscar processos. Tente novamente.');
        console.error('Erro na busca:', err);
      } finally {
        setLoading(false);
      }
    };

    if (searchValues.query || searchValues.tribunal || searchValues.situacao) {
      searchProcesses();
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  return (
    <div className={styles.page}>
      <Navbar />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Resultados da Pesquisa</h1>
          <p>Encontre processos judiciais utilizando os filtros abaixo</p>
        </div>

        {/* Formulário de busca */}
        <div className={styles.searchFormContainer}>
          <SearchForm 
            initial={searchValues}
            tribunais={tribunais}
            situacoes={situacoes}
          />
        </div>

        {/* Resultados */}
        <div className={styles.resultsContainer}>
          {loading && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Buscando processos...</p>
            </div>
          )}

          {error && (
            <div className={styles.error}>
              <h3>❌ {error}</h3>
              <p>Verifique os parâmetros de busca e tente novamente.</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className={styles.resultsHeader}>
                <h2>
                  {processes.length > 0 
                    ? `${processes.length} processo(s) encontrado(s)` 
                    : 'Nenhum processo encontrado'
                  }
                </h2>
                
                {searchValues.query && (
                  <p>Resultados para: <strong>"{searchValues.query}"</strong></p>
                )}
              </div>

              <div className={styles.processList}>
                {processes.length > 0 ? (
                  processes.map(process => (
                    <ProcessCard key={process.id} process={process} />
                  ))
                ) : (
                  <div className={styles.noResults}>
                    <h3>🔍 Nenhum processo encontrado</h3>
                    <p>Tente ajustar os filtros de busca ou utilize termos diferentes.</p>
                    <ul>
                      <li>Verifique a ortografia dos termos de busca</li>
                      <li>Tente usar palavras-chave mais genéricas</li>
                      <li>Remova alguns filtros para ampliar a busca</li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <BackToTopButton />
    </div>
  );
}
