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
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        padding: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontSize: '20px',
        fontWeight: 'bold'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
      aria-label="Voltar ao topo"
    >
      ↑
    </button>
  ) : null;
}
