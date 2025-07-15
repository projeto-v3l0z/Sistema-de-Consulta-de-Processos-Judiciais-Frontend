'use client';

import { useState, useCallback } from 'react';
import styles from './SearchForm.module.css';
import { processosAPI } from '../../lib/api';
import ProcessCard from './ProcessCard';

/* ───────────── Helpers ───────────── */
const normalizeText = (txt = '') =>
  txt
    .trim()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

const onlyDigits = (v = '') => v.replace(/\D/g, '');
const isEmpty = (v) => !v || v.trim() === '';

/* Detecta o tipo de termo digitado */
const classifyTerm = (term) => {
  const digits = onlyDigits(term);

  /* Número CNJ (formato completo) ou 15‑20 dígitos */
  const cnjRegex = /^\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}$/;
  if (cnjRegex.test(term) || digits.length >= 15) return { field: 'numero', value: term };

  /* CPF */
  if (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(term) || digits.length === 11)
    return { field: 'cpf', value: term };

  /* Caso contrário, trata como nome */
  return { field: 'nome', value: term };
};

/* ─────────── Componente ─────────── */
export default function SearchForm({
  initial = {},
  tribunais = [],
  situacoes = [],
}) {
  const [searchTerm, setSearchTerm] = useState(initial.searchTerm ?? '');
  const [tribunal, setTribunal]     = useState(initial.tribunal ?? '');
  const [situacao, setSituacao]     = useState(initial.situacao ?? '');
  const [fromDate, setFromDate]     = useState(initial.fromDate ?? '');
  const [toDate, setToDate]         = useState(initial.toDate ?? '');

  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro]             = useState(null);

  /* -------- filtro local -------- */
  const filtrarLocal = useCallback(
    (lista, termoClassificado) => {
      if (!termoClassificado) return lista || [];

      const { field, value } = termoClassificado;

      if (field === 'nome') {
        const alvo = normalizeText(value);
        return (lista || []).filter((p) =>
          normalizeText(p.parte_nome).includes(alvo)
        );
      }

      if (field === 'cpf') {
        const alvo = onlyDigits(value);
        return (lista || []).filter(
          (p) => onlyDigits(p.parte_cpf) === alvo
        );
      }

      /* field === 'numero' */
      const alvo = onlyDigits(value);
      return (lista || []).filter(
        (p) => onlyDigits(p.numero_processo ?? p.numero) === alvo
      );
    },
    []
  );

  /* ------------- submit ------------- */
  async function handleSubmit(e) {
    e.preventDefault();

    if (
      [searchTerm, tribunal, situacao, fromDate, toDate].every(isEmpty)
    ) {
      setErro('Digite um termo ou selecione pelo menos um filtro.');
      return;
    }

    setCarregando(true);
    setErro(null);
    setResultados([]);

    try {
      /* Monta filtros para a API */
      const filtros = {
        tribunal,
        situacao,
        data_inicio: fromDate,
        data_fim: toDate,
      };

      const klass = !isEmpty(searchTerm) ? classifyTerm(searchTerm) : null;
      if (klass) filtros[klass.field] = klass.value;

      /* Chama backend */
      const data = await processosAPI.buscarProcessos(filtros);

      /* Aplica filtro local para garantir regra exata */
      setResultados(filtrarLocal(data, klass));
    } catch (err) {
      setErro(err?.message || 'Erro ao buscar processos');
    } finally {
      setCarregando(false);
    }
  }

  /* ------------- UI ------------- */
  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        {/* ÚNICO campo de busca */}
        <div className={styles.inputGroup} style={{ flex: '1 1 100%' }}>
          <label className={styles.label}>
            Número do Processo, CPF ou Nome
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="Digite número CNJ, CPF ou nome"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tribunal + Situação */}
        <div className={styles.row}>
          <div className={styles.col}>
            <label className={styles.label}>Tribunal</label>
            <select
              className={styles.select}
              value={tribunal}
              onChange={(e) => setTribunal(e.target.value)}
            >
              <option value="">Todos</option>
              {tribunais.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
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
              {situacoes.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
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

      {/* Resultados */}
      {carregando && <p>Carregando...</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {!carregando && resultados.length === 0 && !erro && (
        <p style={{ marginTop: 24, color: '#888', textAlign: 'center' }}>
          Nenhum processo encontrado com os critérios.
        </p>
      )}

      {resultados.length > 0 && (
        <div style={{ marginTop: 24 }}>
          {resultados.map((proc) => (
            <ProcessCard
              key={proc.id ?? proc.numero_processo ?? proc.numero}
              process={proc}
            />
          ))}
        </div>
      )}
    </div>
  );
}
