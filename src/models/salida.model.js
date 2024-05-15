import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema(
  {
    chofer_flete: {
      type: String,
      default: "",
    },
    chofer_vehiculo: {
      type: String,
      default: "",
    },
    km_viaje: {
      type: String,
      default: "",
    },
    km_precio: {
      type: String,
      default: "",
    },
    km_viaje_flete: {
      type: String,
      default: "",
    },
    km_precio_flete: {
      type: String,
      default: "",
    },
    espera_flete: {
      type: String,
      default: "",
    },
    total_viaticos: {
      type: String,
      default: "",
    },
    armador: {
      type: String,
      default: "",
    },
    motivo: {
      type: String,
      default: "",
    },
    clientes: {
      type: Array,
      default: [],
    },
    total: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    localidad: {
      type: String,
      ref: "User",
    },
    fabrica: {
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

export default mongoose.model("Salida", ventaSchema);
