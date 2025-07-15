'use client';

import { useState } from 'react';
import styles from './ProcessCard.module.css';

export default function ProcessCard({ process }) {
    const [open, setOpen] = useState(false);

    // Mapeamento dos campos do backend
    const numero = process.numero || process.numero_processo || 'N/A';
    const documento = process.documento || process.parte_cpf || process.cnpj || 'N/A';
    const situacao = process.situacao || process.situacao_atual || 'N/A';
    const tribunal = process.tribunal || 'N/A';
    const dataAbertura = process.dataAbertura || process.data_distribuicao || '';
    const partes = process.partes || process.parte_nome || 'N/A';
    const valor = process.valor || process.valor_causa || 'N/A';
    const classe = process.classe_processual || 'N/A';
    const assunto = process.assunto || 'N/A';
    const orgao = process.orgao_julgador || 'N/A';

    const getStatusClass = (sit) => {
        const statusMap = {
            'Em Andamento': 'andamento',
            'Julgado': 'julgado',
            'Suspenso': 'suspenso',
            'Arquivado': 'arquivado',
            'Aguardando Julgamento': 'aguardando',
            'CIT': 'andamento',
            'PRE': 'andamento',
            'N/A': 'andamento'
        };
        return statusMap[sit] || 'andamento';
    };

    return (
        <div className={styles.processCard}>
            <div className={styles.cardHeader}>
                <div className={styles.cardInfo}>
                    <h4 className={styles.cardTitle}>
                        <span role="img" aria-label="Pessoa">👤</span> {partes}
                    </h4>
                    <h5 className={styles.detailText}>
                        <span role="img" aria-label="Processo">📄</span> {numero}
                    </h5>
                    <div className={styles.cardMetaRow}>
                        <div className={styles.cardMetaItem}>
                            <span className={styles.metaLabel}>CPF:</span>
                            <span className={styles.metaValue}>{documento}</span>
                        </div>
                        <div className={styles.cardMetaItem}>
                            <span className={styles.metaLabel}>Status:</span>
                            <span className={`${styles.statusBadge} ${styles[getStatusClass(situacao)]}`}>
                                {situacao}
                            </span>
                        </div>
                        <div className={styles.cardMetaItem}>
                            <span className={styles.metaLabel}>Tribunal:</span>
                            <span className={styles.metaValue}>{tribunal}</span>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className={styles.expandButton}
                    onClick={() => setOpen(!open)}
                    aria-label={open ? 'Recolher detalhes' : 'Mostrar detalhes'}
                    data-expanded={open}
                >
                    {open ? 'Ocultar detalhes' : 'Ver detalhes'}
                </button>
            </div>
            {open && (
                <div className={styles.cardDetails}>
                    <p className={styles.detailText}>
                        <strong>Data de Abertura:</strong>{' '}
                        {dataAbertura ? new Date(dataAbertura).toLocaleDateString('pt-BR') : 'N/A'}
                    </p>
                    <p className={styles.detailText}>
                        <strong>Classe:</strong> {classe}
                    </p>
                    <p className={styles.detailText}>
                        <strong>Assunto:</strong> {assunto}
                    </p>
                    <p className={styles.detailText}>
                        <strong>Órgão Julgador:</strong> {orgao}
                    </p>
                    <p className={styles.detailText}>
                        <strong>Valor:</strong> {valor}
                    </p>
                </div>
            )}
        </div>
    );
}