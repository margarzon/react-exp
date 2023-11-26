import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Actualiza la importación
import '../css/RegistroForm.css';

const RegistroForm = () => {
  const navigate = useNavigate();  // Actualiza la asignación
  const [usuario, setUsuario] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de Campos Requeridos
    const camposRequeridos = ['firstName', 'lastName', 'email', 'password'];
    const campoVacio = camposRequeridos.find((campo) => !usuario[campo]);

    if (campoVacio) {
      alert(`El campo ${campoVacio} es requerido.`);
      return;
    }

    // Validación de Longitud Mínima para el Nombre
    if (usuario.firstName.length < 4) {
      alert('El nombre debe tener al menos 4 caracteres.');
      return;
    }

    // Validación del Formato del Correo Electrónico
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(usuario.email)) {
      alert('El formato del correo electrónico no es válido.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:3000/users', usuario);
      console.log(response.data);

      // Limpiar el formulario después de un registro exitoso
      setUsuario({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });

      alert('Registro exitoso.');

      // Navegar a la página de login después de un registro exitoso
      navigate('/login');  // Actualiza la navegación

    } catch (error) {
      console.error('Error al registrar al usuario:', error);

      if (error.response && error.response.data && error.response.data.errors) {
        const { errors } = error.response.data;

        // Manejar errores específicos
        if (errors.firstName) {
          alert(`Error en el campo 'Nombres': ${errors.firstName.message}`);
        }
        if (errors.lastName) {
          alert(`Error en el campo 'Apellidos': ${errors.lastName.message}`);
        }
        if (errors.email) {
          alert(`Error en el campo 'Correo Electrónico': ${errors.email.message}`);
        }
        if (errors.password) {
          alert(`Error en el campo 'Contraseña': ${errors.password.message}`);
        }
      } else if (error.response && error.response.data && error.response.data.message) {
        // Si hay un mensaje general, mostrarlo
        alert(error.response.data.message);
      } else {
        alert('Error al registrar al usuario. Por favor, inténtalo de nuevo.');
      }
    }
  };

  return (
<div className='flogin'>
<div className="wrapper fadeInDown">
      <div id="formContent">
        <h2 className="active">Registrarse</h2>
        <div className="fadeIn first">
          <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="firstName"
            placeholder="Nombres"
            value={usuario.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            id="lastname"
            className="fadeIn third"
            name="lastName"
            placeholder="Apellidos"
            value={usuario.lastName}
            onChange={handleChange}
          />
          <input
            type="text"
            id="email"
            className="fadeIn second"
            name="email"
            placeholder="Correo Electrónico"
            value={usuario.email}
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="password"
            placeholder="Contraseña"
            value={usuario.password}
            onChange={handleChange}
          />
          <input type="submit" className="fadeIn fourth" value="Registrarse" />
        </form>
        <div id="formFooter">
          <a className="underlineHover" href="#">
            ¿Ya tienes una cuenta? Inicia Sesión
          </a>
        </div>
      </div>
    </div>
</div>
  );
};

export default RegistroForm;
