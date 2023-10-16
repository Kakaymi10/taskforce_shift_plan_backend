const express = require('express');
const UsersController = require('../controllers/usersController');

const router = express.Router();

router.get('/', UsersController.getAllUsers);

router.get('/user', UsersController.getUserByEmail);

router.patch('/user', UsersController.updateUser);

router.delete('/user', UsersController.deleteUser);

module.exports = router;
