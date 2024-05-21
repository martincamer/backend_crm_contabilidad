import { Router } from "express";
import {
  getClientes,
  createCliente,
  deleteCliente,
  getCliente,
  updateCliente,
  createEntrega,
} from "../controllers/clientes.controllers.js"; // Importar las funciones del controlador de clientes
import { auth } from "../middlewares/auth.middleware.js"; // Middleware de autenticación

const router = Router();

// Obtener todos los clientes
router.get("/clientes", auth, getClientes);

// Crear un nuevo cliente
router.post("/clientes", auth, createCliente);

//nueva entrega
router.post("/clientes/:id/entregas", auth, createEntrega);

// Obtener un cliente por ID
router.get("/clientes/:id", auth, getCliente);

// Actualizar un cliente por ID
router.put("/clientes/:id", auth, updateCliente);

// Eliminar un cliente por ID
router.delete("/clientes/:id", auth, deleteCliente);

export default router;
