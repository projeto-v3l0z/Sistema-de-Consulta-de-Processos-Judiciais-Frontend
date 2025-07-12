'use client';

import { useState } from 'react';
import styles from './ProcessCard.module.css';

export default function ProcessCard({ process }) {
    const [open, setOpen] = useState(false);

    const getStatusClass = (situacao) => {
        const statusMap = {
            'Em Andamento': 'andamento',
            'Julgado': 'julgado',
            'Suspenso': 'suspenso',
            'Arquivado': 'arquivado',
            'Aguardando Julgamento': 'aguardando'
        };
        return statusMap[situacao] || 'andamento';
    };

    return (
        <div className={styles.processCard}>
            <div className={styles.cardHeader}>
                <div className={styles.cardInfo}>
                    <h5 className={styles.cardTitle}>{process.numero}</h5>
                    <p className={styles.cardText}>
                        <strong>Doc:</strong> {process.documento}
                    </p>
                    <p className={styles.cardText}>
                        <strong>Status:</strong> 
                        <span className={`${styles.statusBadge} ${styles[getStatusClass(process.situacao)]}`}>
                            {process.situacao}
                        </span>
                    </p>
                </div>
                <button
                    type="button"
                    className={styles.expandButton}
                    onClick={() => setOpen(!open)}
                    aria-label={open ? 'Recolher detalhes' : 'Mostrar detalhes'}
                    data-expanded={open}
                >
                    <span className={styles.expandIcon}>
                        {open ? '−' : '+'}
                    </span>
                </button>
            </div>
            {open && (
                <div className={styles.cardDetails}>
                    <p className={styles.detailText}>
                        <strong>Tribunal:</strong> {process.tribunal}
                    </p>
                    <p className={styles.detailText}>
                        <strong>Data de Abertura:</strong>{' '}
                        {new Date(process.dataAbertura).toLocaleDateString('pt-BR')}
                    </p>
                    <p className={styles.detailText}>
                        <strong>Partes:</strong> {process.partes}
                    </p>
                    <p className={styles.detailText}>
                        <strong>Valor:</strong> {process.valor}
                    </p>
                </div>
            )}
        </div>
    );
}
