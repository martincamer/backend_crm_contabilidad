import Cliente from "../models/clientes.model.js"; // Asegúrate de importar el modelo de cliente correctamente

// Obtener todos los clientes
export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find(); // Busca todos los clientes
    res.json(clientes); // Devuelve los clientes encontrados
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Obtener un cliente por ID
export const getCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id); // Buscar por ID
    if (!cliente)
      return res.status(404).json({ message: "Cliente no encontrado" });

    return res.json(cliente); // Devuelve el cliente encontrado
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Crear un nuevo cliente
export const createCliente = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      dni,
      plan,
      provincia,
      localidad,
      direccion,
      telefono,
      email,
      edad,
      numero_contrato,
      entregas,
      estado,
      seña,
      total_vivienda,
      date,
    } = req.body;

    // Crear el nuevo cliente
    const nuevoCliente = new Cliente({
      nombre,
      apellido,
      dni,
      plan,
      provincia,
      localidad,
      direccion,
      telefono,
      email,
      edad,
      numero_contrato,
      entregas,
      estado,
      seña,
      total_vivienda,
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

    // Crear cuotas_plan por defecto según el plan especificado
    if (!isNaN(plan)) {
      const numeroCuotas = parseInt(plan, 10);
      const cuotasDefault = Array.from(
        { length: numeroCuotas },
        (_, index) => ({
          numero: index + 1,
          total: 0,
          comprobante: "",
        })
      );
      nuevoCliente.cuotas_plan = cuotasDefault;
    }

    await nuevoCliente.save();

    res.status(201).json(nuevoCliente); // Devuelve el cliente creado
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Actualizar un cliente existente
// export const updateCliente = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const clienteActualizado = req.body;

//     // Actualizar el cliente con los nuevos datos
//     const resultado = await Cliente.findByIdAndUpdate(id, clienteActualizado, {
//       new: true,
//     });

//     if (!resultado) {
//       return res.status(404).json({ message: "Cliente no encontrado" });
//     }

//     // Devolver el cliente actualizado
//     res.status(200).json(resultado);
//   } catch (error) {
//     console.error("Error al actualizar el cliente:", error);
//     res.status(500).json({ message: "Error al actualizar el cliente" }); // Manejo de errores
//   }
// };

export const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { cuotaId, total, comprobante } = req.body;

    // Buscar el cliente por ID
    const cliente = await Cliente.findById(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Buscar la cuota específica en el plan de cuotas y actualizarla
    const cuota = cliente.cuotas_plan.id(cuotaId);
    if (!cuota) {
      return res.status(404).json({ message: "Cuota no encontrada" });
    }

    // Actualizar los campos total y comprobante
    cuota.total = total;
    cuota.comprobante = comprobante;

    // Guardar el cliente actualizado
    await cliente.save();

    // Devolver el cliente actualizado
    res.status(200).json(cliente);
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    res.status(500).json({ message: "Error al actualizar el cliente" }); // Manejo de errores
  }
};

// Eliminar un cliente por ID
export const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteEliminado = await Cliente.findByIdAndDelete(id); // Elimina el cliente por ID
    if (!clienteEliminado)
      return res.status(404).json({ message: "Cliente no encontrado" });

    return res.sendStatus(204); // Retorna sin contenido si se elimina correctamente
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};
