import { Router } from "express";
import {
  getEmpleados,
  createEmpleado,
  deleteEmpleado,
  getEmpleado,
  updateEmpleado,
  updateEmpleadoEstado,
  crearReciboEnEmpleado,
} from "../controllers/empleados.controllers.js"; // Importar las funciones del controlador de empleados
import { auth } from "../middlewares/auth.middleware.js"; // Middleware de autenticación

const router = Router();

// Obtener todos los empleados
router.get("/empleados", auth, getEmpleados);

// Crear un nuevo empleado
router.post("/empleados", auth, createEmpleado);

// Obtener un empleado por ID
router.get("/empleados/:id", auth, getEmpleado);

// Actualizar un empleado por ID
router.put("/empleados/:id", auth, updateEmpleado);

// Eliminar un empleado por ID
router.delete("/empleados/:id", auth, deleteEmpleado);

// Actualizar solo el estado de un empleado por ID
router.patch("/empleados/estado/:id", auth, updateEmpleadoEstado);

router.post("/:id/recibo", crearReciboEnEmpleado);

export default router;
