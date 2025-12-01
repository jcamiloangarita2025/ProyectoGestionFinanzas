const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');


// Definir comportamiento y rutas de pagina de servicios de autorizacion

router.get("/test", (req, res) => {
  res.json({ ok: true, message: "AUTH OK" });
});

// Registro
router.post('/register', async (req, res) => {
  try {
    const { nombre, apellido, correo, username, password } = req.body;

    // Verificar que formulario este lleno completamente 
    if (
      !nombre || !nombre.trim() ||
      !apellido || !apellido.trim() ||
      !correo || !correo.trim() ||
      !username || !username.trim() ||
      !password || !password.trim()
    ) {
      return res.json({
        ok: false,
        message: 'Todos los campos son obligatorios'
      });
    }
    
    // Verificar que usuario no exista
    const exists = await Usuario.findOne({ username });
    if (exists) return res.json({ ok: false, message: 'Usuario ya existe' });

    const u = new Usuario({ nombre, apellido, correo, username, password });
    await u.save();
    res.json({ ok: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'error' });
  }
});

// Login 
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Usuario.findOne({ username });

    // Verificar si usuario existe 
    if (!user) {
      //return res.status(401).json({ error: "Credenciales incorrectas 1" });
      return res.json({
          ok: false,
          message: "Usuario no existe"
      });
    }

    // Verificar contraseña 
    if (user.password !== password) {
      //return res.status(401).json({ error: "Credenciales incorrectas 2" });
      return res.json({
          ok: false,
          message: "Contraseña incorrecta"
      });
    }

    // Si todo está bien
    res.json({ok: true, message: "OK", username });
  } catch (err) {
    console.error("ERROR LOGIN:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;