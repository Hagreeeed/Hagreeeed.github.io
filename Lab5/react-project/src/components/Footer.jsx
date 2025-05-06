// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import facebook from '/facebook.png';
import instagram from '/instagram.png';
import linkedin from '/linkedin.png';
import youtube from '/youtube.png';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Мої цілі</h3>
          <p>Ми працюємо для вашого майбутнього. Разом до великих перемог!</p>
        </div>
        
        <div className="footer-section">
          <h3>Контакти</h3>
          <ul>
            <li><i className="fas fa-map-marker-alt"></i> м. Київ, вул. Прикладна, 123</li>
            <li><i className="fas fa-phone"></i> +380 12 345 67 89</li>
            <li><i className="fas fa-envelope"></i> info@moitsili.com</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Швидкі посилання</h3>
          <ul>
            <li><Link to="/">Головна</Link></li>
            <li><a href="#">Про нас</a></li>
            <li><a href="#">Послуги</a></li>
            <li><a href="#">Контакти</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Соціальні мережі</h3>
          <div className="social-links">
            <a href="#"><img src={facebook} alt="Facebook" /></a>
            <a href="#"><img src={instagram} alt="Instagram" /></a>
            <a href="#"><img src={linkedin} alt="LinkedIn" /></a>
            <a href="#"><img src={youtube} alt="YouTube" /></a>
          </div>
          <div className="newsletter">
            <input type="email" placeholder="Ваш email" />
            <button>Підписатись</button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Мої цілі. Усі права захищені. | <a href="#">Політика конфіденційності</a> | <a href="#">Умови використання</a></p>
      </div>
    </footer>
  );
};

export default Footer;