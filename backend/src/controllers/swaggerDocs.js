const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Shift_Planner",
        version: "0.1.0",
        description:
          "This is a Shift_Planner API application made with Express and documented with Swagger"
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);

  module.exports = {
    swaggerUiServe : swaggerUi.serve,
    swaggerUiSetup: swaggerUi.setup(specs, { explorer: true })
  }