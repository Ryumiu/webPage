import React from 'react';
import './header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img src="/logoanimal.jpeg" alt="Logo Animal" className="logo" />
        <h1 className="title">Mundo Animal</h1>
      </div>
    </header>
  );
};

export default Header;