const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API eCocina',
      version: '1.0.0',
      description: 'Documentación de la API de eCocina',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerSpec };
