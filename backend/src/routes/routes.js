const express = require('express');
const authRoutes = require('./authRoutes');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger/swagger-output.json');

const router = express.Router();

router.use('/auth', authRoutes);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = router;
