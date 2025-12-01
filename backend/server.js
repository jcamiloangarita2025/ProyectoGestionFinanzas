const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const regRoutes = require('./routes/registrosF');

const app = express();
app.use(cors());
app.use(express.json());

// URL para conectar con Mongo
mongoose.connect('mongodb://127.0.0.1:27017/BDproyecto', {
}).then(() => console.log('Mongo conectado'))
  .catch(err => console.error('Error Mongo:', err));

app.use('/api/auth', authRoutes);
app.use('/api/registrosF', regRoutes);

app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Backend escuchando en puerto', PORT));