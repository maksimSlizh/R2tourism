// server/src/index.js
const express = require('express');
const path = require('path');
const swagger = require('./swagger');
const placesRouter = require('./routes/places');

const app = express();

app.use(placesRouter);

swagger(app);

app.use(express.static(path.join(__dirname, '../client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
