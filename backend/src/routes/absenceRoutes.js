const express = require('express');
const router = express.Router();
const AbsenceController = require('../controllers/absenceController');


router.post('/',  AbsenceController.createAbsence);
router.get('/',  AbsenceController.getAllAbsences);
router.get('/:userId/absences',  AbsenceController.getAbsencesForUser);
router.put('/:id',  AbsenceController.updateAbsence);
router.delete('/:id', AbsenceController.deleteAbsence) ;


module.exports = router;