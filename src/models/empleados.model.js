import mongoose from "mongoose";

const reciboSueldoSchema = new mongoose.Schema({
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
  sueldo: {
    type: String,
    default: "",
  },
  sector_trabajo: {
    type: String,
    default: "",
  },
  fabrica_sucursal: {
    type: String,
    default: "",
  },
  recibo: {
    type: Object,
    default: {},
  },
  termino_pago: {
    type: String,
    default: "",
  },
  antiguedad_total: {
    type: String,
    default: "",
  },
  fecha_ingreso: {
    type: Date,
    default: Date.now,
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
    sector_trabajo: {
      type: String,
      default: "",
    },
    fabrica_sucursal: {
      type: String,
      default: "",
    },
    sueldo: {
      type: Array,
      default: [],
    },
    estado: {
      type: String,
      enum: ["trabajando", "enfermo", "reposo", "despedido", "accidentado"],
      default: "trabajando",
    },
    recibos: [reciboSueldoSchema],
    date: {
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

export default mongoose.model("Empleado", empleadoSchema);
