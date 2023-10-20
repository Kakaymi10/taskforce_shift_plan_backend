const { Department } = require('../../models/index');
const { createDepartmentSchema, updateDepartmentSchema } = require('./validations/departmentValidation');

class DepartmentController {
  static async createDepartment(req, res) {
     // #swagger.tags = ['Department']
    try {
      const { name, companyId } = req.body;

      // Validate request data using the Joi schema
      const { error } = createDepartmentSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Check if the department with the same name already exists
      const existingDepartment = await Department.findOne({ where: { name } });

      if (existingDepartment) {
        return res.status(400).json({ error: 'Department with this name already exists' });
      }

      const department = await Department.create({ name, companyId });
      console.log('Department Created Successfully');
      return res.status(201).json(department);
    } catch (error) {
      console.error(error);
     return res.status(500).json({ error: 'Failed to create department' });
    }
  }

  static async getAllDepartments(req, res) {
     // #swagger.tags = ['Department']
    try {
      const departments = await Department.findAll();
      res.status(200).json({message: 'Departments fetched succesfully!', departments});
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deleteAllDepartments(req, res) {
     // #swagger.tags = ['Department']
    try {
      await Department.destroy({ where: {} });
    res.status(204).json({success: 'Deleted all departments'});
    } catch (error) {
      res.status(500).json({ error: 'Internal server error'  });
    }
  }

  static async getDepartmentById(req, res) {
     // #swagger.tags = ['Department']
    try {
      const departmentId = req.params.id;
      const department = await Department.findByPk(departmentId);
      if (department) {
        res.status(200).json({message: 'Deprtment fetched successfully!', department});
      } else {
        res.status(404).json({ error: 'Department not found' });
      }
    } catch (error) {
      res.status(500).json({error: 'Internal server error' });
    }
  }

  static async updateDepartmentById(req, res) {
     // #swagger.tags = ['Department']
    try {
      const departmentId = req.params.id;

      // Check if the department with the given ID exists
      const department = await Department.findByPk(departmentId);

      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }

      // Validate request data using the Joi schema
      const { error } = updateDepartmentSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { name, companyId } = req.body;
      await department.update({ name, companyId });
      
     return res.status(200).json({message: 'Company Updated successfull!', department});
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error'  });
    }
  }

  static async deleteDepartmentById(req, res) {
     // #swagger.tags = ['Department']
    try {
      const departmentId = req.params.id;

      // Check if the department with the given ID exists
      const department = await Department.findByPk(departmentId);

      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }

      await department.destroy();
      return res.status(204).json(`Department deleted successfully`);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error'  });
    }
  }
}

module.exports = DepartmentController;