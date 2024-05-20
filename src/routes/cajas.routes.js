import express from "express";
import {
  getCajas,
  getCaja,
  createCaja,
  updateCaja,
  deleteCaja,
} from "../controllers/cajas.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Rutas para manejar las cajas
router.get("/cajas", auth, getCajas);
router.get("/cajas/:id", auth, getCaja);
router.post("/cajas", auth, createCaja);
router.put("/cajas/:id", auth, updateCaja);
router.delete("/cajas/:id", auth, deleteCaja);

export default router;
