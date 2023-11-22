const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, 'Shalini', {
    expiresIn: "30d",
  });
};

module.exports = generateToken;