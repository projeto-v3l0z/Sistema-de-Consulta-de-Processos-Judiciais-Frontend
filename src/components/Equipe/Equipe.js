'use client';

import styles from './Equipe.module.css';
import { useState } from 'react';

// Componente Avatar com fallback mais seguro
function AvatarMembro({ src, alt, fallbackEmoji, nome, hasImage }) {
  const [useEmoji, setUseEmoji] = useState(!hasImage);
  const [debugInfo, setDebugInfo] = useState('');

  // Se não tem imagem configurada, usa emoji direto
  if (!hasImage || useEmoji) {
    return (
      <div className={styles.avatar}>
        <span className={styles.avatarFallback}>
          {fallbackEmoji}
        </span>
        {debugInfo && (
          <div style={{fontSize: '8px', color: 'red', position: 'absolute', bottom: '-20px', left: '0'}}>
            {debugInfo}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.avatar}>
      <img
        src={src}
        alt={alt}
        className={styles.avatarImage}
        onError={(e) => {
          console.log(`Erro ao carregar imagem para ${nome}:`, src);
          console.log('Erro detalhado:', e);
          setDebugInfo('Erro: Imagem não encontrada');
          setUseEmoji(true);
        }}
        onLoad={(e) => {
          console.log(`Imagem carregada com sucesso para ${nome}`);
          console.log('Dimensões:', e.target.naturalWidth, 'x', e.target.naturalHeight);
          if (e.target.naturalWidth === 0) {
            setDebugInfo('Erro: Imagem vazia');
            setUseEmoji(true);
          } else {
            setDebugInfo(`✅ ${e.target.naturalWidth}x${e.target.naturalHeight}`);
          }
        }}
        crossOrigin="anonymous"
        loading="lazy"
      />
      {debugInfo && (
        <div style={{fontSize: '8px', color: 'green', position: 'absolute', bottom: '-20px', left: '0', whiteSpace: 'nowrap'}}>
          {debugInfo}
        </div>
      )}
    </div>
  );
}

const membrosEquipe = [
  {
    id: 1,
    nome: 'Carlos',
    papel: 'Team Leader',
    especialidade: '• Coordenação geral do projeto<br />• Arquitetura e configuração do ambiente de desenvolvimento<br />• Suporte técnico e revisão de código dos demais membros<br />• Resolução de conflitos definição de padrões e boas práticas',
    avatar: '/images/team/carlos.jpg',
    fallbackEmoji: '👨‍💻',
    hasImage: true
  },
  {
    id: 2,
    nome: 'Beatriz',
    papel: 'Full Stack',
    especialidade: '• Desenvolvimento da Tela Inicial e da Página de Pesquisa de Processos<br />• Criação dos endpoints de registro e login de usuários <br />• Criação do endpoint de busca por número de processo <br />• Levantamento e análise das APIs públicas de processos judiciais<br />• Implementação da consulta de processos via integração com APIs externas',
    avatar: '/images/team/beatriz.jpg',
    fallbackEmoji: '👩‍💻',
    hasImage: true
  },
  {
    id: 3,
    nome: 'Arthur',
    papel: 'Full Stack',
    especialidade: '• Desenvolvimento de APIs RESTful com Django REST Framework e Integração com APIs externas <br />• Modelagem de dados e uso do ORM do Django <br />• Utilização de banco de dados relacional (PostgreSQL) <br />• Desenvolvimento de telas com NestJS <br />• Revisão do projeto original, propondo melhorias e correções de arquitetura',
    avatar: '/images/team/arthur.jpg',
    fallbackEmoji: '👨‍💻',
    hasImage: true
  },
  {
    id: 4,
    nome: 'Suzane',
    papel: 'Full Stack',
    especialidade: '• Desenvolvimento de APIs RESTful com Django REST Framework<br />• Integração com APIs Externas<br />• Integração e Mapeamento de Dados com o Front-end',
    avatar: '/images/team/suzane.jpg',
    fallbackEmoji: '👩‍💻',
    hasImage: true
  },
  {
    id: 5,
    nome: 'Lozano',
    papel: 'Desenvolvedor Backend',
    especialidade: '• Subsistema de logs e auditoria implantado no backend<br />• Cache e rate limiting configurados para integrações<br />• Endpoint de detalhes de processo implementado. <br />• Autenticação JWT integrada. <br />• Backend da interface de login desenvolvido',
    avatar: '/images/team/lozano.jpg',
    fallbackEmoji: '👨‍💻',
    hasImage: true
  },
  {
    id: 6,
    nome: 'Lucas',
    papel: 'Desenvolvedor Backend',
    especialidade: '• Subsistema de logs e auditoria implantado no backend.<br />• Cache e rate limiting configurados para integrações.<br />• Endpoint de detalhes de processo implementado.<br />• Autenticação JWT integrada.<br />• Backend da interface de login desenvolvido.',
    avatar: '/images/team/lucas.jpg',
    fallbackEmoji: '👨‍💻',
    hasImage: true
  }
];

export default function Equipe() {
  return (
    <section className={styles.equipeSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.titulo}>Nossa Equipe</h2>
          <p className={styles.descricao}>
            Conheça os profissionais dedicados que desenvolveram este sistema
          </p>
        </div>
        
        <div className={styles.equipeGrid}>
          {membrosEquipe.map((membro) => (
            <div key={membro.id} className={styles.membroCard}>
              <AvatarMembro
                src={membro.avatar}
                alt={`Foto de ${membro.nome}`}
                fallbackEmoji={membro.fallbackEmoji}
                nome={membro.nome}
                hasImage={membro.hasImage}
              />
              <div className={styles.membroInfo}>
                <h3 className={styles.nome}>{membro.nome}</h3>
                <p className={styles.papel}>{membro.papel}</p>
                <div 
                  className={styles.especialidade}
                  dangerouslySetInnerHTML={{ __html: membro.especialidade }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
