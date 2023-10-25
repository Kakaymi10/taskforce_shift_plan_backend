const db = require('../../models/index');

const { User, Token } = db;

async function findUserByToken(token){
try {

    const tokenInfo = await Token.findOne({ where: { token } });

    if (!tokenInfo) {
      throw new Error('Token not found');
    }

    const user = await User.findOne({
      where: { id: tokenInfo.dataValues.userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;

} catch(err) {
    console.log(err)
  throw err;
}
 };

 module.exports = findUserByToken;
