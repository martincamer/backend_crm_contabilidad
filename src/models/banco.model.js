import mongoose from "mongoose";

const movimientoSchema = new mongoose.Schema({
  total: {
    type: Number,
    default: 0,
  },
  comprobante: {
    type: String,
    default: "",
  },
  tipo_pago: {
    type: String,
    default: "",
  },
  empresa_proveedor: {
    type: Object,
    default: {},
  },
  date: {
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
});

const bancoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    saldo: {
      type: Number,
      default: 0,
    },
    fabrica: {
      type: String,
      required: true,
    },
    localidad: {
      type: String,
      required: true,
    },
    provincia: {
      type: String,
      required: true,
    },
    movimientos_caja: [movimientoSchema], // Arreglo de objetos de tipo movimientoSchema
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Banco", bancoSchema);
