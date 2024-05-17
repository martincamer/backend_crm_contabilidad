import Proveedor from "../models/proveedor.model.js";

// Obtener todos los proveedores
export const getProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find(); // Busca todos los proveedores
    res.json(proveedores); // Devuelve los proveedores encontrados
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Obtener un proveedor por ID
export const getProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id); // Buscar por ID
    if (!proveedor)
      return res.status(404).json({ message: "Proveedor no encontrado" });

    return res.json(proveedor); // Devuelve el proveedor encontrado
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Crear un nuevo proveedor
export const createProveedor = async (req, res) => {
  try {
    const {
      nombre,
      telefono,
      direccion,
      provincia,
      localidad,
      cp,
      pais,
      observaciones,
      date,
    } = req.body;

    // Crear el nuevo proveedor
    const nuevoProveedor = new Proveedor({
      nombre,
      telefono,
      direccion,
      provincia,
      localidad,
      cp,
      pais,
      observaciones,
      date,
    });

    await nuevoProveedor.save();

    res.status(201).json(nuevoProveedor); // Devuelve el proveedor creado
  } catch (error) {
    console.error("Error al crear el proveedor:", error);
    res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Actualizar un proveedor existente
export const updateProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      telefono,
      direccion,
      provincia,
      localidad,
      cp,
      pais,
      observaciones,
      date,
    } = req.body;

    // Buscar el proveedor existente por ID
    const proveedorExistente = await Proveedor.findById(id);
    if (!proveedorExistente) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    // Actualizar el proveedor con los nuevos datos
    proveedorExistente.nombre = nombre;
    proveedorExistente.telefono = telefono;
    proveedorExistente.direccion = direccion;
    proveedorExistente.provincia = provincia;
    proveedorExistente.localidad = localidad;
    proveedorExistente.cp = cp;
    proveedorExistente.pais = pais;
    proveedorExistente.observaciones = observaciones;
    proveedorExistente.date = date;

    // Guardar el proveedor actualizado en la base de datos
    await proveedorExistente.save();

    // Devolver el proveedor actualizado
    res.status(200).json(proveedorExistente);
  } catch (error) {
    console.error("Error al actualizar el proveedor:", error);
    res.status(500).json({ message: "Error al actualizar el proveedor" }); // Manejo de errores
  }
};

// Eliminar un proveedor por ID
export const deleteProveedor = async (req, res) => {
  try {
    const proveedorEliminado = await Proveedor.findByIdAndDelete(req.params.id); // Elimina el proveedor por ID
    if (!proveedorEliminado)
      return res.status(404).json({ message: "Proveedor no encontrado" });

    return res.sendStatus(204); // Retorna sin contenido si se elimina correctamente
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};
