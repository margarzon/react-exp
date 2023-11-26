const express = require('express');
const User = require('../models/usersModel');
const mongoose = require('mongoose');
const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find();

    if (users.length > 0) {
      return res.status(200).json({
        success: true,
        data: users,
      });
    } else {
      return res.status(404).json({
        success: false,
        msg: "No hay usuarios",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: `Error encontrado: ${error.message}`,
    });
  }
});

// Ruta para obtener un usuario por su ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(500).json({
        success: false,
        msg: "ID inválido",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "Usuario no encontrado",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Error encontrado: ${error.message}`,
    });
  }
});

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Error encontrado: ${error.message}`,
    });
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por correo electrónico y contraseña
    const user = await User.findOne({ email, password });

    if (user) {
      return res.status(200).json({
        success: true,
        data: user,
        msg: 'Credenciales válidas',
      });
    } else {
      return res.status(401).json({
        success: false,
        msg: 'Credenciales inválidas. Verifica tu correo electrónico y contraseña.',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: `Error encontrado: ${error.message}`,
    });
  }
});

router.put('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(500).json({
        success: false,
        msg: "ID inválido",
      });
    } else {
      const user = await User.findByIdAndUpdate(
        userId,
        req.body,
        { new: true }
      );

      if (!user) {
        res.status(404).json({
          success: false,
          msg: "User no encontrado",
        });
      } else {
        return res.status(200).json({
          success: true,
          data: user,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Error encontrado: ${error.message}`,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(500).json({
        success: false,
        msg: "ID inválido",
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        msg: "User no encontrado",
      });
    }

    return res.json({
      success: true,
      msg: `User eliminado correctamente: ${userId}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Error encontrado: ${error.message}`,
    });
  }
});

module.exports = router;
