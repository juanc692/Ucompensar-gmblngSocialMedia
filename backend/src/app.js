const express = require('express');
const cors = require("cors");
require('dotenv').config();
const db = require('./config/db');

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

db.getConnection()
  .then(() => console.log('MySQL conectado correctamente'))
  .catch(err => console.error('Error conectando a MySQL:', err));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/forum', require('./routes/forum.routes'));
app.use('/api/activities', require('./routes/activity.routes'));

app.get('/api/ping', (req, res) => {
  res.json({ message: 'Servidor funcionando' });
});


app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
