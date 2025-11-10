const {
  postValidatePayload,
  putValidatePayload,
  deleteValidatePayload,
} = require('./validator');
const tokenManager = require('../../utils/tokenManager');
const AuthenticationsService = require('../../service/postgre/authenticationsService');
const UsersService = require('../../service/postgre/UsersService');

const authenticationsService = new AuthenticationsService();
const usersService = new UsersService();

const postAuthenticationsController = async (req, res, next) => {
  try {
    postValidatePayload(req.body);
    const { username, password } = req.body;

    const id = await usersService.verifyUserCredential(username, password);
    const accessToken = tokenManager.generateAccessToken({ id });
    const refreshToken = tokenManager.generateRefreshToken({ id });

    await authenticationsService.addRefreshToken(refreshToken);

    res.status(201).json({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (e) {
    next(e);
  }
};

const putAuthenticationsController = async (req, res, next) => {
  try {
    putValidatePayload(req.body);
    const { refreshToken } = req.body;

    await authenticationsService.verifyRefreshToken(refreshToken);
    const { id } = tokenManager.verifyRefreshToken(refreshToken);
    const accessToken = tokenManager.generateAccessToken({ id });

    res.status(200).json({
      status: 'success',
      message: 'Access token berhasil diperbarui',
      data: {
        accessToken,
      },
    });
  } catch (e) {
    next(e);
  }
};

const deleteAuthenticationsController = async (req, res, next) => {
  try {
    deleteValidatePayload(req.body);
    const { refreshToken } = req.body;

    await authenticationsService.verifyRefreshToken(refreshToken);
    await authenticationsService.deleteRefreshToken(refreshToken);

    res.status(200).json({
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  postAuthenticationsController,
  putAuthenticationsController,
  deleteAuthenticationsController,
};
