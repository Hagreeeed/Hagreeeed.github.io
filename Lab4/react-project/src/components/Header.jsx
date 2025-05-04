// src/components/Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Помилка при виході:', error);
    }
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

        <nav className="nav-menu">
          <ul>
            <li><Link to="/">Мої цілі</Link></li>
            <li><Link to="/progress">Прогрес</Link></li>
            <li><Link to="/community">Спільнота</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          {currentUser ? (
            <button className="btn-logout" onClick={handleLogout}>
              Вийти
            </button>
          ) : (
            <>
              <Link to="/login" className="btn-login">Увійти</Link>
              <Link to="/register" className="btn-signup">Зареєструватися</Link>
            </>
          )}
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