import Empleado from "../models/empleados.model.js";
import Fabrica from "../models/fabricas.model.js";
import Sectores from "../models/sectores.model.js";

// Obtener todos los empleados
export const getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find({
      user_localidad: req.user.localidad,
    });
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
    const sector_trabajo = empleado.sector_trabajo;

    // Agregar el nuevo recibo a la lista de recibos del empleado
    empleado.recibos.push({
      nombre,
      apellido,
      dni,
      fecha_nacimiento,
      sueldo,
      fabrica_sucursal,
      sector_trabajo,
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

// Controlador para eliminar un recibo de un empleado
export const eliminarReciboEnEmpleado = async (req, res) => {
  const { idEmpleado, idRecibo } = req.params;

  try {
    // Buscar al empleado por su ID
    const empleado = await Empleado.findById(idEmpleado);

    if (!empleado) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    // Encontrar el índice del recibo a eliminar
    const indexRecibo = empleado.recibos.findIndex(
      (recibo) => recibo._id.toString() === idRecibo.toString()
    );

    if (indexRecibo === -1) {
      return res
        .status(404)
        .json({ error: "Recibo no encontrado en el empleado" });
    }

    // Eliminar el recibo del arreglo de recibos
    empleado.recibos.splice(indexRecibo, 1);

    // Guardar el empleado actualizado sin el recibo eliminado
    await empleado.save();

    // Devolver una respuesta adecuada con el empleado actualizado
    res.json({ message: "Recibo eliminado correctamente", empleado });
  } catch (error) {
    console.error("Error eliminando recibo del empleado:", error);
    res.status(500).json({ error: "Error eliminando recibo del empleado" });
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
      // recibos,
      estado,
      sueldo,
      sector_trabajo,
      fabrica_sucursal,
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
    // empleadoExistente.recibos = recibos;
    empleadoExistente.estado = estado;
    empleadoExistente.sueldo = sueldo;
    empleadoExistente.sector_trabajo = sector_trabajo;
    empleadoExistente.fabrica_sucursal = fabrica_sucursal;
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

export const aumentarSueldo = async (req, res) => {
  try {
    const { fabrica, termino_pago, aumento, tipo_quincena } = req.body;

    if (!fabrica || !termino_pago || !aumento) {
      return res
        .status(400)
        .json({ message: "Datos incompletos para aumentar sueldo" });
    }

    const aumentoNumerico = Number(aumento);
    if (isNaN(aumentoNumerico)) {
      return res
        .status(400)
        .json({ message: "El aumento debe ser un número válido" });
    }

    const empleados = await Empleado.find({
      fabrica_sucursal: fabrica,
      termino_pago,
    });

    if (empleados.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron empleados para aumentar sueldo" });
    }

    const empleadosActualizados = [];

    for (let empleado of empleados) {
      let updatedEmpleado = empleado.toObject(); // Convertir a objeto plano para modificar

      if (termino_pago === "mensual") {
        if (updatedEmpleado.sueldo.length > 0) {
          updatedEmpleado.sueldo[0].sueldo_basico = String(
            Number(updatedEmpleado.sueldo[0].sueldo_basico) + aumentoNumerico
          );
        }
      } else if (termino_pago === "quincenal") {
        if (tipo_quincena === "quincena_cinco") {
          if (
            updatedEmpleado.sueldo.length > 0 &&
            updatedEmpleado.sueldo[0].quincena_cinco.length > 0
          ) {
            updatedEmpleado.sueldo[0].quincena_cinco[0].quincena_cinco = String(
              Number(
                updatedEmpleado.sueldo[0].quincena_cinco[0].quincena_cinco
              ) + aumentoNumerico
            );
          }
        } else if (tipo_quincena === "quincena_veinte") {
          if (
            updatedEmpleado.sueldo.length > 0 &&
            updatedEmpleado.sueldo[1].quincena_veinte.length > 0
          ) {
            updatedEmpleado.sueldo[1].quincena_veinte[0].quincena_veinte =
              String(
                Number(
                  updatedEmpleado.sueldo[1].quincena_veinte[0].quincena_veinte
                ) + aumentoNumerico
              );
          }
        }
      }

      try {
        // Actualizar el documento en la base de datos usando findByIdAndUpdate
        const updated = await Empleado.findByIdAndUpdate(
          empleado._id,
          updatedEmpleado,
          { new: true }
        );

        if (!updated) {
          console.error("Error al encontrar o actualizar el empleado");
          return res
            .status(500)
            .json({ message: "Error al actualizar el empleado" });
        }

        console.log("Empleado actualizado:", updated);
        empleadosActualizados.push(updated);
      } catch (error) {
        console.error("Error al guardar empleado:", error);
        return res.status(500).json({ message: "Error al guardar empleado" });
      }
    }

    res.status(200).json(empleadosActualizados);
  } catch (error) {
    console.error("Error al aumentar el sueldo:", error);
    res
      .status(500)
      .json({ message: "Error interno al procesar el aumento de sueldo" });
  }
};

// Crear una nueva fabrica
export const createFabrica = async (req, res) => {
  try {
    const { nombre, date } = req.body;

    // Crear el nuevo empleado
    const nuevaFabrica = new Fabrica({
      nombre,
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
    await nuevaFabrica.save();

    // Devolver el nuevo empleado creado
    res.status(201).json(nuevaFabrica);
  } catch (error) {
    console.error("Error al crear el empleado:", error);
    res.status(500).json({ message: "Error al crear el empleado" });
  }
};

export const getFabricas = async (req, res) => {
  try {
    const empleados = await Fabrica.find({
      user_localidad: req.user.localidad,
    });
    res.json(empleados);
  } catch (error) {
    console.error("Error al obtener los empleados:", error);
    res.status(500).json({ message: "Error al obtener los empleados" });
  }
};

// Crear una nueva fabrica
export const createSectores = async (req, res) => {
  try {
    const { nombre, date } = req.body;

    // Crear el nuevo empleado
    const nuevaFabrica = new Sectores({
      nombre,
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
    await nuevaFabrica.save();

    // Devolver el nuevo empleado creado
    res.status(201).json(nuevaFabrica);
  } catch (error) {
    console.error("Error al crear el empleado:", error);
    res.status(500).json({ message: "Error al crear el empleado" });
  }
};

export const getSectores = async (req, res) => {
  try {
    const empleados = await Sectores.find({
      user_localidad: req.user.localidad,
    });
    res.json(empleados);
  } catch (error) {
    console.error("Error al obtener los empleados:", error);
    res.status(500).json({ message: "Error al obtener los empleados" });
  }
};
