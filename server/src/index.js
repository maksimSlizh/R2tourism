const express = require('express');
const path = require('path');
const swagger = require('./swagger');
const placesRouter = require('./routes/places');
const authRouter = require('./routes/auth'); 
const mysql = require('mysql2/promise');

const app = express();

app.use(express.json()); 

app.use(placesRouter);
app.use('/auth', authRouter);

swagger(app);

app.use(express.static(path.join(__dirname, '../client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root', 
      database: 'my_database',
      port: 3306
    });
    console.log('Connected to MySQL database');
    return connection;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}

connectToDatabase()
  .then((connection) => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to start server:', error);
  });
