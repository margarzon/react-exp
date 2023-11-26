// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Home.css'; // Importa solo los estilos específicos de Home

const Home = ({ usuario }) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/home">Servicio Médico Virtual</Link>
            </li>
          </ul>
        </nav>
      </header>

      <h1>Bienvenido a tu Servicio Médico Virtual</h1>
      <p>Agendar tus citas nunca ha sido tan fácil.</p>

      {usuario && (
        <div className="user-profile">
          <h2>{usuario.nombre}</h2>
        </div>
      )}

      <div className="container">
        <div className="rectangle">
          {/* Contenido específico de rectangle */}
          <h1>Bienvenido a tu Servicio Médico Virtual</h1>
          <p>Agendar tus citas nunca ha sido tan fácil.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
