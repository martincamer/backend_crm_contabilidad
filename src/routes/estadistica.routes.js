import { Router } from "express";
import {
  getEstadisticas,
  createEstadistica,
  deleteEstadistica,
  getEstadistica,
  updateEstadistica,
  getEstadisticasFecha,
} from "../controllers/estadistica.controller.js"; // Importar las funciones del controlador de estadística
import { auth } from "../middlewares/auth.middleware.js"; // Middleware de autenticación

const router = Router();

// Obtener todas las estadísticas
router.get("/estadisticas", auth, getEstadisticas); // Aplica autenticación antes de obtener las estadísticas

// Crear una nueva estadística
router.post("/estadisticas", auth, createEstadistica); // Autenticación y crear una estadística

// Obtener una estadística por ID
router.get("/estadisticas/:id", auth, getEstadistica); // Autenticación y obtener estadística por ID

// Actualizar una estadística por ID
router.put("/estadisticas/:id", auth, updateEstadistica); // Autenticación y actualizar estadística por ID

// Eliminar una estadística por ID
router.delete("/estadisticas/:id", auth, deleteEstadistica); // Autenticación y eliminación por ID

router.post("/estadisticas/range", auth, getEstadisticasFecha);

export default router;
