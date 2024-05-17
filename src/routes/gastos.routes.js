import { Router } from "express";
import {
  getGastos,
  createGasto,
  deleteGasto,
  getGasto,
  updateGasto,
} from "../controllers/gastos.controllers.js"; // Importar las funciones del controlador
import { auth } from "../middlewares/auth.middleware.js"; // Middleware de autenticación

const router = Router();

// Obtener todos los gastos del usuario actual
router.get("/gastos", auth, getGastos); // Aplica autenticación antes de obtener los gastos

// Crear un nuevo gasto con validación de esquema
router.post("/gastos", auth, createGasto); // Autenticación y crear un nuevo gasto

// Obtener un gasto por ID
router.get("/gastos/:id", auth, getGasto); // Autenticación y obtener gasto por ID

// Actualizar un gasto por ID
router.put("/gastos/:id", auth, updateGasto); // Autenticación y actualizar gasto por ID

// Eliminar un gasto por ID
router.delete("/gastos/:id", auth, deleteGasto); // Autenticación y eliminación por ID

export default router;
