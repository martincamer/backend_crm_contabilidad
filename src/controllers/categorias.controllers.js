import Categoria from "../models/categorias.model.js";

// Obtener todas las categorías
export const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find(); // Busca todas las categorías
    res.json(categorias); // Devuelve las categorías encontradas
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Obtener una categoría por ID
export const getCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id); // Buscar por ID
    if (!categoria)
      return res.status(404).json({ message: "Categoría no encontrada" });

    return res.json(categoria); // Devuelve la categoría encontrada
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Crear una nueva categoría
export const createCategoria = async (req, res) => {
  try {
    const { nombre, observacion, date } = req.body;

    // Crear la nueva categoría
    const nuevaCategoria = new Categoria({
      nombre,
      observacion,
      date,
    });

    await nuevaCategoria.save();

    res.status(201).json(nuevaCategoria); // Devuelve la categoría creada
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Actualizar una categoría existente
export const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, observacion, date } = req.body;

    // Buscar la categoría existente por ID
    const categoriaExistente = await Categoria.findById(id);
    if (!categoriaExistente) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    // Actualizar la categoría con los nuevos datos
    categoriaExistente.nombre = nombre;
    categoriaExistente.observacion = observacion;
    categoriaExistente.date = date;

    // Guardar la categoría actualizada en la base de datos
    await categoriaExistente.save();

    // Devolver la categoría actualizada
    res.status(200).json(categoriaExistente);
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    res.status(500).json({ message: "Error al actualizar la categoría" }); // Manejo de errores
  }
};

// Eliminar una categoría por ID
export const deleteCategoria = async (req, res) => {
  try {
    const categoriaEliminada = await Categoria.findByIdAndDelete(req.params.id); // Elimina la categoría por ID
    if (!categoriaEliminada)
      return res.status(404).json({ message: "Categoría no encontrada" });

    return res.sendStatus(204); // Retorna sin contenido si se elimina correctamente
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};
