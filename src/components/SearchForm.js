'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchForm({ initial = {}, tribunais = [], situacoes = [] }) {
  const router = useRouter();

  const [query, setQuery] = useState(initial.query || '');
  const [tribunal, setTribunal] = useState(initial.tribunal || '');
  const [situacao, setSituacao] = useState(initial.situacao || '');
  const [fromDate, setFromDate] = useState(initial.fromDate || '');
  const [toDate, setToDate] = useState(initial.toDate || '');

  function handleSubmit(e) {
    e.preventDefault();
    const qp = { query, tribunal, situacao, fromDate, toDate };
    const qs = new URLSearchParams(qp).toString();
    router.push(`/search?${qs}`);
  }

  return (
    <div className="card shadow-sm rounded p-4">
      <form onSubmit={handleSubmit}>
        {/* Campo principal */}
        <div className="mb-3">
          <label className="form-label">Processo | CPF | CNPJ</label>
          <input
            type="text"
            className="form-control w-100"
            style={{ width: '90%' }}
            placeholder="Digite número do processo, CPF ou CNPJ"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Tribunal e Situação */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Tribunal</label>
            <select
              className="form-select"
              value={tribunal}
              onChange={(e) => setTribunal(e.target.value)}
            >
              <option value="">Todos</option>
              {tribunais.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Situação</label>
            <select
              className="form-select"
              value={situacao}
              onChange={(e) => setSituacao(e.target.value)}
            >
              <option value="">Todas</option>
              {situacoes.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Período */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">De</label>
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Até</label>
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-primary">
            Pesquisar
          </button>
        </div>
      </form>
    </div>
  );
}
