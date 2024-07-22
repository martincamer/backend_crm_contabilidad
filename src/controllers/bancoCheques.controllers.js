import BancoCheques from "../models/bancoCheques.models.js";

// Obtener todos los bancos con cheques
export const getBancos = async (req, res) => {
  try {
    const bancos = await BancoCheques.find();
    res.json(bancos);
  } catch (error) {
    console.error("Error al obtener los bancos:", error);
    res.status(500).json({ message: "Error al obtener los bancos" });
  }
};

// Obtener un banco por ID con cheques
export const getBanco = async (req, res) => {
  try {
    const banco = await BancoCheques.findById(req.params.id);
    if (!banco) return res.status(404).json({ message: "Banco no encontrado" });

    return res.json(banco);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo banco con cheques
export const createBanco = async (req, res) => {
  try {
    const { nombre, localidad, provincia } = req.body;
    const fabrica = req.user.fabrica;

    const nuevoBanco = new BancoCheques({
      nombre,
      localidad,
      provincia,
      fabrica,
    });

    await nuevoBanco.save();

    res.status(201).json(nuevoBanco);
  } catch (error) {
    console.error("Error al crear el banco:", error);
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un banco existente con cheques
export const updateBanco = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, localidad, provincia } = req.body;

    const bancoExistente = await BancoCheques.findById(id);
    if (!bancoExistente) {
      return res.status(404).json({ message: "Banco no encontrado" });
    }

    bancoExistente.nombre = nombre;
    bancoExistente.localidad = localidad;
    bancoExistente.provincia = provincia;

    await bancoExistente.save();

    res.status(200).json(bancoExistente);
  } catch (error) {
    console.error("Error al actualizar el banco:", error);
    res.status(500).json({ message: "Error al actualizar el banco" });
  }
};

// Eliminar un banco por ID con cheques
export const deleteBanco = async (req, res) => {
  try {
    const bancoEliminado = await BancoCheques.findByIdAndDelete(req.params.id);
    if (!bancoEliminado)
      return res.status(404).json({ message: "Banco no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const agregarCheque = async (req, res) => {
  try {
    const { banco, ...datosCheque } = req.body; // Datos del formulario, incluyendo el nombre del banco

    // Verificar si el banco existe
    let bancoExistente = await BancoCheques.findOne({ nombre: banco });

    // Si el banco no existe, crear uno nuevo
    if (!bancoExistente) {
      bancoExistente = new BancoCheques({
        nombre: banco,
        fabrica: req.user.fabrica, // Suponiendo que obtienes la fábrica del usuario autenticado
        localidad: req.user.localidad, // Suponiendo que obtienes la localidad del usuario autenticado
        provincia: req.user.provincia, // Suponiendo que obtienes la provincia del usuario autenticado
        cheques: [], // Inicialmente no hay cheques
      });
    }

    // Crear un nuevo objeto de cheque
    const nuevoCheque = {
      total: datosCheque.total,
      tipo: datosCheque.tipo,
      numero_cheque: datosCheque.numero_cheque,
      datos: datosCheque.datos,
      numero_cuenta: datosCheque.numero_cuenta,
      fecha_cobro: datosCheque.fecha_cobro,
      banco: banco,
      date: datosCheque.date || new Date(), // Utilizar la fecha actual si no se proporciona una fecha
    };

    // Agregar el nuevo cheque al banco seleccionado
    bancoExistente.cheques.push(nuevoCheque);
    await bancoExistente.save();

    const bancosActualizados = await BancoCheques.find();

    res.status(201).json(bancosActualizados); // Devolver todos los bancos actualizados
  } catch (error) {
    console.error("Error al agregar el cheque:", error);
    res.status(500).json({ message: "Error al agregar el cheque" });
  }
};

export const eliminarCheque = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del cheque a eliminar

    // Buscar el banco que contiene el cheque
    const banco = await BancoCheques.findOne({ "cheques._id": id });

    if (!banco) {
      return res.status(404).json({ message: "Banco no encontrado" });
    }

    // Filtrar y eliminar el cheque del array de cheques del banco
    banco.cheques = banco.cheques.filter(
      (cheque) => cheque._id.toString() !== id
    );
    await banco.save();

    // Obtener todos los bancos actualizados después de eliminar el cheque
    const bancosActualizados = await BancoCheques.find();

    res.status(200).json(bancosActualizados); // Devolver todos los bancos actualizados en JSON
  } catch (error) {
    console.error("Error al eliminar el cheque:", error);
    res.status(500).json({ message: "Error al eliminar el cheque" });
  }
};

export const editarCheque = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del cheque a editar
    const { estado } = req.body; // Obtener el nuevo estado del cheque desde el cuerpo de la solicitud

    // Buscar el banco que contiene el cheque
    const banco = await BancoCheques.findOne({ "cheques._id": id });

    if (!banco) {
      return res.status(404).json({ message: "Banco no encontrado" });
    }

    // Encontrar el cheque dentro del array de cheques del banco por su ID
    const cheque = banco.cheques.find((cheque) => cheque._id.toString() === id);

    if (!cheque) {
      return res.status(404).json({ message: "Cheque no encontrado" });
    }

    // Actualizar el estado del cheque
    cheque.estado = estado;

    // Guardar el banco actualizado con el estado del cheque modificado
    await banco.save();

    // Obtener todos los bancos actualizados después de editar el cheque
    const bancosActualizados = await BancoCheques.find();

    res.status(200).json(bancosActualizados); // Devolver todos los bancos actualizados en JSON
  } catch (error) {
    console.error("Error al editar el cheque:", error);
    res.status(500).json({ message: "Error al editar el cheque" });
  }
};
