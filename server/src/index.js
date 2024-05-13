// server/src/index.js
const express = require('express');
const path = require('path');
const swagger = require('./swagger');
const placesRouter = require('./routes/places');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных MySQL:', err.message);
  } else {
    console.log('Успешное подключение к базе данных MySQL');
  }
});

app.use(express.json());

app.use('/api/places', placesRouter);

swagger(app);

app.use(express.static(path.join(__dirname, '../../client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Страница не найдена' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Что-то пошло не так' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
