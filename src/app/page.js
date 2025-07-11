'use client';

import SearchForm from '../components/SearchForm';

export default function Home() {
  // testes
  const tribunais = [
    { value: 'TJ-SP', label: 'TJ-SP' },
    { value: 'TRF-3', label: 'TRF-3' },
    { value: 'STJ',   label: 'STJ'   },
  ];
  const situacoes = [
    { value: 'Ativo',    label: 'Ativo'    },
    { value: 'Arquivado',label: 'Arquivado'},
    { value: 'Julgado',  label: 'Julgado'  },
  ];

  return (
    <>
      <h1 className="mb-4">Bem‑vindo ao Sistema de Processos</h1>
      <SearchForm tribunais={tribunais} situacoes={situacoes} />
    </>
  );
}
