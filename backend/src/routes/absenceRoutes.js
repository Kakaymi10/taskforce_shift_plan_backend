const express = require('express');

const router = express.Router();
const AbsenceController = require('../controllers/absenceController');
const checkUserRole = require('../middlewares/checkUserRole');

router.get('/',  checkUserRole('Admin', 'SuperAdmin','Manager', 'Employee'), AbsenceController.getAllAbsences);
router.get('/user/:userId',  checkUserRole('Admin', 'SuperAdmin','Manager', 'Employee'), AbsenceController.getAbsencesForUser);
router.put('/:id',  checkUserRole('Admin', 'SuperAdmin','Manager'), AbsenceController.updateAbsenceStatus);
router.delete('/:id', checkUserRole('Admin', 'SuperAdmin','Manager'), AbsenceController.deleteAbsence) ;


module.exports = router;