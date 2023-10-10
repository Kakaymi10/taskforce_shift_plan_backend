<<<<<<< HEAD
const express = require('express');
const authClass = require('../controllers/authControllers');
const AuthValidations = require('../controllers/validations/authValidations');

const router = express.Router();

router.post('/signup',AuthValidations.signUp, authClass.signUp);

module.exports = router;
=======
import express from 'express';
import authClass from '../controllers/authController';

const router = express.Router();

router.post('/login', authClass.login);

export default router;
>>>>>>> fedd945 (Feature (added use Login))
