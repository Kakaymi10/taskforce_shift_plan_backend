import express from 'express';
import authClass from '../controllers/authControllers';
import AuthValidations from '../validations/authValidations';

const router = express.Router();

router.post('/signup',AuthValidations.signUp, authClass.signUp);

export default router;