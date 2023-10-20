const express = require('express');
const UsersController = require('../controllers/usersController');
const checkUserRole = require('../middlewares/checkUserRole');

const router = express.Router();

router.get('/', UsersController.getAllUsers);

router.get('/user', UsersController.getUserByEmail);

router.patch('/user', checkUserRole('Admin','SuperAdmin'), UsersController.updateUser);

router.delete('/user', UsersController.deleteUser);

module.exports = router;
