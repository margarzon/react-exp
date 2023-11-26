const express = require('express');
const Bootcamp = require('../models/bootcampsModel');
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const bootcamps = await Bootcamp.find();

    if (bootcamps.length > 0) {
      return res.status(200).json({
        success: true,
        data: bootcamps,
      });
    } else {
      return res.status(404).json({
        success: false,
        msg: "No hay bootcamps",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: `Error encontrado: ${error.message}`,
    });
  }
});

router.get('/:id', async (req, res) => {
  const bootcampId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
      return res.status(500).json({
        success: false,
        msg: "ID inválido",
      });
    }

    const bootcamp = await Bootcamp.findById(bootcampId);

    if (!bootcamp) {
      return res.status(404).json({
        success: false,
        msg: "Bootcamp no encontrado",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: bootcamp,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Error encontrado: ${error.message}`,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const newBootcamp = await Bootcamp.create(req.body);
    return res.status(201).json({
      success: true,
      data: newBootcamp,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Error encontrado: ${error.message}`,
    });
  }
});

router.put('/:id', async (req, res) => {
  const bootcampId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
      return res.status(500).json({
        success: false,
        msg: "ID inválido",
      });
    } else {
      const bootcamp = await Bootcamp.findByIdAndUpdate(
        bootcampId,
        req.body,
        { new: true }
      );

      if (!bootcamp) {
        res.status(404).json({
          success: false,
          msg: "Bootcamp no encontrado",
        });
      } else {
        return res.status(200).json({
          success: true,
          data: bootcamp,
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
  const bootcampId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
      return res.status(500).json({
        success: false,
        msg: "ID inválido",
      });
    }

    const deletedBootcamp = await Bootcamp.findByIdAndDelete(bootcampId);

    if (!deletedBootcamp) {
      return res.status(404).json({
        success: false,
        msg: "Bootcamp no encontrado",
      });
    }

    return res.json({
      success: true,
      msg: `Bootcamp eliminado correctamente: ${bootcampId}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Error encontrado: ${error.message}`,
    });
  }
});

module.exports = router;
