import express from "express";
import {
  getBancos,
  getBanco,
  createBanco,
  updateBanco,
  deleteBanco,
  agregarCheque,
  eliminarCheque, // Agregar esta importación para manejar la creación de cheques
} from "../controllers/bancoCheques.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Rutas para manejar los bancos con cheques
router.get("/bancos-cheques", auth, getBancos);
router.get("/bancos-cheques/:id", auth, getBanco);
router.post("/bancos-cheques", auth, createBanco);
router.put("/bancos-cheques/:id", auth, updateBanco);
router.delete("/bancos-cheques/:id", auth, deleteBanco);

// Ruta para agregar un nuevo cheque a un banco específico
router.post("/cheques", auth, agregarCheque);
router.delete("/eliminar-cheque/:id", eliminarCheque); // Ruta para eliminar un cheque por ID

export default router;
