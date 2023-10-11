const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function generateToken(user) {
return jwt.sign({ userID: user.id, userEmail: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

async function validateUser(hash, password) {
  const res = bcrypt.compare(password, hash);
  return res;
}

module.exports = {
    generateToken,
    hashPassword,
    validateUser
}
