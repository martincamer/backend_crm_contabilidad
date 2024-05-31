import { Router } from "express";
import {
  getEmpleados,
  createEmpleado,
  deleteEmpleado,
  getEmpleado,
  updateEmpleado,
} from "../controllers/empleadosDatos.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

// Crear un nuevo empleado
router.post("/empleados-datos", auth, createEmpleado);

// Obtener un empleado por ID
router.get("/empleados-datos/:id", auth, getEmpleado);

// Actualizar un empleado por ID
router.put("/empleados-datos/:id", auth, updateEmpleado);

// Eliminar un empleado por ID
router.delete("/empleados-datos/:id", auth, deleteEmpleado);

// router.post("/empleados-datos/range", auth, getEmpleados);
router.post("/empleados-datos/range", auth, getEmpleados);

export default router;
