const express = require('express');
const EmployeeShiftController = require('../controllers/employeeShiftController');
const checkUserRole = require('../middlewares/checkUserRole');
const AbsenceController = require('../controllers/absenceController');

const router = express.Router();

router.get('/', checkUserRole('Admin', 'SuperAdmin','Manager', 'Employee'), EmployeeShiftController.getAllEmployeeShifts);
router.get('/user/:userId', checkUserRole('Admin', 'SuperAdmin','Manager'), EmployeeShiftController.getEmployeeShiftsByuserId);
router.post('/', checkUserRole('Admin', 'SuperAdmin','Manager'), EmployeeShiftController.createEmployeeShift);
router.put('/:id', checkUserRole('Admin', 'SuperAdmin','Manager'), EmployeeShiftController.updateEmployeeShift);
router.delete('/:id', checkUserRole('Admin', 'SuperAdmin','Manager'), EmployeeShiftController.deleteEmployeeShift);
router.post('/:employeeShiftId/absence/create', checkUserRole('Admin', 'SuperAdmin','Manager', 'Employee'), AbsenceController.requestAbsence)


module.exports = router;
