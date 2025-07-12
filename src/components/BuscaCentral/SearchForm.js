'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchForm.module.css';

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
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        {/* Campo principal */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Processo | CPF | CNPJ</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Digite número do processo, CPF ou CNPJ"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Tribunal e Situação */}
        <div className={styles.row}>
          <div className={styles.col}>
            <label className={styles.label}>Tribunal</label>
            <select
              className={styles.select}
              value={tribunal}
              onChange={(e) => setTribunal(e.target.value)}
            >
              <option value="">Todos</option>
              {tribunais.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div className={styles.col}>
            <label className={styles.label}>Situação</label>
            <select
              className={styles.select}
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
        <div className={styles.row}>
          <div className={styles.col}>
            <label className={styles.label}>De</label>
            <input
              type="date"
              className={styles.input}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className={styles.col}>
            <label className={styles.label}>Até</label>
            <input
              type="date"
              className={styles.input}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            🔍 Pesquisar
          </button>
        </div>
      </form>
    </div>
  );
}
