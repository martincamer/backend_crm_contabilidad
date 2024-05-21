import mongoose from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Banco", bancoSchema);
