const express = require('express');
const UsersController = require('../controllers/usersController');
const checkUserRole = require('../middlewares/checkUserRole');

const router = express.Router();

router.get('/', checkUserRole('Admin', 'SuperAdmin', 'Manager'),UsersController.getAllUsers);

router.get('/user', checkUserRole('Admin', 'SuperAdmin', 'Manager'), UsersController.getUserByEmail);

router.patch('/', checkUserRole('Admin','SuperAdmin'), UsersController.updateUser);

router.delete('/', checkUserRole('Admin', 'SuperAdmin', 'Manager'),UsersController.deleteUser);

module.exports = router;
