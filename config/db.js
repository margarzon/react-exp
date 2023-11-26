const colors = require('colors');
const mongoose = require('mongoose');

// Función para conectar a la base de datos
async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Conexión exitosa a MongoDB: ${conn.connection.host}`.bgGreen.blue);
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error.message);
        process.exit(1); // Salir de la aplicación en caso de error de conexión
    }
}

module.exports = connectDB;
