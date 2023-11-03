const db = require('../../models/index');
const DataAccesManagement = require('../utils/dataAccessManagement');
const findUserByToken = require('../utils/findUserByToken');

const { Shift } = db;

class ShiftController {
  static async createShift(req, res) {
    // #swagger.tags = ['Shift']
    const { startTime, endTime, name } = req.body;

    try {
      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const oldShift = await Shift.findOne({ where: { name, companyId: loggedInUser.companyId } });

      if (oldShift) {
        return res.status(403).send({ message: 'Shift name already exists' });
      }

      const oldShift1 = await Shift.findOne({ where: { startTime, endTime, companyId: loggedInUser.companyId } });

      if (oldShift1) {
        return res.status(403).send({ message: 'Shift time already exists' });
      }

      const newShift = await Shift.create({
        name,
        startTime,
        endTime,
        companyId: loggedInUser.companyId,
      });

     return res.status(201).send({
        message: 'Shift created successfully',
        newShift,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Failed to created shift', error });
    }
  }

  static async getAllShifts(req, res) {
    // #swagger.tags = ['Shift']
    try {
      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const shifts = await Shift.findAll();
      
      const data = DataAccesManagement.shiftAccessManager(
        loggedInUser,
        shifts,
      );

      res.status(200).send({
        message: 'Shifts fetched successfully',
        data,
      });
    } catch (error) {
      res.status(500).send({ message: 'Failed to fetch', error });
    }
  }

  static async getShiftById(req, res) {
    // #swagger.tags = ['Shift']
    const { id } = req.params;

    try {
      const shift = await Shift.findOne({ where: { id } });

      if (!shift) {
        res.status(404).send({ message: 'Shift not found' });
      }

      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const data = DataAccesManagement.shiftAccessManager(loggedInUser, [
        shift.dataValues,
      ]);

      if (data.length === 0) {
        return res.status(400).send({
          message: 'You are not authorized to perform this action!',
        });
      }

      return res.status(200).send({
        message: 'Shift retrieved successfully',
        data,
      });
    } catch (error) {
      return res.status(500).send({ message: 'Failed to fetch shifts', error });
    }
  }

  static async updateShift(req, res) {
    // #swagger.tags = ['Shift']
    const { id } = req.params;
    const { name, startTime, endTime } = req.body;

    try {
      const shift = await Shift.findOne({ where: { name } });

      if (!shift) {
        res.status(404).send({ message: 'Shift not found' });
      }

      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const data = DataAccesManagement.shiftAccessManager(loggedInUser, [
        shift.dataValues,
      ]);

      if (data.length === 0) {
        return res.status(400).send({
          message: 'You are not authorized to perform this action!',
        });
      }

      const updatedShift = await Shift.update(
        { name, startTime, endTime },
        { where: { id }, returning: true, plain: true },
      );

      return res.status(200).send({
        message: 'Shift updated successfully',
        updatedShift,
      });
    } catch (error) {
      return res.status(500).send({ message: 'Failed to update shift', error });
    }
  }

  static async deleteShift(req, res) {
    // #swagger.tags = ['Shift']
    const { id } = req.params;

    try {
      const shift = await Shift.findOne({ where: { id } });

      if (!shift) {
        res.status(404).send({ message: 'Shift not found' });
      }

      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const data = DataAccesManagement.shiftAccessManager(loggedInUser, [
        shift.dataValues,
      ]);

      if (data.length === 0) {
        return res.status(400).send({
          message: 'You are not authorized to perform this action!',
        });
      }

      await Shift.destroy({ where: { id } });

      return res.status(200).send({
        message: 'Shift deleted successfully',
        shift,
      });
    } catch (error) {
      return res.status(500).send({ message: 'Failed to delete shift', error });
    }
  }
}

module.exports = ShiftController;
