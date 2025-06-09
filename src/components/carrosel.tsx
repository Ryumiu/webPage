import React, { useState, useEffect } from 'react';
import './carrosel.css';

const Carrosel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/public/catdog.jpg',
    '/public/inicioanimal.jpeg',
    '/public/perrito.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="carrosel" className="carrosel-container">
      <div className="carrosel-content">
        <div className="image-container">
          <img
            src={images[currentIndex]}
            alt="Carrusel de imágenes"
            className="carrosel-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Carrosel;