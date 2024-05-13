// server/src/index.js
const express = require('express');
const swagger = require('./swagger'); 
const placesRouter = require('./routes/places'); 

const app = express();

app.get('/', (req, res) => {
  res.send('Main');
});

app.use(placesRouter);

swagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
