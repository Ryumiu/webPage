import { Link } from "react-router-dom";

const MenuBar = () => {
  return (
    <nav className="bg-blue-800 text-white p-4">
      <ul className="flex flex-col md:flex-row gap-4 justify-center">
        <li><Link to="/" className="hover:text-gray-300">Inicio</Link></li>
        <li><Link to="/contenido" className="hover:text-gray-300">Contenido</Link></li>
        <li><Link to="/servicios" className="hover:text-gray-300">Servicios</Link></li>
        <li><Link to="/contactos" className="hover:text-gray-300">Contactos</Link></li>
        <li><Link to="/acerca" className="hover:text-gray-300">Acerca de</Link></li>
      </ul>
    </nav>
  );
};

export default MenuBar;
