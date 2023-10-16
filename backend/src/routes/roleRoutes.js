const express = require('express');
const RoleController = require('../controllers/roleControllers');
const checkUserRole = require('../middlewares/checkUserRole');
const checkUserRole = require('../middleware/checkUserRole');
const router = express.Router();

router.post('/', checkUserRole('Admin', 'SuperAdmin'), DepartmentController.createDepartment);
router.get('/', checkUserRole('Admin', 'SuperAdmin'), DepartmentController.getAllDepartments);
router.get('/:id', checkUserRole('Admin', 'SuperAdmin'), DepartmentController.getDepartmentById);
router.put('/:id', checkUserRole('Admin', 'SuperAdmin'), DepartmentController.updateDepartmentById);
router.delete('/:id', checkUserRole('Admin', 'SuperAdmin'), DepartmentController.deleteDepartmentById);
router.delete('/', checkUserRole('Admin', 'SuperAdmin'), DepartmentController.deleteAllDepartments);

module.exports = router;
