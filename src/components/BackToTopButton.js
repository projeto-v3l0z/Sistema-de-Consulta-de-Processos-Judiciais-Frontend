'use client';
import { useEffect, useState } from 'react';

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      className="btn btn-primary position-fixed"
      style={{
        bottom: '20px',
        right: '20px',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        padding: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
      }}
      aria-label="Voltar ao topo"
    >
      <i className="bi bi-arrow-up-short fs-4"></i>
    </button>
  ) : null;
}
