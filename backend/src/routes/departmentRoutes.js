const express = require('express');
const RoleController = require('../controllers/roleControllers');
const checkUserRole = require('../middlewares/checkUserRole');

const router = express.Router();


router.post('/', checkUserRole(['Admin', 'Manager']), DepartmentController.createDepartment);
router.get('/', checkUserRole(['Admin', 'Manager']), DepartmentController.getAllDepartments);
router.get('/:id', DepartmentController.getDepartmentById);
router.put('/:id', checkUserRole(['Admin', 'Manager']), DepartmentController.updateDepartmentById);
router.delete('/:id', checkUserRole(['Admin', 'Manager']), DepartmentController.deleteDepartmentById);
router.delete('/', checkUserRole(['Admin']), DepartmentController.deleteAllDepartments);

module.exports = router;
