'use client';

import { useState } from 'react';

export default function ProcessCard({ process }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="card-title mb-1">{process.numero}</h5>
                    <p className="card-text mb-0">
                        <strong>Doc:</strong> {process.documento}
                    </p>
                    <p className="card-text">
                        <strong>Status:</strong> {process.situacao}
                    </p>
                </div>
                <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => setOpen(!open)}
                    aria-label={open ? 'Recolher detalhes' : 'Mostrar detalhes'}
                >
                    <i className={`bi ${open ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
                </button>
            </div>
            {open && (
                <div className="card-body border-top">
                    <p className="mb-1">
                        <strong>Tribunal:</strong> {process.tribunal}
                    </p>
                    <p className="mb-1">
                        <strong>Data de Abertura:</strong>{' '}
                        {new Date(process.dataAbertura).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="mb-1">
                        <strong>Partes:</strong> {process.partes}
                    </p>
                    <p className="mb-0">
                        <strong>Valor:</strong> {process.valor}
                    </p>
                </div>
            )}
        </div>
    );
}
