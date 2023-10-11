const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'Shift Planner API'
    },
    host: 'localhost:3000',
    basePath: "/shift-planner/api/v1", 
    schemes: ['http'],
  };
  
  const outputFile = './swagger-output.json';
  const endpointsFiles = ['../routes/routes.js'];
  
  swaggerAutogen(outputFile, endpointsFiles, doc);