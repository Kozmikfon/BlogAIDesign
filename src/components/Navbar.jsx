import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Future';

  useEffect(() => {
    const timeoutIds = [];

    for (let i = 0; i < fullText.length; i++) {
      const timeoutId = setTimeout(() => {
        setTypedText(prev => prev + fullText[i]);
      }, i * 150); // Her harfi 150ms aralıkla yaz
      timeoutIds.push(timeoutId);
    }

    // Temizlik
    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark px-3 py-2"
      style={{
        background: darkMode
          ? 'linear-gradient(90deg, #1e1e1e, #2c2c2c)'
          : 'linear-gradient(90deg, #ff6f00, #ffa000)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }}
    >
      <Link className="navbar-brand fw-bold text-white" to="/" style={{ fontFamily: 'monospace' }}>
        {typedText}
        <span className="blinking-cursor">|</span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center gap-3">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">Anasayfa</Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-sm btn-outline-light" onClick={toggleDarkMode}>
              {darkMode ? '☀️' : '🌙'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
