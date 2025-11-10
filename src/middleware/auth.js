const tokenManager = require('../utils/tokenManager');
const AuthenticationsError = require('../exception/AuthenticationsError');
const InvariantError = require('../exception/InvariantError');

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AuthenticationsError('Token tidak ditemukan');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new InvariantError('Format token tidak valdi');
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
