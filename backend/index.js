<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models/index')
const allRoutes = require('./src/routes/routes')
=======
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models/index';
import allRoutes from './src/routes/router';

const { swaggerUiServe, swaggerUiSetup } = require('./src/controllers/swaggerDocs')
>>>>>>> fedd945 (Feature (added use Login))

dotenv.config();

const { PORT, DB_NAME } = process.env;

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

app.use('/shift-planner/api/v1', allRoutes);

<<<<<<< HEAD

=======
>>>>>>> fedd945 (Feature (added use Login))
const server = app.listen(PORT || 3000, () => {
  console.log(`Server started on port ${PORT}`);
});

<<<<<<< HEAD
// INITIATE DATABASE CONNECTION
=======
>>>>>>> fedd945 (Feature (added use Login))
const dbCon = async () => {
  try {
    await db.sequelize.authenticate();
    console.log(`Database ${DB_NAME} connected successfully`);
  } catch (error) {
    console.log(error);
  } 
  
};

app.use('/shift-planner/api/v1', allRoutes);

// START SERVER
Promise.all([server, dbCon()]).catch((error) => {
  console.log(`Server error: ${error.message}`);
});

<<<<<<< HEAD
module.exports = app;
=======
export default app;
>>>>>>> fedd945 (Feature (added use Login))
