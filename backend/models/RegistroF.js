const mongoose = require('mongoose');

const RegistroF_Schema = new mongoose.Schema({
  usuario: { type: String, required: true },
  descripcion: { type: String, required: true },
  monto: { type: Number, required: true },
  tipo: { type: String, enum: ['Gasto', 'Ingreso'], required: true},
  categoria: { type: String, required: true},
  responsable: { type: String, required: true},
  fechaMovimiento: {type: Date,required: true},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registros Financieros', RegistroF_Schema);