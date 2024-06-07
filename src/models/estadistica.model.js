import mongoose from "mongoose";

const estadisticaDatosSchema = new mongoose.Schema(
  {
    canjes: {
      type: Array,
      default: [],
    },
    egresos: {
      type: Array,
      default: [],
    },
    presupuesto: {
      type: String,
      default: "",
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

export default mongoose.model("Estadistica", estadisticaDatosSchema);
