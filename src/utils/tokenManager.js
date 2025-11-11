const Jwt = require('jsonwebtoken');
const InvariantError = require('../exception/InvariantError');

const tokenManager = {
  generateAccessToken: (payload) => {
    return Jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: '15d',
    });
  },
  generateRefreshToken: (payload) => {
    return Jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
      expiresIn: '30d',
    });
  },
  verifyAccessToken: (payload) => {
    try {
      return Jwt.verify(payload, process.env.ACCESS_TOKEN_KEY);
    } catch {
      throw new InvariantError('Access token tidak valdi');
    }
  },
  verifyRefreshToken: (payload) => {
    try {
      return Jwt.verify(payload, process.env.REFRESH_TOKEN_KEY);
    } catch {
      throw new InvariantError('Refresh token tidak valdi');
    }
  },
};

module.exports = tokenManager;
