const db = require('../../models/index');

const { User } = db;

class UsersController {
    static async getAllUsers (req, res) {
        // #swagger.tags = ['User']
        try {
           const allUsers = await User.findAll({
            attributes: { exclude: ['password'] },
           });
    
           res.status(200).send({message: 'Users fetched successfully', users: allUsers})
        } catch (err) {
           res.status(500).send({ message: err.message });
        }
    }

    static async getUserByEmail (req, res) {
        // #swagger.tags = ['User']
        const {email}= req.query;
        try {
           const user = await User.findOne({
            where: {
                email,
            }
           });

           if(!user) {
            return res.status(404).send({message: 'User not found'})
           }
    
           return res.status(200).send({message: 'User fetched successfully', users: user});

        } catch (err) {
           return res.status(500).send({ message: err.message });
        }
    }

    static async updateUser (req, res) {
        // #swagger.tags = ['User']
       const { email } = req.query;
       const { roleId, departmentId, companyId } = req.body

       try {
        const user = await User.findOne({
            where: {
                email,
            }
           });
     
           if(!user) {
            return res.status(404).send({message: 'User not found'})
           }

           const updateUser = await user.update({
            roleId,
            departmentId,
            companyId

           });

           if(!updateUser) {
            return res.status(404).send({message: "Updating user failed"});
           }

           return res.status(200).send({message: "User updated successfully"});

       } catch (err) {
        return res.status(500).send({ message: err.message });
       }
    }

    static async deleteUser (req, res) {
        // #swagger.tags = ['User']
        const { email } = req.query;
 
        try {
         const user = await User.findOne({
             where: {
                 email,
             }
            });
      
            if(!user) {
             return res.status(404).send({message: 'User not found'})
            }
 
            const deletedUser = await User.destroy({
                where: {
                    email,
                }
               });
 
            if(!deletedUser) {
             return res.status(404).send({message: "Deleting user failed"});
            }
 
            return res.status(200).send({message: "User deleted successfully"});
 
        } catch (err) {
         return res.status(500).send({ message: err.message });
        }
     }
};





module.exports = UsersController;
