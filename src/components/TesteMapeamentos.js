// Componente apenas para testar a exibição de mapeamentos

'use client';
import { useMapeamentos } from '../hooks/useMapeamentos';

export const TesteMapeamentos = () => {
  const { mapeamentos, loading, error } = useMapeamentos();

  if (loading) return <div>Carregando mapeamentos...</div>;
  if (error) return <div>Erro: {error}</div>;

return (
<div>
    <h1>Mapeamentos</h1>
    {mapeamentos ? (
        <div>
            <h2>Classes Processuais</h2>
            {mapeamentos.classes ? (
                <ul>
                    {Object.entries(mapeamentos.classes).map(([id, nome]) => (
                        <li key={id}>
                            {nome}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhuma classe processual encontrada.</p>
            )}
            <h2>Movimentos</h2>
            {mapeamentos.movimentos ? (
                <ul>
                    {Object.entries(mapeamentos.movimentos).map(([id, nome]) => (
                        <li key={id}>
                            {nome}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum movimento encontrado.</p>
            )}
            <h2>Formatos</h2>
            {mapeamentos.formatos ? (
                <ul>
                    {Object.entries(mapeamentos.formatos).map(([id, nome]) => (
                        <li key={id}>
                            {nome}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum formato encontrado.</p>
            )}
        </div>
    ) : (
        <p>Nenhum mapeamento encontrado.</p>
    )}
</div>
);
};