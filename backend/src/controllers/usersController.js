const db = require('../../models/index');
const DataAccesManagement = require('../utils/dataAccessManagement');
const findUserByToken = require('../utils/findUserByToken');

const { User, Department, Token } = db;

class UsersController {
  static async getAllUsers(req, res) {
    // #swagger.tags = ['User']
    try {
      const token = req.headers.authorization;

      const user = await findUserByToken(token);

      const allUsers = await User.findAll({
        attributes: { exclude: ['password'] },
      });

      const data = DataAccesManagement.userAccessManager(user, allUsers);

      res
        .status(200)
        .send({ message: 'Users fetched successfully', users: data });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }

  static async getUserByEmail(req, res) {
    // #swagger.tags = ['User']
    const { email } = req.query;
    try {
      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const user = await User.findOne({
        where: {
          email,
        }, attributes: { exclude: ['password'] }
      });

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      const data = DataAccesManagement.userAccessManager(loggedInUser, [user.dataValues]);

      return res
        .status(200)
        .send({ message: 'User fetched successfully', users: data });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }

  static async updateUser(req, res) {
    // #swagger.tags = ['User']
    const { roleId, departmentId, companyId, email } = req.body;

    try {
      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      const department = await Department.findOne({
        where: { id: departmentId },
      });

      if (!department) {
        return res.status(404).send({ message: 'Department does not exist!' });
      }
      const data = DataAccesManagement.userAccessManager(loggedInUser, [user.dataValues]);

      if (data.lenght === 0) {
        return res.status(400).send({
          message: 'You are not authorized to perform this action!',
        });
      }

      const updateUser = await User.update(
        { roleId, companyId, departmentId },
        {
          where: {
            email,
          },
        },
      );

      if (!updateUser) {
        return res.status(404).send({ message: 'Updating user failed' });
      }

      return res.status(200).send({ message: 'User updated successfully' });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }

  static async deleteUser(req, res) {
    // #swagger.tags = ['User']
    const { email } = req.body;

    try {
      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      const data = DataAccesManagement.userAccessManager(loggedInUser, [user.dataValues]);

      if (data.lenght === 0) {
        return res.status(400).send({
          message: 'You are not authorized to perform this action!',
        });
      }

      await Token.destroy({ where: { userId: user.id}});

      const deletedUser = await User.destroy({
        where: {
          email,
        },
      });

      if (!deletedUser) {
        return res.status(404).send({ message: 'Deleting user failed' });
      }

      return res.status(200).send({ message: 'User deleted successfully' });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
}

module.exports = UsersController;
