const { Department } = require('../../models/index');
const { createDepartmentSchema, updateDepartmentSchema } = require('./validations/departmentValidation');

class DepartmentController {
  static async createDepartment(req, res) {
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
      res.status(201).json(department);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create department' });
    }
  }

  static async getAllDepartments(req, res) {
    try {
      const departments = await Department.findAll();
      res.status(200).json(departments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch departments' });
    }
  }

  static async deleteAllDepartments(req, res) {
    try {
      await Department.destroy({ where: {} });
    res.status(204).json({success: 'Deleted all departments'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete all departments' });
    }
  }

  static async getDepartmentById(req, res) {
    try {
      const departmentId = req.params.id;
      const department = await Department.findByPk(departmentId);
      if (department) {
        res.status(200).json(department);
      } else {
        res.status(404).json({ error: 'Department not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch department' });
    }
  }

  static async updateDepartmentById(req, res) {
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
      console.log('Updated');
      res.status(200).json(department);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update department' });
    }
  }

  static async deleteDepartmentById(req, res) {
    try {
      const departmentId = req.params.id;

      // Check if the department with the given ID exists
      const department = await Department.findByPk(departmentId);

      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }

      await department.destroy();
      res.status(204).json(`Department with id: ${departmentId} deleted`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete department' });
    }
  }
}

module.exports = DepartmentController;