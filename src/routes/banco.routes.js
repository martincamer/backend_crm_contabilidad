import express from "express";
import {
  getBancos,
  getBanco,
  createBanco,
  updateBanco,
  deleteBanco,
} from "../controllers/banco.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Rutas para manejar los bancos
router.get("/bancos", auth, getBancos);
router.get("/bancos/:id", auth, getBanco);
router.post("/bancos", auth, createBanco);
router.put("/bancos/:id", auth, updateBanco);
router.delete("/bancos/:id", auth, deleteBanco);

export default router;
