import mongoose from "mongoose";

const chequesSchema = new mongoose.Schema({
  total: {
    type: Number,
    default: 0,
  },
  banco: {
    type: String,
    default: "",
  },
  tipo: {
    type: String,
    default: "",
  },
  numero_cheque: {
    type: String,
    default: "",
  },
  datos: {
    type: String,
    default: "",
  },
  numero_cuenta: {
    type: String,
    default: "",
  },
  fecha_cobro: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  estado: {
    type: String,
    default: "pendiente el cobro",
  },
});

const bancoChequesSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
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
    cheques: [chequesSchema], // Arreglo de objetos de tipo chequesSchema
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BancoCheques", bancoChequesSchema);
