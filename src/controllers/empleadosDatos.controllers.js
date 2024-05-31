import EmpleadoDatos from "../models/empleadosDatos.js"; // Importa el modelo de EmpleadoDatos

// Obtener todos los empleados con filtro de fechas
export const getEmpleados = async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    console.log("startDate:", startDate);
    console.log("endDate:", endDate);

    const empleados = await EmpleadoDatos.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    console.log("Empleados encontrados:", empleados);
    res.json(empleados);
  } catch (error) {
    console.error("Error al obtener empleados por rango de fechas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener un empleado por ID
export const getEmpleado = async (req, res) => {
  try {
    const empleado = await EmpleadoDatos.findById(req.params.id);
    if (!empleado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.json(empleado);
  } catch (error) {
    console.error("Error al obtener el empleado:", error);
    res.status(500).json({ message: "Error al obtener el empleado" });
  }
};

export const createEmpleado = async (req, res) => {
  try {
    const { empleados, date } = req.body;

    // Crear el nuevo empleado
    const nuevoEmpleado = new EmpleadoDatos({
      empleados,
      date,
      user_nombre: req.user.nombre,
      user_apellido: req.user.apellido,
      user_localidad: req.user.localidad,
      user_provincia: req.user.provincia,
      user_fabrica: req.user.fabrica,
      user_puesto_sector: req.user.puesto_sector,
      username: req.user.username,
      user: req.user.id,
    });

    // Guardar el nuevo empleado en la base de datos
    await nuevoEmpleado.save();

    // Devolver el nuevo empleado creado
    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    console.error("Error al crear el empleado:", error);
    res.status(500).json({ message: "Error al crear el empleado" });
  }
};

// Actualizar un empleado por ID
export const updateEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { empleados, date } = req.body;

    // Buscar el empleado existente por ID
    const empleadoExistente = await EmpleadoDatos.findById(id);
    if (!empleadoExistente) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    // Actualizar el empleado con los nuevos datos
    empleadoExistente.empleados = empleados;
    empleadoExistente.date = date;
    empleadoExistente.user_nombre = req.user.nombre;
    empleadoExistente.user_apellido = req.user.apellido;
    empleadoExistente.user_localidad = req.user.localidad;
    empleadoExistente.user_provincia = req.user.provincia;
    empleadoExistente.user_fabrica = req.user.fabrica;
    empleadoExistente.user_puesto_sector = req.user.puesto_sector;
    empleadoExistente.username = req.user.username;
    empleadoExistente.user = req.user.id;

    await empleadoExistente.save(); // Guardar los cambios en la base de datos

    res.status(200).json(empleadoExistente); // Devolver el empleado actualizado
  } catch (error) {
    console.error("Error al actualizar el empleado:", error);
    res.status(500).json({ message: "Error al actualizar el empleado" });
  }
};

// Eliminar un empleado por ID
export const deleteEmpleado = async (req, res) => {
  try {
    const empleadoEliminado = await EmpleadoDatos.findByIdAndDelete(
      req.params.id
    ); // Buscar y eliminar el empleado por ID
    if (!empleadoEliminado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.sendStatus(204); // Devolver estado sin contenido si se eliminó correctamente
  } catch (error) {
    console.error("Error al eliminar el empleado:", error);
    res.status(500).json({ message: "Error al eliminar el empleado" });
  }
};
