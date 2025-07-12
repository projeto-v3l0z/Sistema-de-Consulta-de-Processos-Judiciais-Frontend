import Link from 'next/link';
import styles from './cadastro.module.css';

export default function Cadastro() {
  return (
    <div className={styles.container}>
      <div className={styles.cadastroCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Cadastro</h1>
          <p className={styles.subtitle}>Crie sua conta no SCPJ</p>
        </div>
        
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="nome" className={styles.label}>Nome Completo</label>
            <input 
              type="text" 
              id="nome" 
              className={styles.input}
              placeholder="Seu nome completo"
              required 
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>E-mail</label>
            <input 
              type="email" 
              id="email" 
              className={styles.input}
              placeholder="seu@email.com"
              required 
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="cpf" className={styles.label}>CPF</label>
            <input 
              type="text" 
              id="cpf" 
              className={styles.input}
              placeholder="000.000.000-00"
              required 
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Senha</label>
            <input 
              type="password" 
              id="password" 
              className={styles.input}
              placeholder="••••••••"
              required 
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirmar Senha</label>
            <input 
              type="password" 
              id="confirmPassword" 
              className={styles.input}
              placeholder="••••••••"
              required 
            />
          </div>
          
          <button type="submit" className={styles.submitButton}>
            Criar Conta
          </button>
        </form>
        
        <div className={styles.links}>
          <Link href="/login" className={styles.link}>
            Já tem uma conta? Faça login
          </Link>
          <Link href="/" className={styles.link}>
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
