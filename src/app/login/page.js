import Link from 'next/link';
import styles from './login.module.css';

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.subtitle}>Acesse sua conta no SCPJ</p>
        </div>
        
        <form className={styles.form}>
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
            <label htmlFor="password" className={styles.label}>Senha</label>
            <input 
              type="password" 
              id="password" 
              className={styles.input}
              placeholder="••••••••"
              required 
            />
          </div>
          
          <button type="submit" className={styles.submitButton}>
            Entrar
          </button>
        </form>
        
        <div className={styles.links}>
          <Link href="/cadastro" className={styles.link}>
            Não tem uma conta? Cadastre-se
          </Link>
          <Link href="/" className={styles.link}>
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
