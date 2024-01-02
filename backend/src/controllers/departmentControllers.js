const { Department } = require('../../models/index');
const DataAccesManagement = require('../utils/dataAccessManagement');
const findUserByToken = require('../utils/findUserByToken');

class DepartmentController {
  static async createDepartment(req, res) {
    // #swagger.tags = ['Department']
    try {
      const { name } = req.body;
      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      // Check if the department with the same name already exists
      const existingDepartment = await Department.findOne({ where: { name } });

      if (existingDepartment) {
        return res
          .status(400)
          .json({ error: 'Department with this name already exists' });
      }

      const department = await Department.create({
        name,
        companyId: loggedInUser.companyId,
      });

      return res
        .status(201)
        .json({ message: 'Department Created Successfully', department });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to create department', error });
    }
  }

  static async getAllDepartments(req, res) {
    // #swagger.tags = ['Department']
    try {
      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const departments = await Department.findAll();

      const data = DataAccesManagement.departmentAccessManager(
        loggedInUser,
        departments,
      );

      res
        .status(200)
        .json({
          message: 'Departments fetched succesfully!',
          departments: data,
        });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch departments', error });
    }
  }

  static async deleteAllDepartments(req, res) {
    // #swagger.tags = ['Department']
    try {
      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      await Department.destroyAll({
        where: { companyId: loggedInUser.companyId },
      });

      res.status(204).json({ message: 'Deleted all departments' });
    } catch (error) {
      res.status(500).json({ message: 'Filed to deleted departments', error });
    }
  }

  static async getDepartmentById(req, res) {
    // #swagger.tags = ['Department']
    try {
      const departmentId = req.params.id;

      const department = await Department.findByPk(departmentId);

      if (department) {
        res
          .status(200)
          .json({ message: 'Deprtment fetched successfully!', department });
      }

      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const data = DataAccesManagement.departmentAccessManager(loggedInUser, [
        department.dataValues,
      ]);

      if (data.length === 0) {
        return res.status(401).send({
          message: 'You are not authorized to perform this action!',
        });
      }

      return res
        .status(200)
        .json({ message: 'Department fetched successfully!', department });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to fetch department', error });
    }
  }

  static async updateDepartmentById(req, res) {
    // #swagger.tags = ['Department']
    try {
      const { name, companyId } = req.body;
      const departmentId = req.params.id;

      // Check if the department with the given ID exists
      const department = await Department.findOne({
        where: { id: departmentId },
      });

      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }

      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const data = DataAccesManagement.departmentAccessManager(loggedInUser, [
        department.dataValues,
      ]);

      if (data.length === 0) {
        return res.status(400).send({
          message: 'You are not authorized to perform this action!',
        });
      }

      await department.update({ name, companyId });

      return res
        .status(200)
        .json({ message: 'Company Updated successfully!', department });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to update department', error });
    }
  }

  static async deleteDepartmentById(req, res) {
    // #swagger.tags = ['Department']
    try {
      const departmentId = req.params.id;

      // Check if the department with the given ID exists
      const department = await Department.findOne({
        where: { id: departmentId },
      });

      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }

      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const data = DataAccesManagement.departmentAccessManager(loggedInUser, [
        department.dataValues,
      ]);

      if (data.length === 0) {
        return res.status(400).send({
          message: 'You are not authorized to perform this action!',
        });
      }

      await department.destroy();
      return res
        .status(204)
        .json({ message: 'Department deleted successfully' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to delete department', error });
    }
  }
}

module.exports = DepartmentController;
