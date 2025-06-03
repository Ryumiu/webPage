import React, { useState } from 'react';
import './Contact.css';
import { guardarContacto } from '../services/api';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const [resultado, setResultado] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors: any = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio.';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio.';
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'El correo no es válido.';
      valid = false;
    }
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio.';
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await guardarContacto(formData);
      setResultado(`✅ ${response.message} (ID: ${response.id})`);
      setFormData({ nombre: '', email: '', mensaje: '' });
    } catch (error: any) {
      setResultado(`❌ Error: ${error.message}`);
    }
  };

  return (
    <section className="contact-section">
      <h2 className="contact-title">Contáctanos</h2>
      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <span className="error">{errors.nombre}</span>}

          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <textarea
            name="mensaje"
            placeholder="Mensaje"
            value={formData.mensaje}
            onChange={handleChange}
          ></textarea>
          {errors.mensaje && <span className="error">{errors.mensaje}</span>}

          <button type="submit">Enviar</button>
        </form>

        {resultado && <p className="form-feedback">{resultado}</p>}
      </div>
    </section>
  );
};

export default Contact;
