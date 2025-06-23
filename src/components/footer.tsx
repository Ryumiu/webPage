import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Mundo Animal</h3>
          <p className="slogan">Cuidando a tus mejores amigos con amor y profesionalismo</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Síguenos en Facebook">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Síguenos en Instagram">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://wa.me/59112345678" target="_blank" rel="noopener noreferrer" title="Contáctanos por WhatsApp">
              <FaWhatsapp className="social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Información de Contacto</h4>
          <ul className="contact-info">
            <li><FaMapMarkerAlt /> Av. América E-0123, Cochabamba, Bolivia</li>
            <li><FaPhone /> +591 12345678</li>
            <li><FaEnvelope /> contacto@mundoanimal.com</li>
            <li><FaClock /> Lunes a Sábado: 9:00 - 19:00</li>
            <li className="emergency-text">Emergencias 24/7: +591 12345679</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Servicios Principales</h4>
          <ul className="services-list">
            <li>Consultas Veterinarias</li>
            <li>Cirugías</li>
            <li>Vacunación</li>
            <li>Peluquería Canina</li>
            <li>Farmacia Veterinaria</li>
            <li>Emergencias 24/7</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Mundo Animal - Todos los derechos reservados</p>
        <p className="footer-links">
          <a href="/privacidad">Política de Privacidad</a> | 
          <a href="/terminos">Términos y Condiciones</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;