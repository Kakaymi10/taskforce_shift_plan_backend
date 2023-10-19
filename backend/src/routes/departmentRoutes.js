const express = require('express');

const checkUserRole = require('../middlewares/checkUserRole');
const DepartmentController = require('../controllers/departmentControllers');
const router = express.Router();


router.post('/',  DepartmentController.createDepartment);
router.get('/',  DepartmentController.getAllDepartments);
router.get('/:id', DepartmentController.getDepartmentById);
router.put('/:id',  DepartmentController.updateDepartmentById);
router.delete('/:id',  DepartmentController.deleteDepartmentById);
router.delete('/',  DepartmentController.deleteAllDepartments);

module.exports = router;
