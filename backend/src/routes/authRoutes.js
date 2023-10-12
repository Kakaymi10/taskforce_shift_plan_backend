const express = require('express');
const authClass = require('../controllers/authControllers');
const AuthValidations = require('../controllers/validations/authValidations');

const router = express.Router();

router.post('/signup',AuthValidations.signUp, authClass.signUp);

router.get('/confirm-email', authClass.confirmEmail);

router.post('/login',AuthValidations.login, authClass.login);


module.exports = router;
