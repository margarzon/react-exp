import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import RegistroForm from './components/RegistroForm';  // Asegúrate de importar el componente RegistroForm

const App = () => {
  const [usuario, setUsuario] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginForm setUsuario={setUsuario} />}
        />
        <Route
          path="/home"
          element={<Home usuario={usuario} />}
        />
        <Route
          path="/registro"
          element={<RegistroForm />}
        />
      </Routes>
    </Router>
  );
};

export default App;
