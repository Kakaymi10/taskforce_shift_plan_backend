const db = require('../../models/index');
const { User, Absence, Department } = db; // Assuming you have a Department model
const { createAbsenceSchema } = require('./validations/absenceValidations');
const { sendConfirmationEmail } = require('../utils/emailConfirmation');
class AbsenceController {
  // Create an absence
  static async createAbsence(req, res) {
    try {
      const { userId, reason, date } = req.body;

      // Validate request data using the Joi schema
      const { error } = createAbsenceSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Check if the user with the given ID exists
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Create an absence
      const absence = await Absence.create({ userId, reason, date });
      const usersInSameDepartment = await User.findAll({
        where: { departmentId: user.departmentId, roleId: 1 },
        attributes: ['email'], // Return only email
      });
      const emailTemplatePath = './src/utils/absenceRequest.hbs';
      const confirmationLink = ``;
      for (let i = 0; i < usersInSameDepartment.length; i++) {
        const currentUser = usersInSameDepartment[i]; // Get the current user
        await sendConfirmationEmail(currentUser.email, user.name, confirmationLink, emailTemplatePath);
      }
      
      // Return the created absence
      return res.status(201).json(absence);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Get all absences
  static async getAllAbsences(req, res) {
    try {
      const absences = await Absence.findAll();
      return res.status(200).json(absences);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Get absences for a specific user by their ID
  static async getAbsencesForUser(req, res) {
    try {
      const userId = req.params.userId;

      const absences = await Absence.findAll({ where: { userId } });
      return res.status(200).json(absences);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Update an absence
  static async updateAbsence(req, res) {
    try {
      const absenceId = req.params.id;
      const { reason, date } = req.body;

      // Validate request data using the Joi schema
      const { error } = createAbsenceSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const absence = await Absence.findOne({ where: { id: absenceId } });

      if (!absence) {
        return res.status(404).json({ error: 'Absence not found' });
      }

      // Update the absence
      absence.reason = reason;
      absence.date = date;
      await absence.save();

      return res.status(200).json(absence);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Delete an absence
  static async deleteAbsence(req, res) {
    try {
      const absenceId = req.params.id;
  
      const absence = await Absence.findOne({ where: { id: absenceId } });
  
      if (!absence) {
        return res.status(404).json({ error: 'Absence not found' });
      }
  
      // Assuming that each absence is associated with a user
      const user = await User.findOne({ where: { id: absence.userId } });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Fetch users in the same department with roleId = 1
      const usersInSameDepartment = await User.findAll({
        where: { departmentId: user.departmentId, roleId: 1 },
        attributes: ['email'],
      });
      const emailTemplatePath = './src/utils/absenceCancel.hbs';
      const confirmationLink = ``;
      for (let i = 0; i < usersInSameDepartment.length; i++) {
        const currentUser = usersInSameDepartment[i]; // Get the current user
        await sendConfirmationEmail(currentUser.email, user.name, confirmationLink, emailTemplatePath);
      }
      

      await absence.destroy();
  
      return res.status(200).json({ message: 'Absence deleted' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

}

module.exports = AbsenceController;
