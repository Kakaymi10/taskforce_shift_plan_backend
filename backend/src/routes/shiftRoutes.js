const express = require('express');
const ShiftController = require('../controllers/shiftsControllers');
const checkUserRole = require('../middlewares/checkUserRole');

const router = express.Router();

router.get('/', ShiftController.getAllShifts);
router.get('/:id', ShiftController.getShiftById);
router.get('/user/:id', ShiftController.getShiftsByUserId);
router.post('/', checkUserRole('Admin', 'SuperAdmin','Manager'), ShiftController.createShift);
router.put('/:id', checkUserRole('Admin', 'SuperAdmin','Manager'), ShiftController.updateShift);
router.delete('/:id', checkUserRole('Admin', 'SuperAdmin','Manager'), ShiftController.deleteShift);


module.exports = router;