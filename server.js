const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const cors = require('cors');
const bootcampsRoutes = require('./routes/bootcampsRoutes');
const usersRoutes = require('./routes/usersRoutes'); // Corregir la importación

// Establecer configuración
dotenv.config({
    path: './config/.env',
});

// Crear el objeto express
const app = express();

// Middleware para formatear JSON
app.use(express.json());

// Middleware CORS
app.use(cors());

// Ejecutar la conexión a la base de datos
connectDB();

app.get('/prueba', (req, res) => {
    // EJEMPLO DE RESPONSE BÁSICO
    res.send('Hola');
});

// Rutas de bootcamps
app.use('/bootcamps', bootcampsRoutes);

// Rutas de usuarios (corregido)
app.use('/users', usersRoutes);

// Rutas de reseñas y otras rutas...

// Definir puerto del servidor
const puerto = process.env.PUERTO || 3000;

app.listen(puerto, console.log(`Servidor ejecutando en puerto ${puerto}`.bgMagenta.green.bold));
