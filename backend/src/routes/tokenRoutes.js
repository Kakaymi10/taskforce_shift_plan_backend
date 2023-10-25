const express = require('express');
const TokensController = require('../controllers/tokenController');
const checkUserRole = require('../middlewares/checkUserRole');

const router = express.Router();

router.get('/', checkUserRole('SuperAdmin'),  TokensController.getAllTokens);

router.get('/user/:id',checkUserRole('SuperAdmin') , TokensController.getTokenByUserId);

router.delete('/user/:id', checkUserRole('SuperAdmin') , TokensController.deleteToken);

module.exports = router;
