import React from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <section className="contact-section">
      <h2 className="contact-title">Contáctanos</h2>
      <div className="contact-container">
        <form className="contact-form">
          <input type="text" placeholder="Nombre" />
          <input type="email" placeholder="Correo Electrónico" />
          <textarea placeholder="Mensaje"></textarea>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
