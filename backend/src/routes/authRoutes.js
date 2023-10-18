const express = require('express');
const authClass = require('../controllers/authControllers');
const AuthValidations = require('../controllers/validations/authValidations');

const router = express.Router();

router.post('/signup',AuthValidations.signUp, authClass.signUp);

router.get('/confirm-email', authClass.confirmEmail);

router.post('/login',AuthValidations.login, authClass.login);
router.post('/forgotpassword',AuthValidations.forgotPassword, authClass.forgotPassword);
router.put('/resetpassword', AuthValidations.reset, authClass.resetPassword)

router.post('/invite',AuthValidations.userInvite, authClass.userInvite);


module.exports = router;
