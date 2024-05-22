import Gasto from "../models/gastos.model.js";
import Caja from "../models/cajas.model.js"; // Importa el modelo de Caja
import Banco from "../models/banco.model.js"; // Importa el modelo de Caja

// Obtener todos los gastos
export const getGastos = async (req, res) => {
  try {
    const gastos = await Gasto.find({ user: req.user.id }); // Buscar todos los gastos del usuario actual
    res.json(gastos);
  } catch (error) {
    console.error("Error al obtener los gastos:", error);
    res.status(500).json({ message: "Error al obtener los gastos" });
  }
};

// Obtener un gasto por ID
export const getGasto = async (req, res) => {
  try {
    const gasto = await Gasto.findById(req.params.id); // Buscar gasto por ID
    if (!gasto) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }
    res.json(gasto);
  } catch (error) {
    console.error("Error al obtener el gasto:", error);
    res.status(500).json({ message: "Error al obtener el gasto" });
  }
};

// Crear un nuevo gasto
const tiposDePagoBanco = [
  { id: 2, nombre: "tarjeta de Crédito" },
  { id: 3, nombre: "tarjeta de Débito" },
  { id: 4, nombre: "transferencia Bancaria" },
  { id: 5, nombre: "payPal" },
  { id: 6, nombre: "cheque" },
  { id: 7, nombre: "criptomonedas" },
];

// Crear un nuevo gasto
// export const createGasto = async (req, res) => {
//   try {
//     const {
//       empresa_proveedor,
//       detalles,
//       comprobante,
//       numero_factura,
//       fecha,
//       fecha_vencimiento,
//       terminos_pago,
//       categoria,
//       total,
//       impuestos_total,
//       descuentos_total,
//       total_final,
//       estado,
//       date,
//     } = req.body;

//     // Crear el nuevo gasto
//     const nuevoGasto = new Gasto({
//       empresa_proveedor,
//       detalles,
//       comprobante,
//       numero_factura,
//       fecha,
//       fecha_vencimiento,
//       terminos_pago,
//       categoria,
//       total,
//       impuestos_total,
//       descuentos_total,
//       total_final,
//       estado,
//       date,
//       user_nombre: req.user.nombre,
//       user_apellido: req.user.apellido,
//       user_localidad: req.user.localidad,
//       user_provincia: req.user.provincia,
//       user_fabrica: req.user.fabrica,
//       user_puesto_sector: req.user.puesto_sector,
//       username: req.user.username,
//       user: req.user.id,
//     });

//     // Guardar el nuevo gasto en la base de datos
//     await nuevoGasto.save();

//     if (terminos_pago === "efectivo") {
//       // Actualizar la caja
//       const caja = await Caja.findOne({ fabrica: req.user.fabrica });
//       if (!caja) {
//         return res.status(404).json({ message: "Caja no encontrada" });
//       }
//       // Descontar el total_final del saldo de la caja
//       caja.saldo -= total_final;
//       await caja.save();
//     } else if (tiposDePagoBanco.some((pago) => pago.nombre === terminos_pago)) {
//       // Actualizar el banco
//       const banco = await Banco.findOne({ fabrica: req.user.fabrica });
//       if (!banco) {
//         return res.status(404).json({ message: "Banco no encontrado" });
//       }
//       // Descontar el total_final del saldo del banco
//       banco.saldo -= total_final;
//       await banco.save();
//     }

//     // Devolver el nuevo gasto creado
//     res.status(201).json(nuevoGasto);
//   } catch (error) {
//     console.error("Error al crear el gasto:", error);
//     res.status(500).json({ message: "Error al crear el gasto" });
//   }
// };

// Crear un nuevo gasto
// export const createGasto = async (req, res) => {
//   try {
//     const {
//       empresa_proveedor,
//       detalles,
//       comprobante,
//       numero_factura,
//       fecha,
//       fecha_vencimiento,
//       terminos_pago,
//       categoria,
//       total,
//       impuestos_total,
//       descuentos_total,
//       total_final,
//       estado,
//       date,
//     } = req.body;

//     // Crear el nuevo gasto
//     const nuevoGasto = new Gasto({
//       empresa_proveedor,
//       detalles,
//       comprobante,
//       numero_factura,
//       fecha,
//       fecha_vencimiento,
//       terminos_pago,
//       categoria,
//       total,
//       impuestos_total,
//       descuentos_total,
//       total_final,
//       estado,
//       date,
//       user_nombre: req.user.nombre,
//       user_apellido: req.user.apellido,
//       user_localidad: req.user.localidad,
//       user_provincia: req.user.provincia,
//       user_fabrica: req.user.fabrica,
//       user_puesto_sector: req.user.puesto_sector,
//       username: req.user.username,
//       user: req.user.id,
//     });

//     // Guardar el nuevo gasto en la base de datos
//     await nuevoGasto.save();

//     // Agregar el movimiento a la caja o banco correspondiente
//     let cuentaDestino;
//     if (terminos_pago === "efectivo") {
//       // Actualizar la caja
//       cuentaDestino = await Caja.findOne({ fabrica: req.user.fabrica });
//     } else if (tiposDePagoBanco.some((pago) => pago.nombre === terminos_pago)) {
//       // Actualizar el banco
//       cuentaDestino = await Banco.findOne({ fabrica: req.user.fabrica });
//     }

//     if (!cuentaDestino) {
//       return res.status(404).json({ message: "Cuenta destino no encontrada" });
//     }

//     // Agregar el movimiento al arreglo movimientos_caja o movimientos_banco
//     cuentaDestino.movimientos_caja.push({
//       total: total_final,
//       comprobante,
//       fecha: date,
//       empresa_proveedor,
//       terminos_pago,
//       categoria,
//     });

//     // Guardar la cuenta actualizada
//     await cuentaDestino.save();

//     // Devolver el nuevo gasto creado
//     res.status(201).json(nuevoGasto);
//   } catch (error) {
//     console.error("Error al crear el gasto:", error);
//     res.status(500).json({ message: "Error al crear el gasto" });
//   }
// };
// Crear un nuevo gasto
export const createGasto = async (req, res) => {
  try {
    const {
      empresa_proveedor,
      detalles,
      comprobante,
      numero_factura,
      fecha,
      fecha_vencimiento,
      terminos_pago,
      categoria,
      total,
      impuestos_total,
      descuentos_total,
      total_final,
      estado,
      date,
    } = req.body;

    // Crear el nuevo gasto
    const nuevoGasto = new Gasto({
      empresa_proveedor,
      detalles,
      comprobante,
      numero_factura,
      fecha,
      fecha_vencimiento,
      terminos_pago,
      categoria,
      total,
      impuestos_total,
      descuentos_total,
      total_final,
      estado,
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

    // Guardar el nuevo gasto en la base de datos
    await nuevoGasto.save();

    // Obtener la cuenta destino (caja o banco)
    let cuentaDestino;
    if (terminos_pago === "efectivo") {
      // Actualizar la caja
      cuentaDestino = await Caja.findOne({ fabrica: req.user.fabrica });
    } else if (tiposDePagoBanco.some((pago) => pago.nombre === terminos_pago)) {
      // Actualizar el banco
      cuentaDestino = await Banco.findOne({ fabrica: req.user.fabrica });
    }

    if (!cuentaDestino) {
      return res.status(404).json({ message: "Cuenta destino no encontrada" });
    }

    // Descontar el total_final del saldo de la cuenta destino (caja o banco)
    cuentaDestino.saldo -= total_final;

    // Agregar el movimiento al arreglo movimientos_caja o movimientos_banco
    cuentaDestino.movimientos_caja.push({
      total: total_final,
      comprobante,
      fecha: date,
      empresa_proveedor,
      terminos_pago,
      categoria,
    });

    // Guardar la cuenta actualizada
    await cuentaDestino.save();

    // Devolver el nuevo gasto creado
    res.status(201).json(nuevoGasto);
  } catch (error) {
    console.error("Error al crear el gasto:", error);
    res.status(500).json({ message: "Error al crear el gasto" });
  }
};

// export const createGasto = async (req, res) => {
//   try {
//     const {
//       empresa_proveedor,
//       detalles,
//       comprobante,
//       numero_factura,
//       fecha,
//       fecha_vencimiento,
//       terminos_pago,
//       categoria,
//       total,
//       impuestos_total,
//       descuentos_total,
//       total_final,
//       estado,
//       date,
//     } = req.body;

//     // Crear el nuevo gasto
//     const nuevoGasto = new Gasto({
//       empresa_proveedor,
//       detalles,
//       comprobante,
//       numero_factura,
//       fecha,
//       fecha_vencimiento,
//       terminos_pago,
//       categoria,
//       total,
//       impuestos_total,
//       descuentos_total,
//       total_final,
//       estado,
//       date,
//       user_nombre: req.user.nombre,
//       user_apellido: req.user.apellido,
//       user_localidad: req.user.localidad,
//       user_provincia: req.user.provincia,
//       user_fabrica: req.user.fabrica,
//       user_puesto_sector: req.user.puesto_sector,
//       username: req.user.username,
//       user: req.user.id,
//     });

//     // Guardar el nuevo gasto en la base de datos
//     await nuevoGasto.save();

//     // Buscar la caja correspondiente (por ejemplo, por nombre y fábrica)
//     const caja = await Caja.findOne({
//       fabrica: req.user.fabrica,
//     });

//     if (!caja) {
//       return res.status(404).json({ message: "Caja no encontrada" });
//     }

//     // Descontar el total_final del saldo de la caja
//     caja.saldo -= total_final;

//     // Guardar los cambios en la caja
//     await caja.save();

//     // Devolver el nuevo gasto creado
//     res.status(201).json(nuevoGasto);
//   } catch (error) {
//     console.error("Error al crear el gasto:", error);
//     res.status(500).json({ message: "Error al crear el gasto" });
//   }
// };

// Actualizar un gasto por ID
export const updateGasto = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      empresa_proveedor,
      detalles,
      comprobante,
      numero_factura,
      fecha,
      fecha_vencimiento,
      terminos_pago,
      categoria,
      total,
      impuestos_total,
      descuentos_total,
      total_final,
      estado,
      date,
    } = req.body;

    // Buscar el gasto existente por ID
    const gastoExistente = await Gasto.findById(id);
    if (!gastoExistente) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }

    // Actualizar el gasto con los nuevos datos
    gastoExistente.detalles = detalles;
    gastoExistente.empresa_proveedor = empresa_proveedor;
    gastoExistente.comprobante = comprobante;
    gastoExistente.numero_factura = numero_factura;
    gastoExistente.fecha = fecha;
    gastoExistente.fecha_vencimiento = fecha_vencimiento;
    gastoExistente.terminos_pago = terminos_pago;
    gastoExistente.categoria = categoria;
    gastoExistente.total = total;
    gastoExistente.impuestos_total = impuestos_total;
    gastoExistente.descuentos_total = descuentos_total;
    gastoExistente.total_final = total_final;
    gastoExistente.estado = estado;
    gastoExistente.date = date;

    // Actualizar los campos específicos del usuario (asumiendo que no se deben cambiar directamente desde la solicitud)
    gastoExistente.user_nombre = req.user.nombre;
    gastoExistente.user_apellido = req.user.apellido;
    gastoExistente.user_localidad = req.user.localidad;
    gastoExistente.user_provincia = req.user.provincia;
    gastoExistente.user_fabrica = req.user.fabrica;
    gastoExistente.user_puesto_sector = req.user.puesto_sector;
    gastoExistente.username = req.user.username;
    gastoExistente.user = req.user.id;

    await gastoExistente.save(); // Guardar los cambios en la base de datos

    res.status(200).json(gastoExistente); // Devolver el gasto actualizado
  } catch (error) {
    console.error("Error al actualizar el gasto:", error);
    res.status(500).json({ message: "Error al actualizar el gasto" });
  }
};

// Eliminar un gasto por ID
export const deleteGasto = async (req, res) => {
  try {
    const gastoEliminado = await Gasto.findByIdAndDelete(req.params.id); // Buscar y eliminar el gasto por ID
    if (!gastoEliminado) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }
    res.sendStatus(204); // Devolver estado sin contenido si se eliminó correctamente
  } catch (error) {
    console.error("Error al eliminar el gasto:", error);
    res.status(500).json({ message: "Error al eliminar el gasto" });
  }
};

// Actualizar solo el estado de un gasto por ID
export const updateGastoEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    // Buscar y actualizar el estado del gasto por ID
    const gastoActualizado = await Gasto.findByIdAndUpdate(
      id,
      { estado },
      { new: true, runValidators: true } // Retornar el documento actualizado
    );

    if (!gastoActualizado) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }

    res.status(200).json(gastoActualizado); // Devolver el gasto con el estado actualizado
  } catch (error) {
    console.error("Error al actualizar el estado del gasto:", error);
    res
      .status(500)
      .json({ message: "Error al actualizar el estado del gasto" });
  }
};
