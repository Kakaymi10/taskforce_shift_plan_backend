const generator = require('generate-password');
const { hashPassword, generateToken, validateUser } = require('../utils/auth-helper');
const db = require('../../models/index');
const { sendConfirmationEmail, sendInvitationEmail } = require('../utils/emailConfirmation');

const { User } = db;

class AuthController {


  static async signUp(req, res) {
    const { name, email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (user) {
        res.status(403).send({ message: 'User already exists'});
      } else if (!user) {
        const confirmationToken = generateToken({ email });
        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({
          name,
          email,                
          password: hashedPassword,
          token:  confirmationToken
        });

        // After successfully creating the user, send a confirmation email
        const confirmationLink = `http://localhost:3000/shift-planner/api/v1/auth/confirm-email?token=${newUser.token}`;
        await sendConfirmationEmail(newUser.email, newUser.name, confirmationLink);

        const userToken = generateToken(newUser);
        

        res.status(201).send({
          message: 'User signed up successfully. Check your email for confirmation.',
          token: userToken,
          user: { id: newUser.id, email: newUser.email, name: newUser.name ,},
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }



  static async confirmEmail(req, res) {
    const { token } = req.query;

    try {
      const user = await User.findOne({ where: { token: token } });

      if (user) {
        // Update the 'confirmedAt' field with the current date and time
        user.confirmedAt = new Date().toISOString();;
        await user.save();

        return res.status(200).send('Email confirmed successfully.');
      } 
        
      return res.status(400).send('Invalid confirmation token.');
     
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }

  static async login(req, res) {
    try{
        const {email,password} = req.body;

        const user = await User.findOne({
            where: {
                email,
            },
        });

        if(!user){
            return res.status(404).json({
                status: 404,
                error: 'User not found',
            });
        }
        
        const response = await validateUser(user.password, password);

        

         if(!response){
            return res.status(400).json({
                status: 400,
                error: 'Invalid password',
            });
       }
       
            const token = generateToken(user);
            return res.status(200).json({
                status: 200,
                message: 'User logged in successfully',
                data: {
                    token,
                }
              });            
       

    }catch(error){
        return res.status(500).json({
            status: 500,
            error: error.message,
        });
    }

}

static async userInvite(req, res) {
  const { name, email } = req.body;
  const { companyId, departmentId } = req.query;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      res.status(403).send({ message: 'User already exists' });
    } 
    
    if (!user) {
      const password = generator.generate({
        length: 10,
        numbers: true
      });
      const confirmationToken = generateToken({ email });
      const hashedPassword = await hashPassword(password);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        companyId,
        departmentId,
        token:  confirmationToken
      });

      const loginLink = `http://localhost:3000/shift-planner/api/v1/auth/login?token=${newUser.token}`;
      await sendConfirmationEmail(newUser.email, newUser.name, loginLink, password);


      const userToken = generateToken(newUser);
      
      res.status(201).send({
        message: 'User created successfully!',
        token: userToken,
        user: { id: newUser.id, email: newUser.email, name: newUser.name, companyId: newUser.companyId, departmentId: newUser.departmentId },
      });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

}

module.exports = AuthController;