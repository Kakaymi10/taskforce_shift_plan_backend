const express = require('express');
const swaggerUi = require('swagger-ui-express')
const authRoutes = require('./authRoutes');
const swaggerFile = require('../swagger/swagger-output.json');
const departmentRoutes = require('./departmentRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/departments', departmentRoutes);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = router;
