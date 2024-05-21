import Banco from "../models/banco.model.js";

// Obtener todos los bancos
export const getBancos = async (req, res) => {
  try {
    const bancos = await Banco.find({ fabrica: req.user.fabrica }); // Buscar todos los bancos del usuario actual
    res.json(bancos);
  } catch (error) {
    console.error("Error al obtener los bancos:", error);
    res.status(500).json({ message: "Error al obtener los bancos" });
  }
};

// Obtener un banco por ID
export const getBanco = async (req, res) => {
  try {
    const banco = await Banco.findById(req.params.id); // Buscar por ID
    if (!banco) return res.status(404).json({ message: "Banco no encontrado" });

    return res.json(banco); // Devuelve el banco encontrado
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Crear un nuevo banco
export const createBanco = async (req, res) => {
  try {
    const { nombre, saldo, fabrica, localidad, provincia } = req.body;

    // Crear el nuevo banco
    const nuevoBanco = new Banco({
      nombre,
      saldo,
      fabrica,
      localidad,
      provincia,
    });

    await nuevoBanco.save();

    res.status(201).json(nuevoBanco); // Devuelve el banco creado
  } catch (error) {
    console.error("Error al crear el banco:", error);
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un banco existente
export const updateBanco = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, saldo, fabrica, localidad, provincia } = req.body;

    // Buscar el banco existente por ID
    const bancoExistente = await Banco.findById(id);
    if (!bancoExistente) {
      return res.status(404).json({ message: "Banco no encontrado" });
    }

    // Actualizar el banco con los nuevos datos
    bancoExistente.nombre = nombre;
    bancoExistente.saldo = saldo;
    bancoExistente.fabrica = fabrica;
    bancoExistente.localidad = localidad;
    bancoExistente.provincia = provincia;

    // Guardar el banco actualizado en la base de datos
    await bancoExistente.save();

    // Devolver el banco actualizado
    res.status(200).json(bancoExistente);
  } catch (error) {
    console.error("Error al actualizar el banco:", error);
    res.status(500).json({ message: "Error al actualizar el banco" });
  }
};

// Eliminar un banco por ID
export const deleteBanco = async (req, res) => {
  try {
    const bancoEliminado = await Banco.findByIdAndDelete(req.params.id);
    if (!bancoEliminado)
      return res.status(404).json({ message: "Banco no encontrado" });

    return res.sendStatus(204); //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
