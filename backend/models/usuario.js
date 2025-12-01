const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},{
  timestamps: true
});

module.exports = mongoose.model('Usuario', UsuarioSchema);