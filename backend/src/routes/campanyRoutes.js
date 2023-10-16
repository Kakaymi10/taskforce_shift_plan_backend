const express = require('express');
const CompanyController = require('../controllers/campanyContoller')
const router = express.Router();

router.get('/', CompanyController.getCompany);
router.post('/create', CompanyController.createCompany);
router.put('/update/:id', CompanyController.updateCompany);
router.delete('/delete/:id', CompanyController.deleteCompany);

module.exports = router;   

