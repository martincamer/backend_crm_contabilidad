import Empleado from "../models/empleados.model.js"; // Importa el modelo de Empleado

// Obtener todos los empleados
export const getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find({ user: req.user.id });
    res.json(empleados);
  } catch (error) {
    console.error("Error al obtener los empleados:", error);
    res.status(500).json({ message: "Error al obtener los empleados" });
  }
};

// Obtener un empleado por ID
export const getEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.json(empleado);
  } catch (error) {
    console.error("Error al obtener el empleado:", error);
    res.status(500).json({ message: "Error al obtener el empleado" });
  }
};

// Crear un nuevo empleado
export const createEmpleado = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      dni,
      fecha_nacimiento,
      fecha_ingreso,
      termino_pago,
      sector_trabajo,
      fabrica_sucursal,
      sueldo,
      date,
    } = req.body;

    // Crear el nuevo empleado
    const nuevoEmpleado = new Empleado({
      nombre,
      apellido,
      dni,
      fecha_nacimiento,
      fecha_ingreso,
      termino_pago,
      sector_trabajo,
      fabrica_sucursal,
      sueldo,
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

export const crearReciboEnEmpleado = async (req, res) => {
  const { id } = req.params;
  const { termino_pago, recibo, fecha_ingreso, antiguedad_total } = req.body;

  try {
    // Buscar el empleado por su ID
    const empleado = await Empleado.findById(id);

    if (!empleado) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    const nombre = empleado.nombre;
    const apellido = empleado.apellido;
    const dni = empleado.dni;
    const fecha_nacimiento = empleado.fecha_nacimiento;
    const sueldo = empleado.termino_pago;
    const fabrica_sucursal = empleado.fabrica_sucursal;
    const sector = empleado.sector;

    // Agregar el nuevo recibo a la lista de recibos del empleado
    empleado.recibos.push({
      nombre,
      apellido,
      dni,
      fecha_nacimiento,
      sueldo,
      fabrica_sucursal,
      sector,
      termino_pago,
      fecha_ingreso,
      recibo,
      antiguedad_total,
      created_at: new Date(),
    });

    // Guardar el empleado actualizado con el nuevo recibo
    await empleado.save();

    // Devolver una respuesta adecuada si es necesario
    // res.status(201).json({ message: "Recibo creado correctamente", empleado });
    res.status(201).json(empleado.recibos[empleado.recibos.length - 1]); // Devuelve el último recibo creado
  } catch (error) {
    console.error("Error creating receipt in employee:", error);
    res.status(500).json({ error: "Error creating receipt in employee" });
  }
};

// Actualizar un empleado por ID
export const updateEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      apellido,
      dni,
      fecha_nacimiento,
      fecha_ingreso,
      termino_pago,
      seña,
      total_vivienda,
      recibos,
      estado,
      date,
    } = req.body;

    // Buscar el empleado existente por ID
    const empleadoExistente = await Empleado.findById(id);
    if (!empleadoExistente) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    // Actualizar el empleado con los nuevos datos
    empleadoExistente.nombre = nombre;
    empleadoExistente.apellido = apellido;
    empleadoExistente.dni = dni;
    empleadoExistente.fecha_nacimiento = fecha_nacimiento;
    empleadoExistente.fecha_ingreso = fecha_ingreso;
    empleadoExistente.termino_pago = termino_pago;
    empleadoExistente.seña = seña;
    empleadoExistente.total_vivienda = total_vivienda;
    empleadoExistente.recibos = recibos;
    empleadoExistente.estado = estado;
    empleadoExistente.date = date;

    // Actualizar los campos específicos del usuario
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
    const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id); // Buscar y eliminar el empleado por ID
    if (!empleadoEliminado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.sendStatus(204); // Devolver estado sin contenido si se eliminó correctamente
  } catch (error) {
    console.error("Error al eliminar el empleado:", error);
    res.status(500).json({ message: "Error al eliminar el empleado" });
  }
};

// Actualizar solo el estado de un empleado por ID
export const updateEmpleadoEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    // Buscar y actualizar el estado del empleado por ID
    const empleadoActualizado = await Empleado.findByIdAndUpdate(
      id,
      { estado },
      { new: true, runValidators: true } // Retornar el documento actualizado
    );

    if (!empleadoActualizado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.status(200).json(empleadoActualizado); // Devolver el empleado con el estado actualizado
  } catch (error) {
    console.error("Error al actualizar el estado del empleado:", error);
    res
      .status(500)
      .json({ message: "Error al actualizar el estado del empleado" });
  }
};
