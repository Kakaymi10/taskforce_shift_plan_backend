const db = require('../../models/index');

const { User } = db;

class UsersController {
    static async getAllUsers (req, res) {
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
        const email = req.query.email;
        console.log(email, '(((((((((((((((((')
        try {
           const user = await User.findOne({
            where: {
                email: email,
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
       const { email } = req.query;
       const { roleId, departmentId } = req.body

       try {
        const user = await User.findOne({
            where: {
                email: email,
            }
           });
     
           if(!user) {
            return res.status(404).send({message: 'User not found'})
           }

           const updateUser = await user.update({
            roleId: roleId,
            departmentId: departmentId
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
        const { email } = req.query;
 
        try {
         const user = await User.findOne({
             where: {
                 email: email,
             }
            });
      
            if(!user) {
             return res.status(404).send({message: 'User not found'})
            }
 
            const deletedUser = await User.destroy({
                where: {
                    email: email,
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
