import mongoose from "mongoose";

const cuotaSchema = new mongoose.Schema({
  total: {
    type: Number,
    default: 0,
  },
  comprobante: {
    type: String,
    default: "",
  },
  numero: {
    type: Number,
    required: true,
  },
  tipo_pago: {
    type: String,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const EntregaSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
  },
  comprobante: {
    type: String,
    default: "",
  },
  tipo_pago: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const clienteSchema = new mongoose.Schema(
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
    plan: {
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
    direccion: {
      type: String,
      default: "",
    },
    telefono: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    edad: {
      type: String,
      default: "",
    },
    numero_contrato: {
      type: String,
      default: "",
    },
    entregas: {
      type: [EntregaSchema],
      default: [],
    },
    cuotas_plan: {
      type: [cuotaSchema],
      default: [],
    },
    termino_pago: {
      type: String,
      default: "",
    },
    seña: {
      type: Number,
      default: 0,
    },
    total_vivienda: {
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

export default mongoose.model("Cliente", clienteSchema);
