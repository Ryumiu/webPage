import React from 'react';
import './AcercaDe.css';

const AcercaDe: React.FC = () => {
  return (
    <div id="acerca-de" className="acerca-de-container">
      <div className="acerca-de-content">
        <div className="texto-container">
          <h2>Acerca de Nosotros</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="imagen-container">
          <img src="/logoanimal.jpeg" alt="Acerca de Nosotros" className="acerca-de-imagen" />
        </div>
      </div>
    </div>
  );
};

export default AcercaDe;