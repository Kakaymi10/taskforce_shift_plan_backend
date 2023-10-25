const express = require('express');
const authClass = require('../controllers/authControllers');
const AuthValidations = require('../validations/authValidations');
const checkUserRole = require('../middlewares/checkUserRole');

const router = express.Router();

router.post('/signup', AuthValidations.signUp, authClass.signUp);
// router.post('/superAdmin/signup',  authClass.superAdminSignUp);

router.get('/confirm/user/:userId/:token', authClass.confirmEmail);

router.post('/login',AuthValidations.login, authClass.login);
router.post('/forgotpassword',AuthValidations.forgotPassword, authClass.forgotPassword);
router.put('/resetpassword/:token', AuthValidations.reset, authClass.resetPassword)

router.post('/invite',checkUserRole('superAdmin', 'Admin', 'Manager'),AuthValidations.userInvite, authClass.userInvite);

module.exports = router;
