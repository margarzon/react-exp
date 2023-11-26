const express = require('express')
const  Course = require('../models/coursesModel')
//definir ruteador de bootcamps
const router = express.Router()
const {default: mongoose } = require ("mongoose");

router.get('/',
    async (req, res) => {
        try {
            // Traer los cursos en la base de datos
            const courses = await Course.find();

            if (courses.length > 0) {
                // Hay cursos en MongoDB
                res.status(200).json({
                    success: true,
                    data: courses
                });
            } else {
                // No hay cursos
                res.status(404).json({
                    success: false,
                    msg: "No hay cursos"
                });
            }
        } catch (error) {
            // Manejar errores si ocurren al acceder a la base de datos
            console.error(error);
            res.status(500).json({
                success: false,
                msg: "Error al obtener cursos de la base de datos"
            });
        }
    });
    router.post('/', async (req, res) => {
        try {
            const newCourse = await Course.create(req.body);
            return res.status(201).json({
                success: true,
                data: newCourse,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: `Error encontrado: ${error.message}`
            });
        }
    });
    

    router.get('/:id',
    async (req, res) => {
        const courseId = req.params.id;  // Cambiado de 'const course' a 'const courseId'
        try {
            // Escenario: ID inválido
            if (!mongoose.Types.ObjectId.isValid(courseId)) {
                return res.status(500).json({
                    success: false,
                    msg: "ID inválido",
                });
            } else {
                const course = await Course.findById(courseId);
                if (!course) {
                    // Si no se encuentra el curso
                    res.status(404).json({
                        success: false,
                        msg: "Curso no encontrado"
                    });
                } else {
                    // Si se encuentra el curso
                    return res.status(200).json({
                        success: true,
                        data: course
                    });
                }
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: `Error encontrado: ${error.message}`
            });
        }
    });


    router.put('/:id', async (req, res) => {
        const courseId = req.params.id;
    
        try {
            // Escenario: ID de curso inválido
            if (!mongoose.Types.ObjectId.isValid(courseId)) {
                return res.status(500).json({
                    success: false,
                    msg: "ID inválido",
                });
            } else {
                const updatedCourse = await Course.findByIdAndUpdate(
                    courseId,
                    req.body,
                    {
                        new: true,
                    }
                );
    
                if (!updatedCourse) {
                    // Si no se encuentra el curso
                    res.status(404).json({
                        success: false,
                        msg: "Curso no encontrado",
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        data: updatedCourse,
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
    

router.put('/:id', async(req, res)=>{
        const updateCourse = await Course.findByIdAndUpdate(req.params.id)
        res.json({
            //parametro: req.params.id
            success:true,
            data: updateCourse
        })  
    })
//4. eliminar

router.delete ('/:id',
       async (req , res) => {
         const courseId  = req.params.id 
         const deletecourse = await Course.findByIdAndDelete(courseId)
        return res.json({
            succes : true,
            msg :`eliminando course cuyo id es: ${courseId}`
        }
        )
        })
module.exports = router;