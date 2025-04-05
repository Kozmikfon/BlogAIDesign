import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ darkMode, toggleDarkMode }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4" style={{
    background: darkMode
      ? 'linear-gradient(90deg, #212121, #424242)'
      : 'linear-gradient(90deg, #0d47a1, #1976d2)',
  }}>
    <Link className="navbar-brand fw-bold text-white" to="/">🤖 Future</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto align-items-center gap-3">
        <li className="nav-item">
          <Link className="nav-link" to="/">Anasayfa</Link>
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

export default Navbar;
