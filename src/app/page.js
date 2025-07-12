import Navbar from '../components/Navbar/Navbar';
import ApresentacaoProjeto from '../components/ApresentacaoProjeto/ApresentacaoProjeto';
import SearchForm from '../components/BuscaCentral/SearchForm';
import BackToTopButton from '../components/BuscaCentral/BackToTopButton';
import Equipe from '../components/Equipe/Equipe';
import styles from "./page.module.css";


export default function Home() {
  // Dados simulados para os filtros do SearchForm
  const tribunais = [
    { value: 'tjsp', label: 'TJ-SP' },
    { value: 'tjrj', label: 'TJ-RJ' },
    { value: 'tjmg', label: 'TJ-MG' },
    { value: 'stf', label: 'STF' },
    { value: 'stj', label: 'STJ' }
  ];

  const situacoes = [
    { value: 'andamento', label: 'Em Andamento' },
    { value: 'suspenso', label: 'Suspenso' },
    { value: 'arquivado', label: 'Arquivado' },
    { value: 'julgado', label: 'Julgado' },
    { value: 'aguardando', label: 'Aguardando Julgamento' }
  ];

  return (
    <div className={styles.page}>
      <Navbar />
      
      <ApresentacaoProjeto />
      
      <main className={styles.main}>
        {/* Busca Principal - Formulário com filtros para pesquisa de processos */}
        <section className={styles.searchSection}>
          <div className={styles.sectionHeader}>
            <h2>Consulta de Processos Judiciais</h2>
            <p>Digite o número do processo, CPF, CNPJ ou use filtros específicos para refinar sua pesquisa</p>
          </div>
          <SearchForm 
            tribunais={tribunais}
            situacoes={situacoes}
          />
        </section>
      </main>
      
      <Equipe />
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2025 V3L0Z. Todos os direitos reservados.</p>
          <div className={styles.footerLinks}>
            <a href="#privacidade">Política de Privacidade</a>
            <a href="#termos">Termos de Uso</a>
            <a href="#contato">Contato</a>
          </div>
        </div>
      </footer>
      
      {/* Botão de voltar ao topo */}
      <BackToTopButton />
    </div>
  );
}
