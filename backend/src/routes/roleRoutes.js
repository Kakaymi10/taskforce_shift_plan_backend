const express = require('express');
const RoleController = require('../controllers/roleControllers');
const checkUserRole = require('../middlewares/checkUserRole');

const router = express.Router();

router.get('/', RoleController.getAllRoles);
router.get('/:id', RoleController.getRoleById);
router.post('/', checkUserRole('Admin', 'SuperAdmin'), RoleController.createRole);
router.put('/:id', checkUserRole('Admin', 'SuperAdmin'), RoleController.updateRole);
router.delete('/:id', checkUserRole('Admin', 'SuperAdmin'), RoleController.deleteRole);

module.exports = router;
