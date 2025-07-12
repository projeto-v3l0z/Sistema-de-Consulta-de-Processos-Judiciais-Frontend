'use client';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <h2>V3LOZ</h2>
            <span>Sistema de Consulta</span>
          </Link>
        </div>
        
        <ul className={styles.navMenu}>
          <li>
            <Link href="/" className={styles.navLink}>
              Início
            </Link>
          </li>
          <li>
            <Link href="/login" className={styles.navLink}>
              Login
            </Link>
          </li>
          <li>
            <Link href="/cadastro" className={styles.navLink}>
              Cadastro
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
