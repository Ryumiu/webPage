import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuBar from "./components/menubar";

const Inicio = () => <h1 className="p-4 text-xl">Inicio</h1>;
const Contenido = () => <h1 className="p-4 text-xl">Contenido</h1>;
const Servicios = () => <h1 className="p-4 text-xl">Servicios</h1>;
const Contactos = () => <h1 className="p-4 text-xl">Contactos</h1>;
const Acerca = () => <h1 className="p-4 text-xl">Acerca de</h1>;

function App() {
  return (
    <Router>
      <MenuBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/contenido" element={<Contenido />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/acerca" element={<Acerca />} />
      </Routes>
    </Router>
  );
}

export default App;
