import Salida from "../models/salida.model.js";
import dayjs from "dayjs"; // Asegúrate de tener dayjs instalado y correctamente importado

export const getSalidas = async (req, res) => {
  try {
    // const userLocalidad = req.user.localidad; // ID del usuario autenticado

    const inicioDelMes = dayjs().startOf("month").toDate(); // Inicio del mes actual
    const finDelMes = dayjs().endOf("month").toDate(); // Fin del mes actual
    // Busca las salidas del usuario actual dentro del rango del mes actual
    const salidasMensuales = await Salida.find({
      localidad: req.user.localidad,
      date: { $gte: inicioDelMes, $lte: finDelMes },
    });

    res.json(salidasMensuales); // Devuelve las salidas encontradas para el mes actual
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

export const getSalida = async (req, res) => {
  try {
    const salida = await Salida.findById(req.params.id); // Buscar por ID
    if (!salida)
      return res.status(404).json({ message: "Salida no encontrada" });

    return res.json(salida); // Devuelve la salida encontrada
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

export const createSalida = async (req, res) => {
  try {
    const {
      chofer_flete,
      chofer_vehiculo,
      km_viaje,
      km_precio,
      km_precio_flete,
      km_viaje_flete,
      espera_flete,
      total_viaticos,
      armador,
      motivo,
      clientes,
      total,
      date,
    } = req.body;

    // const { fabrica, username, localidad } = req.user;

    // Crear la nueva salida
    const nuevaSalida = new Salida({
      chofer_flete,
      chofer_vehiculo,
      km_viaje,
      km_precio,
      km_precio_flete,
      km_viaje_flete,
      espera_flete,
      total_viaticos,
      armador,
      motivo,
      total,
      clientes,
      date,
      fabrica: req.user.fabrica,
      username: req.user.username,
      localidad: req.user.localidad,
      user: req.user.id,
    });

    await nuevaSalida.save();

    res.status(201).json(nuevaSalida);
  } catch (error) {
    console.error("Error al crear la salida:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateSalida = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      chofer_flete,
      chofer_vehiculo,
      km_viaje,
      km_precio,
      km_precio_flete,
      km_viaje_flete,
      espera_flete,
      total_viaticos,
      armador,
      motivo,
      clientes,
      total,
      date,
    } = req.body;

    // Find the existing Salida by id
    const salidaExistente = await Salida.findById(id);
    if (!salidaExistente) {
      return res.status(404).json({ message: "Salida no encontrada" });
    }

    // Update the Salida with the new data
    salidaExistente.chofer_flete = chofer_flete;
    salidaExistente.chofer_vehiculo = chofer_vehiculo;
    salidaExistente.km_viaje = km_viaje;
    salidaExistente.km_precio = km_precio;
    salidaExistente.km_precio_flete = km_precio_flete;
    salidaExistente.km_viaje_flete = km_viaje_flete;
    salidaExistente.espera_flete = espera_flete;
    salidaExistente.total_viaticos = total_viaticos;
    salidaExistente.armador = armador;
    salidaExistente.motivo = motivo;
    salidaExistente.clientes = clientes;
    salidaExistente.total = total;
    salidaExistente.date = date;

    // Update user-specific fields (assuming they shouldn't be changed directly from the request)
    salidaExistente.fabrica = req.user.fabrica;
    salidaExistente.username = req.user.username;
    salidaExistente.localidad = req.user.localidad;
    salidaExistente.user = req.user.id;

    // Save the updated Salida to the database
    await salidaExistente.save();

    // Send back the updated Salida
    res.status(200).json(salidaExistente);
  } catch (error) {
    console.error("Error al editar la salida:", error);
    res.status(500).json({ message: "Error al editar la salida" });
  }
};

export const deleteSalida = async (req, res) => {
  try {
    const deleteSalida = await Salida.findByIdAndDelete(req.params.id); // Elimina la salida por ID
    if (!deleteSalida)
      return res.status(404).json({ message: "Salida no encontrada" });

    return res.sendStatus(204); // Retorna sin contenido si se elimina correctamente
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};
