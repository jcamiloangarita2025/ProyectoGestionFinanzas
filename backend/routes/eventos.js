const express = require("express");
const router = express.Router();
const Evento = require("../models/Evento");
const RegistroF = require("../models/RegistroF");

// Obtener eventos POR USUARIO

router.get("/", async (req, res) => {
  const { user } = req.query;
  if (!user) return res.json([]);

  const eventos = await Evento.find({ usuario: user }).sort({ fechaEvento: 1 });
  res.json(eventos);
});

//  Crear evento
router.post("/", async (req, res) => {
  
  try{
    const { usuario, titulo, monto, tipo, categoria, responsable, fechaEvento } = req.body;
    // Verificar que formulario este lleno completamente 
        if (!usuario ||!titulo || !monto || !tipo || !categoria || !responsable || !fechaEvento) {
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
    
        const event = new Evento({ usuario, titulo, monto, tipo, categoria, responsable, fechaEvento });
        await event.save();
        res.json({ ok: true, event , message: 'Evento Financiero Guardado Correctamente'});

    }catch (err) {
        console.error(err);
        res.status(500).json({ ok: false });
   } 

  
});

//  Editar
router.put("/:id", async (req, res) => {

    try{
        const { usuario, titulo, monto, tipo, categoria, responsable, fechaEvento } = req.body;
        const eventoupd = await Evento.findByIdAndUpdate(
        req.params.id,
        { usuario, titulo, monto, tipo, categoria, responsable, fechaEvento },
        { new: true });

        //Verificar si registro existe
        if (!eventoupd) {
            return res.json({ ok: false, message: 'Registro no encontrado'});
        }
        res.json({ok:true, evento: eventoupd, message: 'Registro Financiero actualizado'});

    }catch(err){
        console.error(err);
        res.status(500).json({ ok: false });
    }
 
});

//  Eliminar
router.delete("/:id", async (req, res) => {

    try {
      await Evento.findByIdAndDelete(req.params.id);
      res.json({ ok: true, message: 'Evento Financiero borrado' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ ok: false });
    }
});

// Ver eventos vencidos (fechaEvento < hoy)
router.get("/vencidos", async (req, res) => {
  try {
    const { user } = req.query;
    if (!user) return res.json([]);

    // Fecha actual sin hora (solo día)
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const vencidos = await Evento.find({
      usuario: user,
      fechaEvento: { $lt: hoy }
    }).sort({ fechaEvento: 1 });

    res.json(vencidos);

  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

// Registrar evento como registro financiero (usuario desde frontend)
router.post("/registrar/:id", async (req, res) => {
  try {
    const { usuario } = req.body; // viene desde la URL del frontend

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        message: "Usuario no enviado"
      });
    }

    const evento = await Evento.findById(req.params.id);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        message: "Evento no encontrado"
      });
    }

    // Crear registro financiero usando el usuario de la URL
    const nuevoRegistro = new RegistroF({
      fechaMovimiento: evento.fechaEvento,
      descripcion: evento.titulo,
      monto: evento.monto,
      tipo: evento.tipo,
      categoria: evento.categoria,
      responsable: evento.responsable,
      usuario: usuario             
    });

    await nuevoRegistro.save();

    //Eliminar el evento después de registrar
    await Evento.findByIdAndDelete(req.params.id);

    res.json({
      ok: true,
      message: "Evento registrado como movimiento financiero"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Error en el servidor"
    });
  }
});




module.exports = router;
