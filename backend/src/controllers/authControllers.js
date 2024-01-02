const generator = require('generate-password');
const {
  hashPassword,
  generateToken,
  validateUser,
} = require('../utils/auth-helper');
const db = require('../../models/index');
const {
  sendConfirmationEmail,
  sendInvitationEmail,
  sendConfirmationEmailSuccessfully,
  sendresetPasswordSuccessfully
} = require('../utils/emailConfirmation');
const findUserByToken = require('../utils/findUserByToken');

const { User, Company, Token, Department } = db;
require('dotenv').config();

class AuthController {
  static async superAdminSignUp(req, res) {
    // #swagger.tags = ['Auth']
    try {
      const { name, email, password } = req.body;


      const confirmationToken = generateToken({ email }, process.env.JWT_SECRET_KEY_SIGNUP, '1d');
      const hashedPassword = await hashPassword(password);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        roleId: 1,
        confirmed: true,
      });

      const token = await Token.create({
        userId: newUser.id,
        token: confirmationToken,
      });

      // After successfully creating the user, send a confirmation email
      const confirmationLink = `${process.env.BASE_URL}/auth/confirm/user/${newUser.id}/${token.token}`;
      const emailTemplatePath = './src/utils/emailConfirmation.hbs';

      await sendConfirmationEmail(
        newUser.email,
        newUser.name,
        confirmationLink,
        emailTemplatePath,
      );

      await sendConfirmationEmail(
        newUser.email,
        newUser.name,
        confirmationLink,
        emailTemplatePath,
      );

      return res.status(201).send({
        message:
          'User signed up successfully. Please check your email for confirmation!!',
        user: { id: newUser.id, email: newUser.email, name: newUser.name },
      });

    } catch(error) {
      return res.status(500).send({ message: 'Failed to signup', error });
    }
  }

  static async signUp(req, res) {
    // #swagger.tags = ['Auth']
    const { userName, userEmail, password, companyName, companyAddress } = req.body;
    try {
      const user = await User.findOne({ where: { email: userEmail } });
      if (user) {
        return res.status(403).send({ message: 'User already exists' });
      }

      const oldCompany = await Company.findOne({
        where: {
          name: companyName,
        },
      });

      if (!user && oldCompany) {
        return res.status(400).send({ message: 'Company name already exists' });
      }

      const confirmationToken = generateToken({ userEmail}, process.env.JWT_SECRET_KEY_SIGNUP, '1d');
      const hashedPassword = await hashPassword(password);

      const newCompany = await Company.create({
        name: companyName,
        address: companyAddress,
      });

      const newUser = await User.create({
        name: userName,
        email: userEmail,
        password: hashedPassword,
        roleId: 2,
        companyId: newCompany.id
      });

      const token = await Token.create({
        userId: newUser.id,
        token: confirmationToken,
      });

      // After successfully creating the user, send a confirmation email
      const confirmationLink = `${process.env.BASE_URL}/auth/confirm/user/${newUser.id}/${token.token}`;
      const emailTemplatePath = './src/utils/emailConfirmation.hbs';

      await sendConfirmationEmail(
        newUser.email,
        newUser.name,
        confirmationLink,
        emailTemplatePath,
      );

      return res.status(201).send({
        message:
          'User signed up successfully. Please check your email for confirmation!!',
        user: { id: newUser.id, email: newUser.email, name: newUser.name },
        company: {
          id: newCompany.id,
          name: newCompany.name,
          address: newCompany.address,
        },
      });
    } catch (error) {
      return res.status(500).send({ message: 'Failed to signup', error });
    }
  }

  static async confirmEmail(req, res) {
    // #swagger.tags = ['Auth']
    const { token, userId } = req.params;

    try {
      const user = await User.findOne({ where: { id: userId } });
      if (!user) return res.status(400).send({ message: 'Invalid link' });

      const userToken = await Token.findOne({
        userId,
        token,
      });

      if (!userToken) return res.status(400).send({ message: 'Invalid link' });

      user.confirmed = true;
      await user.save();

      await userToken.destroy();


      const emailTemplatePath =
      './src/utils/emailConfirmationSuccessfully.hbs';
    await sendConfirmationEmailSuccessfully(
      user.email,
      user.name,
      emailTemplatePath,
    );

      return res.status(200).send('Email confirmed successfully.');
    } catch (error) {
      return res.status(500).send({ message: 'Failed to confirm up', error });
    }
  }

  static async login(req, res) {
    // #swagger.tags = ['Auth']
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: 'User not found',
        });
      }

      if (user.confirmed === false) {
        return res.status(400).json({
          status: 400,
          message: 'Please confirm your email',
        });
      }

        const response = await validateUser(user.password, password);

        if (!response) {
          return res.status(401).json({
            status: 401,
            message: 'Invalid password',
          });
        }

        await Token.destroy({where: { userId: user.id}});
        
        const token = generateToken(user, process.env.JWT_SECRET_KEY_LOGIN, '5d' )
        const userToken = await Token.create({
          userId: user.id,
          token,
        });

        return res.status(200).json({
          status: 200,
          message: 'User logged in successfully',
          data: {
            token: userToken.token,
            user: {name: user.name, email: user.email, id: user.id, roleId: user.roleId, companyId: user.companyId, departmentId: user.departmentId},
          },
        });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  static async forgotPassword(req, res) {
    // #swagger.tags = ['Auth']
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: 'Account not found',
        });
      }

      const oldUserToken = await Token.findOne({
         userId: user.id
      });

      if(oldUserToken) {
        await oldUserToken.destroy();
      }

      const newUserToken = generateToken(user, process.env.JWT_SECRET_KEY_RESETPASSWORD, '1d' )
      const userToken = await Token.create({
        userId: user.id,
        token: newUserToken,
      });

      const confirmationLink = `${process.env.BASE_URL}/auth/resetpassword/user/${user.id}/${userToken.token}`;
      const emailTemplatePath =
        './src/utils/forgotPasswordEmailConfirmation.hbs';
      await sendConfirmationEmail(
        user.email,
        user.name,
        confirmationLink,
        emailTemplatePath,
      );

      return res.status(200).send({
        message: 'Please check your email to reset your password!',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  static async resetPassword(req, res) {
    // #swagger.tags = ['Auth']
    try {
      const { token } = req.params;
      const { newPassword } = req.body;

      const user = await findUserByToken(token);

      const userToken = await Token.findOne({
        userId: user.id,
        token,
      });

      if (!userToken) return res.status(400).send({ message: 'Invalid link' });

        
        const hashedPassword = await hashPassword(newPassword);

        await User.update({ password: hashedPassword}, {where: { id: user.id}});

        await userToken.destroy();

        const emailTemplatePath =
          './src/utils/resetPasswordsuccesfully.hbs';
        await sendresetPasswordSuccessfully(
          user.email,
          user.name,
          emailTemplatePath,
        );

        return res.status(200).send({message: 'Password reset successfully.'});

    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }

  static async userInvite(req, res) {
    // #swagger.tags = ['Auth']
    const { name, email, roleId, departmentId } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(403).send({ message: 'User already exists' });
      }

      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const department = await Department.findOne({ where: { id: departmentId , companyId: loggedInUser.companyId } });

      if (!department) {
        return res.status(404).send({ message: 'Department does not exist!' });
      }
        const password = generator.generate({
          length: 10,
          numbers: true,
        });
        
        const hashedPassword = await hashPassword(password);

        let newUser;

        if(loggedInUser.roleId === 2) {
          if(roleId === 1 || roleId === 2) {
            return res.status(400).send({
              message: 'You are not authorized to perform this action!',
            });
          }
        } 

        if(loggedInUser.roleId === 3) {
          if(roleId === 1 || roleId === 2 || roleId === 3) {
            return res.status(400).send({
              message: 'You are not authorized to perform this action!',
            });
          }
        } 

        if(loggedInUser.roleId === 2) {
          newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            companyId: loggedInUser.companyId,
            departmentId,
            roleId,
            confirmed: true
          });
        } 
        
        if(loggedInUser.roleId === 3) {
          newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            companyId: loggedInUser.companyId,
            departmentId: loggedInUser.departmentId,
            roleId,
            confirmed: true
          });
        }
        

        const loginLink = `${process.env.BASE_URL}/auth/login`;
        const emailTemplatePath = './src/utils/invitationEmail.hbs';
        await sendInvitationEmail(
          newUser.email,
          newUser.name,
          loginLink,
          password,
          emailTemplatePath,
        );

        return res.status(201).send({
          message: 'User invited successfully!',
          user: {
            email: newUser.email,
            name: newUser.name,
            roleId: newUser.roleId,
            companyId: newUser.companyId,
            departmentId: newUser.departmentId,
          },
        });
    } catch (err) {
     return res.status(500).send({ message: err.message });
    }
  }
};

module.exports = AuthController;