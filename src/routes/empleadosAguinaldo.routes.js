import { Router } from "express";
import {
  getEmpleados,
  createEmpleado,
  deleteEmpleado,
  getEmpleado,
  updateEmpleado,
} from "../controllers/empleadosAguinaldo.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

// Crear un nuevo empleado
router.post("/empleados-datos-aguinaldo", auth, createEmpleado);

// Obtener un empleado por ID
router.get("/empleados-datos-aguinaldo/:id", auth, getEmpleado);

// Actualizar un empleado por ID
router.put("/empleados-datos-aguinaldo/:id", auth, updateEmpleado);

// Eliminar un empleado por ID
router.delete("/empleados-datos-aguinaldo/:id", auth, deleteEmpleado);

// router.post("/empleados-datos-aguinaldo/range", auth, getEmpleados);
router.post("/empleados-datos-aguinaldo/range", auth, getEmpleados);

export default router;
