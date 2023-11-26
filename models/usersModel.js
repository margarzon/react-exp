const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "El nombre es requerido"],
        maxlength: [50, "El nombre no debe exceder los 50 caracteres"],
    },
    lastName: {
        type: String,
        required: [true, "El apellido es requerido"],
        maxlength: [50, "El apellido no debe exceder los 50 caracteres"],
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es requerido"],
        unique: true,
        maxlength: [100, "El correo electrónico no debe exceder los 100 caracteres"],
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida"],
        minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
        // Puedes agregar validaciones adicionales para la complejidad de la contraseña
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);
