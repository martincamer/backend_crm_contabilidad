import Estadistica from "../models/estadistica.model.js";

// Obtener todas las estadísticas
export const getEstadisticas = async (req, res) => {
  try {
    const estadisticas = await Estadistica.find(); // Busca todas las estadísticas
    res.json(estadisticas); // Devuelve las estadísticas encontradas
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Obtener una estadística por ID
export const getEstadistica = async (req, res) => {
  try {
    const estadistica = await Estadistica.findById(req.params.id); // Buscar por ID
    if (!estadistica)
      return res.status(404).json({ message: "Estadística no encontrada" });

    return res.json(estadistica); // Devuelve la estadística encontrada
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Crear una nueva estadística
export const createEstadistica = async (req, res) => {
  try {
    const {
      canjes,
      egresos,
      presupuesto,
      user_nombre,
      user_apellido,
      user_localidad,
      user_provincia,
      user_fabrica,
      user_puesto_sector,
      username,
      user,
    } = req.body;

    // Crear la nueva estadística
    const nuevaEstadistica = new Estadistica({
      canjes,
      egresos,
      presupuesto,
      user_nombre,
      user_apellido,
      user_localidad,
      user_provincia,
      user_fabrica,
      user_puesto_sector,
      username,
      user,
    });

    await nuevaEstadistica.save();

    res.status(201).json(nuevaEstadistica); // Devuelve la estadística creada
  } catch (error) {
    console.error("Error al crear la estadística:", error);
    res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Actualizar una estadística existente
export const updateEstadistica = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      canjes,
      egresos,
      presupuesto,
      user_nombre,
      user_apellido,
      user_localidad,
      user_provincia,
      user_fabrica,
      user_puesto_sector,
      username,
      user,
    } = req.body;

    // Buscar la estadística existente por ID
    const estadisticaExistente = await Estadistica.findById(id);
    if (!estadisticaExistente) {
      return res.status(404).json({ message: "Estadística no encontrada" });
    }

    // Actualizar la estadística con los nuevos datos
    estadisticaExistente.canjes = canjes;
    estadisticaExistente.egresos = egresos;
    estadisticaExistente.presupuesto = presupuesto;
    estadisticaExistente.user_nombre = user_nombre;
    estadisticaExistente.user_apellido = user_apellido;
    estadisticaExistente.user_localidad = user_localidad;
    estadisticaExistente.user_provincia = user_provincia;
    estadisticaExistente.user_fabrica = user_fabrica;
    estadisticaExistente.user_puesto_sector = user_puesto_sector;
    estadisticaExistente.username = username;
    estadisticaExistente.user = user;

    // Guardar la estadística actualizada en la base de datos
    await estadisticaExistente.save();

    // Devolver la estadística actualizada
    res.status(200).json(estadisticaExistente);
  } catch (error) {
    console.error("Error al actualizar la estadística:", error);
    res.status(500).json({ message: "Error al actualizar la estadística" }); // Manejo de errores
  }
};

// Eliminar una estadística por ID
export const deleteEstadistica = async (req, res) => {
  try {
    const estadisticaEliminada = await Estadistica.findByIdAndDelete(
      req.params.id
    ); // Elimina la estadística por ID
    if (!estadisticaEliminada)
      return res.status(404).json({ message: "Estadística no encontrada" });

    return res.sendStatus(204); // Retorna sin contenido si se elimina correctamente
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

export const getEstadisticasFecha = async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    console.log("startDate:", startDate);
    console.log("endDate:", endDate);

    const empleados = await Estadistica.find({
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
