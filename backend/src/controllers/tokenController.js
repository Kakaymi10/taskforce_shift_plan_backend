const db = require('../../models/index');

const { Token } = db;

class TokensController {
    static async getAllTokens (req, res) {
        // #swagger.tags = ['Token']
        try {
           const allTokens = await Token.findAll({
            attributes: { exclude: ['password'] },
           });
    
           res.status(200).send({message: 'Tokens fetched successfully', tokens: allTokens})
        } catch (err) {
           res.status(500).send({ message: err.message });
        }
    }

    static async getTokenByUserId (req, res) {
        // #swagger.tags = ['Token']
        const { id }= req.params;
        try {
           const token = await Token.findOne({
            where: {
                userId: id,
            }
           });

           if(!token) {
            return res.status(404).send({message: 'Token not found'})
           }
    
           return res.status(200).send({message: 'Token fetched successfully', tokens: token});

        } catch (err) {
           return res.status(500).send({ message: err.message });
        }
    }

    static async deleteToken (req, res) {
        // #swagger.tags = ['Token']
        const { id } = req.params;
 
        try {
         const token = await Token.findOne({
             where: {
                 userId: id,
             }
            });
      
            if(!token) {
             return res.status(404).send({message: 'Token not found'})
            }
 
            const deletedToken = await Token.destroy({
                where: {
                    userId: id,
                }
               });
 
            if(!deletedToken) {
             return res.status(404).send({message: "Deleting token failed"});
            }
 
            return res.status(200).send({message: "Token deleted successfully"});
 
        } catch (err) {
         return res.status(500).send({ message: err.message });
        }
     }
};





module.exports = TokensController;
