const express = require('express');
const RoleController = require('../controllers/roleControllers');
const checkUserRole = require('../middlewares/checkUserRole');

const router = express.Router();

router.get('/', checkUserRole('SuperAdmin','Admin', 'Manager'), RoleController.getAllRoles);
router.get('/:id', checkUserRole('SuperAdmin','Admin', 'Manager'), RoleController.getRoleById);
router.post('/',  checkUserRole('SuperAdmin'), RoleController.createRole);
router.put('/:id', checkUserRole('SuperAdmin'), RoleController.updateRole);
router.delete('/:id',  checkUserRole('SuperAdmin'), RoleController.deleteRole);

module.exports = router;
