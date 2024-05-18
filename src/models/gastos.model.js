import mongoose from "mongoose";

const gastoSchema = new mongoose.Schema(
  {
    empresa_proveedor: {
      type: Object,
      default: {},
    },
    detalles: {
      type: Array,
      default: [],
    },
    comprobante: {
      type: String,
      default: "",
    },
    numero_factura: {
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
    terminos_pago: {
      type: String,
      default: "",
    },
    categoria: {
      type: Object,
      default: {},
    },
    total: {
      type: Number,
      default: 0,
    },
    impuestos_total: {
      type: Number,
      default: 0,
    },
    descuentos_total: {
      type: Number,
      default: 0,
    },
    total_final: {
      type: Number,
      default: 0,
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

export default mongoose.model("Gasto", gastoSchema);
