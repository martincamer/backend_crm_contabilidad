import mongoose from "mongoose";

const ingresoSchema = new mongoose.Schema(
  {
    total_ingreso: {
      type: Number,
      default: 0,
    },
    tipo_pago: {
      type: String,
      default: "",
    },
    comprobante: {
      type: String,
      default: "",
    },
    observación: {
      type: String,
      default: "",
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    fecha_vencimiento: {
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
    estado: {
      type: String,
      enum: ["aceptado", "pendiente", "rechazado"],
      default: "pendiente",
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

export default mongoose.model("Ingreso", ingresoSchema);
