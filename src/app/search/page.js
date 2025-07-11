'use client';

import SearchForm from '../../components/SearchForm';
import ProcessCard from '../../components/ProcessCard';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const params = useSearchParams();
  const qp = {
    query: params.get('query') || '',
    tribunal: params.get('tribunal') || '',
    situacao: params.get('situacao') || '',
    fromDate: params.get('fromDate') || '',
    toDate: params.get('toDate') || '',
  };

  const [results, setResults] = useState([]);

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        numero: '0001-23.2025.8.26.0100',
        documento: '123.456.789-00',
        situacao: 'Ativo',
        tribunal: 'TJ-SP',
        dataAbertura: '2025-01-15',
        partes: 'Fulano vs Beltrano',
        valor: 'R$ 1.000,00',
      },
      {
        id: 2,
        numero: '0002-23.2025.8.26.0100',
        documento: '12.345.678/0001-99',
        situacao: 'Arquivado',
        tribunal: 'TRF-3',
        dataAbertura: '2025-02-10',
        partes: 'Empresa X vs Empresa Y',
        valor: 'R$ 5.000,00',
      },
    ];

    let filtrados = mockData;

    // Filtro por query
    if (qp.query) {
      const termo = qp.query.toLowerCase();
      filtrados = filtrados.filter(
        (proc) =>
          proc.numero.toLowerCase().includes(termo) ||
          proc.documento.toLowerCase().includes(termo)
      );
    }

    // Filtro por tribunal
    if (qp.tribunal) {
      filtrados = filtrados.filter((proc) => proc.tribunal === qp.tribunal);
    }

    // Filtro por situação
    if (qp.situacao) {
      filtrados = filtrados.filter((proc) => proc.situacao === qp.situacao);
    }

    // Filtro por data (de / até)
    if (qp.fromDate) {
      const from = new Date(qp.fromDate);
      filtrados = filtrados.filter((proc) => new Date(proc.dataAbertura) >= from);
    }

    if (qp.toDate) {
      const to = new Date(qp.toDate);
      filtrados = filtrados.filter((proc) => new Date(proc.dataAbertura) <= to);
    }

    setResults(filtrados);
  }, [params.toString()]);

  const tribunais = [
    { value: 'TJ-SP', label: 'TJ-SP' },
    { value: 'TRF-3', label: 'TRF-3' },
    { value: 'STJ', label: 'STJ' },
  ];
  const situacoes = [
    { value: 'Ativo', label: 'Ativo' },
    { value: 'Arquivado', label: 'Arquivado' },
    { value: 'Julgado', label: 'Julgado' },
  ];

  return (
    <>
      <h2 className="mb-4">Resultados da Pesquisa</h2>
      <SearchForm initial={qp} tribunais={tribunais} situacoes={situacoes} />
      <div className="mt-4">
        {results.length === 0 ? (
          <p>Nenhum processo encontrado.</p>
        ) : (
          results.map((proc) => <ProcessCard key={proc.id} process={proc} />)
        )}
      </div>
    </>
  );
}
