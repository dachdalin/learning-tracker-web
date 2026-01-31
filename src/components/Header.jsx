import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ isDarkMode, onToggleTheme }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="header-logo">
          <span className="header-logo-icon">📚</span>
          <span>Learning Tracker</span>
        </Link>
        
        <nav className="header-nav">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/add" 
            className={`nav-link ${isActive('/add') ? 'active' : ''}`}
          >
            Add New
          </Link>
          <button 
            className="theme-toggle" 
            onClick={onToggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;