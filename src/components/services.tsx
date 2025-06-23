import React from 'react';
import './Services.css';

const services = [
  {
    title: 'Consulta Veterinaria',
    description: 'Atención médica general para tu mascota con veterinarios certificados.',
    image: '/perrito.jpg',
    button: 'Agendar cita',
  },
  {
    title: 'Vacunación',
    description: 'Calendario completo de vacunas para perros, gatos y otros animales.',
    image: '/gatitos.jpg',
    button: 'Ver calendario',
  },
  {
    title: 'Peluquería y Estética',
    description: 'Baño, corte de pelo y limpieza profesional con productos especiales.',
    image: '/golden_retriever.jpg',
    button: 'Reservar ahora',
  },
  {
    title: 'Guardería',
    description: 'Cuidamos de tu mascota mientras estás fuera con vigilancia y juegos.',
    image: '/perritop.jpeg',
    button: 'Conocer más',
  },
  {
    title: 'Adopción Responsable',
    description: 'Conecta con animales que buscan un hogar lleno de amor.',
    image: '/gatonegro.jpg',
    button: 'Ver mascotas',
  },
  {
    title: 'Entrenamiento',
    description: 'Entrenamiento en obediencia, comportamiento y socialización.',
    image: '/pastoraleman.jpg',
    button: 'Más información',
  },
  {
    title: 'Tienda de Mascotas',
    description: 'Accesorios, alimentos, juguetes y más, todo en un solo lugar.',
    image: '/doberman.jpg',
    button: 'Explorar tienda',
  },
];

const Services = () => {
  return (
    <div className="services-container">
      <h1 className="services-title">Nuestros Servicios</h1>
      <p className="services-subtitle">Cuidamos a tus mascotas con amor y profesionalismo</p>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-image-container">
              <img src={service.image} alt={service.title} className="service-image" />
            </div>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <button className="service-button">{service.button}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;