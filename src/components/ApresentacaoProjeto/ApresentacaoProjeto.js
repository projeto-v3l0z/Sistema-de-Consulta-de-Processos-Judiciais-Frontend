import styles from './ApresentacaoProjeto.module.css';

export default function ApresentacaoProjeto() {
  return (
    <section className={styles.apresentacaoSection}>
      <div className={styles.container}>
        <div className={styles.conteudo}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>⚖️</span>
              <h1 className={styles.nomeSistema}>V3LOZ</h1>
            </div>
            <p className={styles.subtitulo}>Sistema de Consulta de Processos Judiciais</p>
          </div>
          
          <div className={styles.descricaoContainer}>
            <h2 className={styles.titulo}>Sobre o Projeto</h2>
            <p className={styles.descricao}>
              O <strong>Sistema de Consulta de Processos Judiciais da V3LOZ</strong> é uma plataforma 
              moderna e intuitiva desenvolvida para facilitar a consulta de informações sobre 
              processos judiciais de forma rápida e eficiente.
            </p>
            
            <div className={styles.objetivos}>
              <h3 className={styles.subtitulo2}>Nossos Objetivos:</h3>
              <ul className={styles.lista}>
                <li>✅ Democratizar o acesso às informações judiciais</li>
                <li>🚀 Proporcionar consultas rápidas e precisas</li>
                <li>🔒 Garantir segurança e confiabilidade dos dados</li>
                <li>📱 Oferecer uma interface moderna e responsiva</li>
                <li>🎯 Simplificar o acompanhamento processual</li>
              </ul>
            </div>
            
            <div className={styles.tecnologias}>
              <h3 className={styles.subtitulo2}>Tecnologias Utilizadas:</h3>
              <div className={styles.techGrid}>
                <span className={styles.techItem}>Python</span>
                <span className={styles.techItem}>Django 5.2.1</span>
                <span className={styles.techItem}>Django REST Framework</span>
                <span className={styles.techItem}>PostgreSQL 15</span>
                <span className={styles.techItem}>Swagger (drf-yasg)</span>
                <span className={styles.techItem}>Docker + Docker Compose</span>
                <span className={styles.techItem}>React</span>
                <span className={styles.techItem}>Next.js</span>
                <span className={styles.techItem}>Node.js</span>
                <span className={styles.techItem}>Axios</span>
                <span className={styles.techItem}>CSS Modules</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
