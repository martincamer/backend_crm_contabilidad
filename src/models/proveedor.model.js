import mongoose from "mongoose";

const proveedorSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      default: "",
    },
    direccion: {
      type: String,
      default: "",
    },
    provincia: {
      type: String,
      default: "",
    },
    localidad: {
      type: String,
      default: "",
    },
    cp: {
      type: String,
      default: "",
    },
    observaciones: {
      type: String,
      default: "",
    },
    pais: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Proveedor", proveedorSchema);
