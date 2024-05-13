// server/src/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'R2tourism API',
      version: '1.0.0',
      description: 'API для R2tourism приложения',
    },
  },
  apis: ['./src/routes/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
