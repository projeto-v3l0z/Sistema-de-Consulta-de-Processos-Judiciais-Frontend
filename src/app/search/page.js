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
      {
        id: 3,
        numero: '0003-23.2025.8.26.0100',
        documento: '13.345.678/0001-99',
        situacao: 'Arquivado',
        tribunal: 'TRF-3',
        dataAbertura: '2024-02-10',
        partes: 'Empresa F vs Empresa Y',
        valor: 'R$ 10.000,00',
      },
      {
        id: 4,
        numero: '0004-23.2025.8.26.0100',
        documento: '421.456.789-00',
        situacao: 'Ativo',
        tribunal: 'TJ-SP',
        dataAbertura: '2025-02-15',
        partes: 'Fulano vs Ciclano',
        valor: 'R$ 2.000,00',
      },
      {
        "id": 5,
        "numero": "0005-12.2025.8.19.0001",
        "documento": "123.456.789-01",
        "situacao": "Pendente",
        "tribunal": "TJ-RJ",
        "dataAbertura": "2025-03-20",
        "partes": "Empresa A vs. Empresa B",
        "valor": "R$ 15.500,00"
      },
      {
        "id": 6,
        "numero": "0006-45.2025.8.13.0024",
        "documento": "987.654.321-02",
        "situacao": "Ativo",
        "tribunal": "TJ-MG",
        "dataAbertura": "2025-01-10",
        "partes": "João Silva vs. Maria Oliveira",
        "valor": "R$ 5.800,00"
      },
      {
        "id": 7,
        "numero": "0007-88.2025.8.06.0001",
        "documento": "456.789.123-03",
        "situacao": "Concluído",
        "tribunal": "TJ-CE",
        "dataAbertura": "2024-11-01",
        "partes": "Prefeitura Municipal vs. Construtora XPTO",
        "valor": "R$ 50.000,00"
      },
      {
        "id": 8,
        "numero": "0008-33.2025.8.21.0001",
        "documento": "321.654.987-04",
        "situacao": "Arquivado",
        "tribunal": "TJ-RS",
        "dataAbertura": "2024-09-25",
        "partes": "Banco XYZ vs. Cliente A",
        "valor": "R$ 3.200,00"
      },
      {
        "id": 9,
        "numero": "0009-77.2025.8.04.0001",
        "documento": "789.123.456-05",
        "situacao": "Ativo",
        "tribunal": "TJ-AM",
        "dataAbertura": "2025-04-05",
        "partes": "Indivíduo X vs. Seguradora Y",
        "valor": "R$ 22.500,00"
      },
      {
        "id": 10,
        "numero": "0010-01.2025.8.07.0001",
        "documento": "654.321.789-06",
        "situacao": "Pendente",
        "tribunal": "TJ-DF",
        "dataAbertura": "2025-02-28",
        "partes": "Ministério Público vs. Réu Z",
        "valor": "R$ 0,00"
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