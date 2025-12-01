const express = require('express');
const router = express.Router();
const RegistroF = require('../models/RegistroF');
const Usuario = require('../models/usuario');


// Definir comportamiento CRUD para registros financieros 

router.post('/', async (req, res) => {
  try {
    const { usuario, descripcion, monto, tipo, categoria, responsable, fechaMovimiento } = req.body;

    // Verificar que formulario este lleno completamente 
    if (!usuario ||!descripcion || !monto || !tipo || !categoria || !responsable || !fechaMovimiento) {
      return res.json({
        ok: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    // Validación estricta del dropdown
    if (!['Gasto', 'Ingreso'].includes(tipo)) {
      return res.json({
        ok: false,
        message: 'Tipo inválido'
      });
    }

    // Validar que monto sea número
    if (isNaN(monto)) {
      return res.status(400).json({
        ok: false,
        message: "El monto debe ser un número"
      });
    }

    // Validar que sea mayor que 0
    if (Number(monto) <= 0) {
      return res.status(400).json({
        ok: false,
        message: "El monto debe ser mayor a 0"
      });
    }

    const mov = new RegistroF({ usuario, descripcion, monto, tipo, categoria, responsable, fechaMovimiento });
    await mov.save();
    res.json({ ok: true, mov , message: 'Registro Financiero Guardado Correctamente'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});



// Reportes financieros
router.get('/', async (req, res) => {
  try {
    const user = req.query.user;

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "El parámetro 'user' es obligatorio"
      });
    }

    //Por si usuario no existe, enviar mensaje
    const existeUsuario = await Usuario.findOne({username: user });
    if (!existeUsuario) {
      return res.status(404).json({ message: "Usuario no existe" });
    }

    const lista = await RegistroF.find({ usuario: user }).sort({ createdAt: -1 });
  
    // Enviar lista de registros (reportes)
    return res.status(200).json(lista);
    
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

// Actualizar movimiento por id
router.put('/:id', async (req, res) => {
  try {
    const {descripcion,monto,tipo,categoria,responsable,fechaMovimiento} = req.body;
    const upd = await RegistroF.findByIdAndUpdate(
      req.params.id,
      { descripcion,monto, tipo,categoria,responsable, fechaMovimiento},
      { new: true }   
    );

    //Verificar si registro existe
    if (!upd) {
      return res.json({ ok: false, message: 'Registro no encontrado'
      });
    }
    res.json({ ok: true, registroF: upd, message: 'Registro Financiero actualizado'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});


// Borrar movimiento
router.delete('/:id', async (req, res) => {
  try {
    await RegistroF.findByIdAndDelete(req.params.id);
    res.json({ ok: true, message: 'Registro Financiero borrado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

module.exports = router;