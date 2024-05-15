import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    default: "",
  },
  apellido: {
    type: String,
    default: "",
  },
  dni: {
    type: String,
    default: "",
  },
  fecha_nacimiento: {
    type: Date, // Cambiado a Date para almacenar fechas de nacimiento
    default: null, // O cualquier valor por defecto que prefieras
  },
  provincia: {
    type: String,
    default: "",
  },
  localidad: {
    type: String,
    default: "",
  },
  fabrica: {
    type: String,
    default: "",
  },
  puesto_sector: {
    type: String,
    default: "",
  },
  imagen_usuario: {
    type: String,
    default: "",
  },
  cuenta: {
    type: String,
    enum: ["activada", "desactivada"],
    default: "activada",
  },
  roles: {
    type: [String],
    default: ["user"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
