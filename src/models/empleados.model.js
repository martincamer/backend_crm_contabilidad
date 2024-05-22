import mongoose from "mongoose";

const recibos_sueldo = new mongoose.Schema({
  recibo: {
    type: String,
    default: "",
  },
  tipo: {
    type: String,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const empleadoSchema = new mongoose.Schema(
  {
    //datos cliente/contrato
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
      type: Date,
      default: Date.now,
    },
    fecha_ingreso: {
      type: Date,
      default: Date.now,
    },
    termino_pago: {
      type: String,
      default: "",
    },
    recibos: [recibos_sueldo], // Arreglo de objetos de tipo movimientoSchema
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
      enum: ["enfermo", "reposo", "despedido", "accidentado"],
      default: "trabajando",
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

export default mongoose.model("Empleado", empleadoSchema);
