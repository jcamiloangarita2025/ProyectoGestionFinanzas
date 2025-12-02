const mongoose = require("mongoose");

// Definir modelo para base de datos 

const EventoSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  titulo: { type: String, required: true },
  monto: { type: Number, required: true },
  tipo: { type: String, enum: ["Gasto", "Ingreso"], required: true },
  categoria: { type: String, required: true },
  responsable: { type: String, required: true },
  fechaEvento: { type: Date, required: true },
  fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Evento", EventoSchema);
