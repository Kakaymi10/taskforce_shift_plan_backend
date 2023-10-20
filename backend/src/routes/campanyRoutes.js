const express = require('express');
const CompanyController = require('../controllers/campanyContoller')
const checkUserRole = require('../middlewares/checkUserRole');

const router = express.Router();

router.get('/', checkUserRole('SuperAdmin') , CompanyController.getCompany);
router.post('/create', checkUserRole('SuperAdmin','Admin') , CompanyController.createCompany);
router.put('/update/:id', checkUserRole('SuperAdmin','Admin') ,CompanyController.updateCompany);
router.put('/updateStatus', checkUserRole('SuperAdmin') , CompanyController.updateCompanyStatus);
router.delete('/delete/:id', checkUserRole('SuperAdmin') , CompanyController.deleteCompany);


module.exports = router;   

