import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BootcampList = () => {
  const [bootcamps, setBootcamps] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/bootcamps')
      .then(response => {
        console.log('Datos recibidos:', response.data);
        setBootcamps(response.data.data);
      })
      .catch(error => console.error('Error:', error));
  }, []);  

  return (
    <div>
      <h1>Lista de Bootcamps</h1>
      <ul>
        {bootcamps.map(bootcamp => (
          <li key={bootcamp.name}>
            <strong>Nombre:</strong> {bootcamp.name}, <strong>Dirección:</strong> {bootcamp.adress}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BootcampList;
