const db = require('../../models/index');

const { Role, Token, User, Company } = db;

const checkUserRole =
  (...roles) =>
  async (req, res, next) => {
    try {
      if (!req.headers.authorization) throw new Error('Please Login first!');

      const token = req.headers.authorization;

      if (!token) {
        res.status(401).send({ message: 'Invalid token' });
        return;
      }

      const tokenInfo = await Token.findOne({ where: { token } });

      if (!tokenInfo) {
        res.status(401).send({ message: 'Invalid token' });
        return;
      }

      const user = await User.findOne({
        where: { id: tokenInfo.dataValues.userId },
      });
      
      if (!user) {
        res.status(404).send({ message: 'User not found' });
        return;
      }

      const userRole = await Role.findOne({
        where: { id: user.dataValues.roleId },
      });

      if (!userRole) {
        res.status(404).send({ message: 'Role not found' });
        return;
      }

      if (roles.includes(userRole.dataValues.name)) {
         if(user.roleId !== 1) {
          const company = await Company.findOne({ where: { id: user.companyId }});

          if( company.status !== 'Approved') {
            return res.status(400).send({ message: 'You are not authorized to perform this action! Wait for your company to be approved.' });
          }
         }

        next();
      } else {
        res
          .status(403)
          .send({
            message: 'You are not authorized to access this information',
          });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

module.exports = checkUserRole;
