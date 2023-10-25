const express = require('express');
const DepartmentController = require('../controllers/departmentControllers');
const departmentValidations = require('../validations/departmentValidation');
const checkUserRole = require('../middlewares/checkUserRole');

const router = express.Router();

router.post('/create', checkUserRole('Admin', 'SuperAdmin'), departmentValidations, DepartmentController.createDepartment);
router.get('/', checkUserRole('Admin', 'SuperAdmin', 'Manager'), DepartmentController.getAllDepartments);
router.get('/:id', checkUserRole('Admin', 'SuperAdmin', 'Manager'), DepartmentController.deleteDepartmentById);
router.put('/:id', checkUserRole('Admin', 'SuperAdmin'), departmentValidations, DepartmentController.updateDepartmentById);
router.delete('/:id', checkUserRole('Admin', 'SuperAdmin'), DepartmentController.deleteDepartmentById);

module.exports = router;
