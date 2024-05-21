import Ingreso from "../models/ingresos.model.js"; // Importa el modelo de Ingreso
import Caja from "../models/cajas.model.js"; // Importa el modelo de Caja
import Banco from "../models/banco.model.js"; // Importa el modelo de Banco

const tiposDePagoBanco = [
  { id: 2, nombre: "tarjeta de Crédito" },
  { id: 3, nombre: "tarjeta de Débito" },
  { id: 4, nombre: "transferencia Bancaria" },
  { id: 5, nombre: "payPal" },
  { id: 6, nombre: "cheque" },
  { id: 7, nombre: "criptomonedas" },
];

// Obtener todos los ingresos
export const getIngresos = async (req, res) => {
  try {
    const ingresos = await Ingreso.find({ user: req.user.id });
    res.json(ingresos);
  } catch (error) {
    console.error("Error al obtener los ingresos:", error);
    res.status(500).json({ message: "Error al obtener los ingresos" });
  }
};

// Obtener un ingreso por ID
export const getIngreso = async (req, res) => {
  try {
    const ingreso = await Ingreso.findById(req.params.id);
    if (!ingreso) {
      return res.status(404).json({ message: "Ingreso no encontrado" });
    }
    res.json(ingreso);
  } catch (error) {
    console.error("Error al obtener el ingreso:", error);
    res.status(500).json({ message: "Error al obtener el ingreso" });
  }
};

// Crear un nuevo ingreso
export const createIngreso = async (req, res) => {
  try {
    const {
      total_ingreso,
      tipo_pago,
      comprobante,
      fecha,
      fecha_vencimiento,
      estado,
      observacion,
      date,
    } = req.body;

    // Crear el nuevo ingreso
    const nuevoIngreso = new Ingreso({
      total_ingreso,
      tipo_pago,
      comprobante,
      fecha,
      fecha_vencimiento,
      estado,
      observacion,
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

    // Guardar el nuevo ingreso en la base de datos
    await nuevoIngreso.save();

    if (tipo_pago === "efectivo") {
      // Actualizar la caja
      const caja = await Caja.findOne({ fabrica: req.user.fabrica });
      if (!caja) {
        return res.status(404).json({ message: "Caja no encontrada" });
      }
      // Incrementar el total_ingreso al saldo de la caja
      caja.saldo += Number(total_ingreso);
      await caja.save();
    } else if (tiposDePagoBanco.some((pago) => pago.nombre === tipo_pago)) {
      // Actualizar el banco
      const banco = await Banco.findOne({ fabrica: req.user.fabrica });
      if (!banco) {
        return res.status(404).json({ message: "Banco no encontrado" });
      }
      // Incrementar el total_ingreso al saldo del banco
      banco.saldo += Number(total_ingreso);
      await banco.save();
    }

    // Devolver el nuevo ingreso creado
    res.status(201).json(nuevoIngreso);
  } catch (error) {
    console.error("Error al crear el ingreso:", error);
    res.status(500).json({ message: "Error al crear el ingreso" });
  }
};

// Actualizar un ingreso por ID
export const updateIngreso = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      total_ingreso,
      tipo_pago,
      comprobante,
      fecha,
      fecha_vencimiento,
      estado,
      observacion,
      date,
    } = req.body;

    // Buscar el ingreso existente por ID
    const ingresoExistente = await Ingreso.findById(id);
    if (!ingresoExistente) {
      return res.status(404).json({ message: "Ingreso no encontrado" });
    }

    // Actualizar el ingreso con los nuevos datos
    ingresoExistente.total_ingreso = total_ingreso;
    ingresoExistente.tipo_pago = tipo_pago;
    ingresoExistente.comprobante = comprobante;
    ingresoExistente.fecha = fecha;
    ingresoExistente.fecha_vencimiento = fecha_vencimiento;
    ingresoExistente.estado = estado;
    ingresoExistente.observación = observacion;
    ingresoExistente.date = date;

    // Actualizar los campos específicos del usuario
    ingresoExistente.user_nombre = req.user.nombre;
    ingresoExistente.user_apellido = req.user.apellido;
    ingresoExistente.user_localidad = req.user.localidad;
    ingresoExistente.user_provincia = req.user.provincia;
    ingresoExistente.user_fabrica = req.user.fabrica;
    ingresoExistente.user_puesto_sector = req.user.puesto_sector;
    ingresoExistente.username = req.user.username;
    ingresoExistente.user = req.user.id;

    await ingresoExistente.save(); // Guardar los cambios en la base de datos

    res.status(200).json(ingresoExistente); // Devolver el ingreso actualizado
  } catch (error) {
    console.error("Error al actualizar el ingreso:", error);
    res.status(500).json({ message: "Error al actualizar el ingreso" });
  }
};

// Eliminar un ingreso por ID
export const deleteIngreso = async (req, res) => {
  try {
    const ingresoEliminado = await Ingreso.findByIdAndDelete(req.params.id); // Buscar y eliminar el ingreso por ID
    if (!ingresoEliminado) {
      return res.status(404).json({ message: "Ingreso no encontrado" });
    }
    res.sendStatus(204); // Devolver estado sin contenido si se eliminó correctamente
  } catch (error) {
    console.error("Error al eliminar el ingreso:", error);
    res.status(500).json({ message: "Error al eliminar el ingreso" });
  }
};

// Actualizar solo el estado de un ingreso por ID
export const updateIngresoEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    // Buscar y actualizar el estado del ingreso por ID
    const ingresoActualizado = await Ingreso.findByIdAndUpdate(
      id,
      { estado },
      { new: true, runValidators: true } // Retornar el documento actualizado
    );

    if (!ingresoActualizado) {
      return res.status(404).json({ message: "Ingreso no encontrado" });
    }

    res.status(200).json(ingresoActualizado); // Devolver el ingreso con el estado actualizado
  } catch (error) {
    console.error("Error al actualizar el estado del ingreso:", error);
    res
      .status(500)
      .json({ message: "Error al actualizar el estado del ingreso" });
  }
};
