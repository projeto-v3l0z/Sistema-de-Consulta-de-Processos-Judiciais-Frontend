'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4 rounded">
      <div className="container-fluid">
        
        <Link className="navbar-brand fw-bold" href="/">
          V3L0Z
        </Link>

        
        <div className="d-flex">
          <Link href="/login" className="nav-link px-3">
            Login
          </Link>
          <Link href="/cadastro" className="nav-link px-3">
            Cadastro
          </Link>
        </div>
      </div>
    </nav>
  );
}
