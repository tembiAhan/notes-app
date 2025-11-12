const tokenManager = require('../utils/tokenManager');
const AuthenticationError = require('../exception/AuthenticationError');
const InvariantError = require('../exception/InvariantError');

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AuthenticationError('Token tidak ditemukan');
    }

    const token = authHeader.replace(/^Bearer\s+/i, '').trim();

    if (!token) {
      throw new InvariantError('Token tidak provided');
    }

    const decoded = tokenManager.verifyAccessToken(token);
    req.userId = decoded.id;
    req.username = decoded.username;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = auth;
