import { Router } from "express";
import {
  getProveedores,
  createProveedor,
  deleteProveedor,
  getProveedor,
  updateProveedor,
} from "../controllers/proveedor.controller.js"; // Importar las funciones del controlador
import { auth } from "../middlewares/auth.middleware.js"; // Middleware de autenticación

const router = Router();

// Obtener todos los proveedores
router.get("/proveedores", auth, getProveedores); // Aplica autenticación antes de obtener los proveedores

// Crear un nuevo proveedor con validación de esquema
router.post(
  "/proveedores",
  auth, // Autenticación
  createProveedor // Controlador para crear un proveedor
);

// Obtener un proveedor por ID
router.get("/proveedores/:id", auth, getProveedor); // Autenticación y obtener proveedor por ID

// Actualizar un proveedor por ID
router.put("/proveedores/:id", auth, updateProveedor); // Autenticación y actualizar proveedor por ID

// Eliminar un proveedor por ID
router.delete("/proveedores/:id", auth, deleteProveedor); // Autenticación y eliminación por ID

export default router;
