import { Router } from "express";
import {
  getCategorias,
  createCategoria,
  deleteCategoria,
  getCategoria,
  updateCategoria,
} from "../controllers/categorias.controllers.js"; // Importar las funciones del controlador
import { auth } from "../middlewares/auth.middleware.js"; // Middleware de autenticación

const router = Router();

// Obtener todas las categorías
router.get("/categorias", auth, getCategorias); // Aplica autenticación antes de obtener las categorías

// Crear una nueva categoría
router.post("/categorias", auth, createCategoria); // Autenticación y crear una categoría

// Obtener una categoría por ID
router.get("/categorias/:id", auth, getCategoria); // Autenticación y obtener categoría por ID

// Actualizar una categoría por ID
router.put("/categorias/:id", auth, updateCategoria); // Autenticación y actualizar categoría por ID

// Eliminar una categoría por ID
router.delete("/categorias/:id", auth, deleteCategoria); // Autenticación y eliminación por ID

export default router;
