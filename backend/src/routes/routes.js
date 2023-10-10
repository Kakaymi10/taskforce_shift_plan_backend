const Router = require("express").Router();
const userSignUp = require('../controllers/authentication/signUp');
const signUpValidations = require('../controllers/authentication/signUpValidations')

Router.route('/shift-planner/auth/signup').post(signUpValidations,userSignUp);

module.exports = Router;
