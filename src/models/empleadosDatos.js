import mongoose from "mongoose";

const empleadoDatosSchema = new mongoose.Schema(
  {
    empleados: {
      type: Buffer, // Cambiado a Buffer para admitir hasta 16MB de datos
      default: Buffer.alloc(0), // Valor por defecto como un Buffer vacío
    },
    date: {
      // Cambiar a fecha para que coincida con la búsqueda
      type: Date,
      default: Date.now,
    },
    //usuario datos
    user_nombre: {
      type: String,
      ref: "User",
    },
    user_apellido: {
      type: String,
      ref: "User",
    },
    user_localidad: {
      type: String,
      ref: "User",
    },
    user_provincia: {
      type: String,
      ref: "User",
    },
    user_fabrica: {
      type: String,
      ref: "User",
    },
    user_puesto_sector: {
      type: String,
      ref: "User",
    },
    username: {
      type: String,
      ref: "User",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("EmpleadoDatos", empleadoDatosSchema);
