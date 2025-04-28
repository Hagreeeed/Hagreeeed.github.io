// src/components/Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="header-content">
        <div className="logo-section">
          <Link to="/" className="logo">
            <img src={logo} alt="Логотип сайту" />
          </Link>
          <h1>Мої цілі</h1>
        </div>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/">Мої цілі</Link></li>
            <li><Link to="/progress">Прогрес</Link></li>
            <li><Link to="/community">Спільнота</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="btn-login">Увійти</button>
          <button className="btn-signup">Зареєструватися</button>
        </div>

        <button className="burger" aria-label="Відкрити меню" onClick={toggleMenu}>
          ☰
        </button>

        <div className="floating-buttons">
          <button className="floating-button">+</button>
          <button className="floating-button">⚙</button>
        </div>
      </div>
    </header>
  );
};

export default Header;