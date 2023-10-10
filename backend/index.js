import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models/index';

const routes = require('./src/routes/routes');
const { swaggerUiServe, swaggerUiSetup } = require('./src/controllers/swaggerDocs')

dotenv.config();

const { PORT, DB_NAME } = process.env;

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to our app!!' });
});


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to our app!!' });
});



const server = app.listen(PORT || 3000, () => {
  console.log(`Server started on port ${PORT}`);
});

// INITIATE DATABASE CONNECTION
const dbCon = async () => {
  try {
    await db.sequelize.authenticate();
    console.log(`Database ${DB_NAME} connected successfully`);
  } catch (error) {
    console.log(error);
  } 
  
};

app.use(routes)

app.use(
  "/shift-planner/api-docs",
  swaggerUiServe,
  swaggerUiSetup
);

// START SERVER
Promise.all([server, dbCon()]).catch((error) => {
  console.log(`Server error: ${error.message}`);
});

export default app;
