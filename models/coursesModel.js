const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "el titulo es requerido"],
    unique: true,
    maxlength: [30, "nombre de bootcamp no mayor a 50 caracteres"],
    minlength: [10, "nombre de bootcamp debe tener al menos 10 caracteres"],
  },
  description: {
    required:[true,"la descripcion es requerida"],
    type: String,
    maxlength: [100, ""],
  },
  week: {
    type: String,
    required: [true, "la direccion es requerida"],
    maxlength: [9, "El número máximo de semanas para un curso es 9"],
  },
  enroll_cost: {
    required: [true, "el costo es requerido"],
    type: Number,
  },
  minimum_skill: {
    type:[String],
    required: [true, "el costo es requerido"],
    enum:["Beginner","Intermediate","Advanced","Expert"]
    
  },
});

module.exports = mongoose.model("Course", CourseSchema);
