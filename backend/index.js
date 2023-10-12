const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models/index')
const allRoutes = require('./src/routes/routes')

dotenv.config();

const { PORT, DB_NAME } = process.env;

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

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
const { User } = db; // Assuming User is your User model
async function deleteAllUsers() {
  try {
    // Delete all users
    await User.destroy({
      where: {}, // An empty where clause matches all records
    });

    console.log('All users deleted successfully.');
  } catch (error) {
    console.error('Error deleting users:', error);
  }
}

// Call the function to delete all users
deleteAllUsers();


app.use('/shift-planner/api/v1', allRoutes);

// START SERVER
Promise.all([server, dbCon()]).catch((error) => {
  console.log(`Server error: ${error.message}`);
});

module.exports = app;
