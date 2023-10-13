const express = require('express');
const swaggerUi = require('swagger-ui-express')
const authRoutes = require('./authRoutes');
const swaggerFile = require('../swagger/swagger-output.json');
const usersRoutes = require('./userRoutes');

const router = express.Router();

router.use('/auth', authRoutes);

router.use('/users', usersRoutes);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = router;
