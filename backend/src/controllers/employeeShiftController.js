const db = require('../../models/index');
const DataAccesManagement = require('../utils/dataAccessManagement');
const findUserByToken = require('../utils/findUserByToken');

const { EmployeeShift, User, Shift } = db;

class EmployeeShiftController {
  static async createEmployeeShift(req, res) {
    // #swagger.tags = ['EmployeeShift']
    

    try {
      const { userId, shiftId, date } = req.body;
      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const theAssigneUser = await User.findOne({ where: { id: userId, companyId: loggedInUser.companyId }});

      if(!theAssigneUser) return res.status(403).json({ message: 'User not found'});


      const shift = await Shift.findOne({ where: { id: shiftId }});

      if(!shift) res.status(403).json({ message: 'Shift not found'});

      const oldEmployeeShift = await EmployeeShift.findOne({ where: { userId, shiftId, date } });

      if (oldEmployeeShift) {
        res.status(403).send({ message: 'Employee Shift time already exists' });
      }

      if(loggedInUser.companyId !== theAssigneUser.companyId) res.status(401).json({message: 'You are not authorized to perform this action!'});

      const newEmployeeShift = await EmployeeShift.create({
        userId,
        shiftId,
        date
      });

     return res.status(201).send({
        message: 'Employee Shift created successfully',
        newEmployeeShift,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Failed to created employee Shift', error });
    }
  }

  static async getAllEmployeeShifts(req, res) {
    // #swagger.tags = ['EmployeeShift']
    try {
      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const employeeShifts = await EmployeeShift.findAll();

      const data = await DataAccesManagement.employeeShiftAccessManager(loggedInUser, employeeShifts);

      return res.status(200).send({
        message: 'Employee Shifts fetched successfully',
        data,
      });

    } catch (error) {
      return res.status(500).send({ message: 'Failed to fetch', error });
    }
  }

  static async getEmployeeShiftsByuserId(req, res) {
    // #swagger.tags = ['EmployeeShift']

    try {
      const {userId}  = req.params;
      const employeeShift = await EmployeeShift.findAll({ where: { userId } });

      if (!employeeShift) {
        res.status(404).send({ message: 'Employee Shifts not found' });
      }

      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const data = await DataAccesManagement.employeeShiftAccessManager(loggedInUser, [
        employeeShift.dataValues,
      ]);

      return res.status(200).send({
        message: 'Employee shifts retrieved successfully',
        data,
      });
    } catch (error) {
      return res.status(500).send({ message: 'Failed to fetch employee Shifts', error });
    }
  }

  static async updateEmployeeShift(req, res) {
    // #swagger.tags = ['EmployeeShift']
    const { id } = req.params;
    const { userId, date, shiftId } = req.body;

    try {
      const employeeShift = await EmployeeShift.findOne({ where: { id } });

      if (!employeeShift) {
        res.status(404).send({ message: 'Employee Shift not found' });
      }

      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const data = await DataAccesManagement.employeeShiftAccessManager(loggedInUser, [
        employeeShift.dataValues,
      ]);

      if (data.length === 0) {
        return res.status(401).send({
          message: 'You are not authorized to perform this action!',
        });
      }

      const updatedEmployeeShift = await EmployeeShift.update(
        { userId, date, shiftId },
        { where: { id } },
      );

      return res.status(200).send({
        message: 'Employee  Shift updated successfully',
        updatedEmployeeShift,
      });
    } catch (error) {
      return res.status(500).send({ message: 'Failed to update employee Shift', error });
    }
  }

  static async deleteEmployeeShift(req, res) {
    // #swagger.tags = ['EmployeeShift']
    const { id } = req.params;

    try {
      const employeeShift = await EmployeeShift.findOne({ where: { id } });

      if (!employeeShift) {
        res.status(404).send({ message: 'Employee Shift not found' });
      }

      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const data = await DataAccesManagement.employeeShiftAccessManager(loggedInUser, [
        employeeShift.dataValues,
      ]);

      if (data.length === 0) {
        return res.status(401).send({
          message: 'You are not authorized to perform this action!',
        });
      }

      await EmployeeShift.destroy({ where: { id } });

      return res.status(200).send({
        message: 'Employee Shift deleted successfully',
        employeeShift,
      });
    } catch (error) {
      return res.status(500).send({ message: 'Failed to delete employee Shift', error });
    }
  }
}

module.exports = EmployeeShiftController;
