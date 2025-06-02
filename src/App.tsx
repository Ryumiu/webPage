import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import MenuBar from './components/menubar';
import Inicio from './components/inicio';
import AcercaDe from './components/acercade';
import Services from './components/services';   
import Contact from './components/contact';     
import Footer from './components/footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <MenuBar />
        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/acerca-de" element={<AcercaDe />} />
            <Route path="/servicio" element={<Services />} />   
            <Route path="/contactos" element={<Contact />} />   
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
