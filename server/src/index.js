const express = require('express');
const path = require('path');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const apiRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');
const { initializeDatabase, connectToDatabase } = require('./db');

// Needed for sequelize and sequelize models
// const sequelize = require('./db');
// Models should be imported! for creating tables
// require('./models/user');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
// You can use one router for all routes
app.use('/api', apiRouter);
app.use('/auth', authRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});

// Initialize database and start server
connectToDatabase()
  .then(async () => {
    await initializeDatabase(); // Initialize the database schema
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to start server:', error);
  });

//variant how can be work with sequelize

// const start = async () => {
//   try {
//     // Connect to the database
//     await sequelize.authenticate();
//     // Initialize the database schema
//     await sequelize.sync();
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// start();
