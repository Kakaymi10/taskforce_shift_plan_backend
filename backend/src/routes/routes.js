const express = require('express');
const swaggerUi = require('swagger-ui-express')
const authRoutes = require('./authRoutes');
const roleRoutes = require('./roleRoutes');
const swaggerFile = require('../swagger/swagger-output.json');
const usersRoutes = require('./userRoutes');
const CompanyRoutes = require('./campanyRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/roles', roleRoutes);

router.use('/companies', CompanyRoutes);

router.use('/users', usersRoutes);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = router;