const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function generateToken(user) {
return jwt.sign({ userID: user.id, userEmail: user.email, roleId: user.roleId }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

async function validateUser(hash, password) {
  try {

    const res = await bcrypt.compare(password, hash);    
    return res;
  } catch (err){  
 return false;
  }
 
}

module.exports = {
    generateToken,
    hashPassword,
    validateUser
}


