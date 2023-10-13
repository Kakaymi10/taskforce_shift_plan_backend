// department-router.js
const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/departmentControllers'); // Import the DepartmentController

router.post('/', DepartmentController.createDepartment);
router.get('/', DepartmentController.getAllDepartments);
router.get('/:id', DepartmentController.getDepartmentById);
router.put('/:id', DepartmentController.updateDepartmentById);
router.delete('/:id', DepartmentController.deleteDepartmentById);
router.delete('/', DepartmentController.deleteAllDepartments);
module.exports = router;
