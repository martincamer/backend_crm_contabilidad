import { Router } from "express";
import {
  getIngresos,
  createIngreso,
  deleteIngreso,
  getIngreso,
  updateIngreso,
  updateIngresoEstado,
} from "../controllers/ingresos.controllers.js"; // Importar las funciones del controlador de ingresos
import { auth } from "../middlewares/auth.middleware.js"; // Middleware de autenticación

const router = Router();

// Obtener todos los ingresos del usuario actual
router.get("/ingresos", auth, getIngresos); // Aplica autenticación antes de obtener los ingresos

// Crear un nuevo ingreso con validación de esquema
router.post("/ingresos", auth, createIngreso); // Autenticación y crear un nuevo ingreso

// Obtener un ingreso por ID
router.get("/ingresos/:id", auth, getIngreso); // Autenticación y obtener ingreso por ID

// Actualizar un ingreso por ID
router.put("/ingresos/:id", auth, updateIngreso); // Autenticación y actualizar ingreso por ID

// Eliminar un ingreso por ID
router.delete("/ingresos/:id", auth, deleteIngreso); // Autenticación y eliminación por ID

// Actualizar solo el estado de un ingreso por ID
router.put("/ingresos/:id/estado", auth, updateIngresoEstado); // Autenticación y actualización de estado

export default router;
