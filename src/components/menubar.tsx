import React from 'react';
import { Link } from 'react-router-dom';
import './menubar.css';

const menubar: React.FC = () => {
  return (
    <nav className="menubar">
      <ul className="menu-list">
        <li className="menu-item"><Link to="/">Inicio</Link></li>
        <li className="menu-item"><Link to="/acerca-de">Acerca de</Link></li>
        <li className="menu-item"><Link to="/servicio">Servicio</Link></li>
        <li className="menu-item"><Link to="/contactos">Contactos</Link></li>
      </ul>
    </nav>
  );
};

export default menubar;