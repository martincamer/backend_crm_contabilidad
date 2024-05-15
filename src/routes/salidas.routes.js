import { Router } from "express";
import {
  getSalidas,
  createSalida,
  deleteSalida,
  getSalida,
  updateSalida,
} from "../controllers/salidas.controllers.js"; // Importar las funciones del controlador
import { auth } from "../middlewares/auth.middleware.js"; // Middleware de autenticación

const router = Router();

// Obtener todas las salidas del usuario actual
router.get("/salidas", auth, getSalidas); // Aplica autenticación antes de obtener las salidas

// Crear una nueva salida con validación de esquema
router.post(
  "/salidas",
  auth, // Autenticación
  createSalida // Controlador para crear una salida
);

// Obtener una salida por ID
router.get("/salidas/:id", auth, getSalida); // Autenticación y obtener salida por ID

router.put("/salidas/:id", auth, updateSalida); // Autenticación y obtener salida por ID

// Eliminar una salida por ID
router.delete("/salidas/:id", auth, deleteSalida); // Autenticación y eliminación por ID

export default router;
