import Caja from "../models/cajas.model.js";

// export const getCajas = async (req, res) => {
//   try {
//     const cajas = await Caja.find(); // Busca todas las cajas
//     res.json(cajas); // Devuelve las cajas encontradas
//   } catch (error) {
//     return res.status(500).json({ message: error.message }); // Manejo de errores
//   }
// };

export const getCajas = async (req, res) => {
  try {
    const cajas = await Caja.find({ fabrica: req.user.fabrica }); // Buscar todos los cajas del usuario actual
    res.json(cajas);
  } catch (error) {
    console.error("Error al obtener los cajas:", error);
    res.status(500).json({ message: "Error al obtener los cajas" });
  }
};

// Obtener una caja por ID
export const getCaja = async (req, res) => {
  try {
    const caja = await Caja.findById(req.params.id); // Buscar por ID
    if (!caja) return res.status(404).json({ message: "Caja no encontrada" });

    return res.json(caja); // Devuelve la caja encontrada
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Crear una nueva caja
export const createCaja = async (req, res) => {
  try {
    const { nombre, saldo, fabrica, localidad, provincia } = req.body;

    // Crear la nueva caja
    const nuevaCaja = new Caja({
      nombre,
      saldo,
      fabrica,
      localidad,
      provincia,
    });

    await nuevaCaja.save();

    res.status(201).json(nuevaCaja); // Devuelve la caja creada
  } catch (error) {
    console.error("Error al crear la caja:", error);
    res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Actualizar una caja existente
export const updateCaja = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, saldo, fabrica, localidad, provincia } = req.body;

    // Buscar la caja existente por ID
    const cajaExistente = await Caja.findById(id);
    if (!cajaExistente) {
      return res.status(404).json({ message: "Caja no encontrada" });
    }

    // Actualizar la caja con los nuevos datos
    cajaExistente.nombre = nombre;
    cajaExistente.saldo = saldo;
    cajaExistente.fabrica = fabrica;
    cajaExistente.localidad = localidad;
    cajaExistente.provincia = provincia;

    // Guardar la caja actualizada en la base de datos
    await cajaExistente.save();

    // Devolver la caja actualizada
    res.status(200).json(cajaExistente);
  } catch (error) {
    console.error("Error al actualizar la caja:", error);
    res.status(500).json({ message: "Error al actualizar la caja" }); // Manejo de errores
  }
};

// Eliminar una caja por ID
export const deleteCaja = async (req, res) => {
  try {
    const cajaEliminada = await Caja.findByIdAndDelete(req.params.id); // Elimina la caja por ID
    if (!cajaEliminada)
      return res.status(404).json({ message: "Caja no encontrada" });

    return res.sendStatus(204); // Retorna sin contenido si se elimina correctamente
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};
