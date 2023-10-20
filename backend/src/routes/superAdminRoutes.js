const express = require('express');
const router = express.Router();
const SuperAdminController = require('../controllers/superAdimnController')


// Route for the super admin

router.put('/approve/:id', SuperAdminController.approveCompany);
router.put('/reject/:id', SuperAdminController.rejectCompany);
router.delete('/delete/:id', SuperAdminController.deleteCompany);
router.put('/edit/:id', SuperAdminController.editCompany);

module.exports = router;
