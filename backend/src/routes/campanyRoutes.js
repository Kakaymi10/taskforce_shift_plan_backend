const express = require('express');
const CompanyController = require('../controllers/campanyContoller')
const router = express.Router();

router.get('/', CompanyController.getCompany);
router.post('/create', CompanyController.createCompany);
router.put('/update/:id', CompanyController.updateCompany);
router.delete('/delete/:id', CompanyController.deleteCompany);
router.put('/:id/approve', CompanyController.approveCompany);
router.put('/:id/reject', CompanyController.rejectCompany);

module.exports = router;   

