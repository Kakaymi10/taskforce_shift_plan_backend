const db = require('../../models/index');

const { User, Absence, EmployeeShift } = db; // Assuming you have a Department model
const findUserByToken = require('../utils/findUserByToken');
const DataAccesManagement = require('../utils/dataAccessManagement');

class AbsenceController {
  // Create an absence
  static async requestAbsence(req, res) {
    // #swagger.tags = ['Absences']
    try {
      const { reason } = req.body;
      const { employeeShiftId } = req.params

      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const employeeShift = await EmployeeShift.findOne({ where: { id: employeeShiftId, userId: loggedInUser.id }});

      if (!employeeShift) {
        return res.status(404).json({ error: 'Employee shift not found' });
      }

      const absence = await Absence.create({ employeeShiftId, reason, userId: loggedInUser.id });

      return res.status(201).json({message: 'Absence created successfully', absence});
    } catch (error) {
      return res.status(500).json({ message: 'Failed to create absence', error: error.message });
    }
  }

  // Get all absences
  static async getAllAbsences(req, res) {
    // #swagger.tags = ['Absences']
    try {
      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const absences = await Absence.findAll();
      
      const data = await DataAccesManagement.absenceAccessManager(loggedInUser, absences);

      return res.status(200).json({message: 'Absences fetched successfully!', absences: data});
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch absences', error: error.message});
    }
  }

  // Get absences for a specific user by their ID
  static async getAbsencesForUser(req, res) {
    // #swagger.tags = ['Absences']
    try {
      const {userId} = req.params;

      const user = await User.findOne({ where: { id: userId }});

      if(!user) return res.status(404).json({ message: 'User not found'});

      const employeeAbsences = await Absence.findOne({
        where: {
          userId,
        },
      });

      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

     const data = await DataAccesManagement.absenceAccessManager(loggedInUser, employeeAbsences)

      return res.status(200).json({message: 'Absences fetched successfully!', absences: data});
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch absences', error: error.message});
    }
  }

  // Update an absence
  static async updateAbsenceStatus(req, res) {
    // #swagger.tags = ['Absences']
    try {
      const absenceId = req.params.id;
      const { status } = req.body;
      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const absence = await Absence.findOne({ where: { id: absenceId } });

      if (!absence) {
        return res.status(404).json({ error: 'Absence not found' });
      }

      const data = await DataAccesManagement.absenceAccessManager(loggedInUser, [absence.dataValues])

      if(data.length === 0) {
        return res.status(400).send({
          message: 'You are not authorized to perform this action!',
        })
        };

      if (status !== 'Approved' && status !== 'Rejected') {
        return res.status(400).send({ message: 'Invalid status' });
      }

      const updatedAbsence = await absence.update({
        status,
      });


      return res.status(200).json({message:'Absence updated seccessfully', absence: updatedAbsence});
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update absences', error: error.message });
    }
  }

  // Delete an absence
  static async deleteAbsence(req, res) {
    // #swagger.tags = ['Absences']
    try {
      const absenceId = req.params.id;
  
      const absence = await Absence.findOne({ where: { id: absenceId } });
  
      if (!absence) {
        return res.status(404).json({ error: 'Absence not found' });
      }
  
  
      const token = req.headers.authorization;

      const loggedInUser = await findUserByToken(token);

      const data = await DataAccesManagement.absenceAccessManager(loggedInUser, [absence.dataValues])

      if(data.length === 0) {
        return res.status(400).send({
          message: 'You are not authorized to perform this action!',
        })
        };

      await absence.destroy();
  
      return res.status(200).json({ message: 'Absence deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update absences', error: error.message });
    }
  }
  

}

module.exports = AbsenceController;
