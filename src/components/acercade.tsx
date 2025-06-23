import React, { useState, useEffect } from 'react';
import './AcercaDe.css';

const AcercaDe: React.FC = () => {
  const images = [
    { src: '/perrito.jpg', alt: 'Perrito' },
    { src: '/gatitos.jpg', alt: 'Gatitos' },
    { src: '/doberman.jpg', alt: 'Doberman' },
    { src: '/golden_retriever.jpg', alt: 'Golden Retriever' },
    { src: '/pastoraleman.jpg', alt: 'Pastor Alemán' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div id="acerca-de" className="acerca-de-container">
      <div className="acerca-de-content">
        <div className="texto-container">
          <div className="texto-inner">
            <h2>Acerca de Nosotros</h2>
            <div className="separator"></div>
            <p>
              Bienvenidos a Mundo Animal, tu clínica veterinaria de confianza en Cochabamba, Bolivia. Con años de experiencia en el cuidado y tratamiento de mascotas, nuestro equipo de profesionales veterinarios está comprometido con la salud y el bienestar de tus compañeros peludos.
            </p>
            <p>
              Ofrecemos una amplia gama de servicios veterinarios, incluyendo consultas generales, vacunación, cirugías, emergencias 24/7, y servicios de peluquería canina. Nuestras instalaciones están equipadas con tecnología moderna para garantizar el mejor cuidado para tu mascota. Nos encontramos en una ubicación céntrica de Cochabamba para tu comodidad.
            </p>
          </div>
        </div>
        <div className="imagen-container">
          <button className="carousel-button prev" onClick={prevImage}>&lt;</button>
          <div className="carousel-images">
            {images.map((image, index) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                className={`acerca-de-imagen ${index === currentIndex ? 'active' : ''}`}
              />
            ))}
          </div>
          <button className="carousel-button next" onClick={nextImage}>&gt;</button>
          <div className="carousel-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcercaDe;